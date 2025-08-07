
-- 1) Upgrade scoring trigger to handle multi-select, string fallback, and aggregate metadata
CREATE OR REPLACE FUNCTION public.set_answer_scoring()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
declare
  lbl text;
  sc double precision;
  rsn text;
  ctx text;

  mx double precision;
  mx_choice double precision;
  mx_calc double precision;
  ch_count int;

  q_score_per int;
  q_cap int;
  q_formula text;

  sec_cat text;
  computed_pct double precision;

  -- Multi-select helpers
  selected_vals text[];
  arr_count int;
  per_choice_sum double precision;
  per_choice_reasoning text;
  per_choice_context text;

  -- score_by_count map
  sbc jsonb;
  sbc_score double precision;
begin
  -- 1) Single-choice: if chosen_value is present, copy metadata from the selected choice
  if new.chosen_value is not null then
    select qc.label, qc.score, qc.reasoning, qc.model_input_context
    into lbl, sc, rsn, ctx
    from public.question_choices qc
    where qc.question_id = new.question_id and qc.value = new.chosen_value;

    if lbl is not null then new.chosen_label := lbl; end if;
    if sc is not null then new.score := sc; end if;
    if rsn is not null then new.reasoning := rsn; end if;
    if ctx is not null then new.model_input_context := ctx; end if;
  end if;

  -- 1b) Fallback: if chosen_value is null and raw_response is a string, treat it as the chosen value
  if new.chosen_value is null and jsonb_typeof(new.raw_response) = 'string' then
    new.chosen_value := trim(both '"' from new.raw_response::text);

    select qc.label, qc.score, qc.reasoning, qc.model_input_context
    into lbl, sc, rsn, ctx
    from public.question_choices qc
    where qc.question_id = new.question_id and qc.value = new.chosen_value;

    if lbl is not null then new.chosen_label := lbl; end if;
    if sc is not null then new.score := sc; end if;
    if rsn is not null then new.reasoning := rsn; end if;
    if ctx is not null then new.model_input_context := ctx; end if;
  end if;

  -- 2) Multi-select arrays: compute score and aggregate metadata
  if jsonb_typeof(new.raw_response) = 'array' then
    select array_agg(x) into selected_vals
    from jsonb_array_elements_text(new.raw_response) as x;

    arr_count := coalesce(array_length(selected_vals, 1), 0);

    -- aggregate per-choice scores and metadata if available
    select coalesce(sum(qc.score), 0),
           string_agg(coalesce(qc.reasoning, ''), '; '),
           string_agg(coalesce(qc.model_input_context, ''), '; ')
    into per_choice_sum, per_choice_reasoning, per_choice_context
    from public.question_choices qc
    where qc.question_id = new.question_id and qc.value = any(selected_vals);

    -- read relevant question config
    select q.score_per, q.cap, q.score_by_count
    into q_score_per, q_cap, sbc
    from public.questions q
    where q.id = new.question_id;

    if new.score is null then
      -- priority 1: score_per * count, capped
      if q_score_per is not null then
        new.score := arr_count * q_score_per;
        if q_cap is not null and new.score > q_cap then
          new.score := q_cap;
        end if;

      -- priority 2: score_by_count mapping
      elsif sbc is not null then
        sbc_score := (sbc ->> arr_count::text)::double precision;
        if sbc_score is not null then
          new.score := sbc_score;
        elsif per_choice_sum is not null then
          new.score := per_choice_sum;
        end if;

      -- priority 3: sum of per-choice scores (if defined)
      elsif per_choice_sum is not null then
        new.score := per_choice_sum;
      end if;
    end if;

    -- Aggregate reasoning/context if none set yet
    if coalesce(new.reasoning, '') = '' and coalesce(per_choice_reasoning, '') <> '' then
      new.reasoning := per_choice_reasoning;
    end if;
    if coalesce(new.model_input_context, '') = '' and coalesce(per_choice_context, '') <> '' then
      new.model_input_context := per_choice_context;
    end if;
  end if;

  -- 3) Derive max_possible_score (unchanged logic with score_per cap consideration)
  select q.score_per, q.cap, q.score_formula into q_score_per, q_cap, q_formula
  from public.questions q where q.id = new.question_id;

  if q_formula is not null and position('100 -' in q_formula) > 0 then
    mx := 100;
  else
    -- from per-choice max
    select max(qc.score) into mx_choice
    from public.question_choices qc where qc.question_id = new.question_id;

    -- from score_per * total options (capped)
    if q_score_per is not null then
      select count(*) into ch_count from public.question_choices qc where qc.question_id = new.question_id;
      mx_calc := q_score_per * ch_count;
      if q_cap is not null and mx_calc > q_cap then
        mx_calc := q_cap;
      end if;
    end if;

    mx := coalesce(mx_choice, mx_calc);
  end if;

  if mx is not null then new.max_possible_score := mx; end if;

  -- 4) Per-answer pillar score JSON by section category
  select sec.category into sec_cat
  from public.questions q
  join public.sections sec on sec.id = q.section_id
  where q.id = new.question_id;

  if sec_cat is not null then
    if new.score is not null and coalesce(new.max_possible_score, 0) > 0 then
      computed_pct := (new.score / new.max_possible_score) * 100;
    else
      computed_pct := null;
    end if;

    new.pillar_scores := jsonb_build_object(sec_cat, round(coalesce(computed_pct, 0)::numeric, 2));
  end if;

  return new;
end;
$function$;

-- 2) Helpful indexes for performance
create index if not exists idx_answers_submission_id on public.answers (submission_id);
create index if not exists idx_answers_question_id on public.answers (question_id);
create index if not exists idx_submissions_created_at on public.submissions (created_at);
