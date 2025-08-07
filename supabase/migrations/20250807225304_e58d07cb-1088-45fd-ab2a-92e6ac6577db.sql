-- Enhance set_answer_scoring to also populate reasoning, model_input_context, and per-answer pillar_scores
CREATE OR REPLACE FUNCTION public.set_answer_scoring()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
begin
  -- Copy metadata from selected choice for single-choice answers
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

  -- Derive max_possible_score
  select q.score_per, q.cap, q.score_formula into q_score_per, q_cap, q_formula
  from public.questions q where q.id = new.question_id;

  -- If formula-based with 100 - k*count pattern, set 100
  if q_formula is not null and position('100 -' in q_formula) > 0 then
    mx := 100;
  else
    -- Try from choices
    select max(qc.score) into mx_choice
    from public.question_choices qc where qc.question_id = new.question_id;

    -- Try from score_per * option_count (capped)
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

  -- Set per-answer pillar_scores JSON using the section category
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
$$;