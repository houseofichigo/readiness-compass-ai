-- Fix migration: remove references to non-existent question.reasoning/model_input_context columns

-- 1) Smarter max_possible_score derivation on answers
create or replace function public.set_answer_scoring()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  lbl text;
  sc double precision;
  mx double precision;
  mx_choice double precision;
  mx_calc double precision;
  ch_count int;
  q_score_per int;
  q_cap int;
  q_formula text;
begin
  -- Copy label/score from selected choice for single-choice answers
  if new.chosen_value is not null then
    select qc.label, qc.score into lbl, sc
    from public.question_choices qc
    where qc.question_id = new.question_id and qc.value = new.chosen_value;

    if lbl is not null then new.chosen_label := lbl; end if;
    if sc is not null then new.score := sc; end if;
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

  return new;
end;
$$;

-- Recreate triggers idempotently
create or replace function public.trigger_compute_on_answers()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare sid uuid;
begin
  sid := coalesce(new.submission_id, old.submission_id);
  perform public.compute_submission_scores(sid);
  return coalesce(new, old);
end;
$$;

drop trigger if exists trg_answers_set_scoring on public.answers;
create trigger trg_answers_set_scoring
before insert or update on public.answers
for each row execute procedure public.set_answer_scoring();

drop trigger if exists trg_answers_compute on public.answers;
create trigger trg_answers_compute
after insert or update on public.answers
for each row execute function public.trigger_compute_on_answers();

-- 2) Backfill per-choice scores using score_per for specific questions
update public.question_choices qc
set score = case
  when qc.value ilike 'none%' then 0
  when lower(qc.value) in ('i don’t know','i don''t know') then 0
  when qc.value ilike 'other%' then 0
  else q.score_per::double precision
end
from public.questions q
where qc.question_id = q.id
  and q.id in ('A8','A4','D1','D5','S9','T8')
  and q.score_per is not null
  and qc.score is null;

-- 3) Ensure C9 mapping exists (if null)
update public.question_choices qc
set score = v.score::double precision
from (
  values
    ('Resistant',1),
    ('Cautious',2),
    ('Interested',3),
    ('Proactive',4),
    ('Active pilots',5)
) as v(lbl, score)
where qc.question_id = 'C9' and qc.score is null and qc.label = v.lbl;

-- 4) Re-run scoring on existing answers and submissions to populate fields and pillar scores
update public.answers set chosen_value = chosen_value;

do $$
declare sid uuid;
begin
  for sid in select id from public.submissions loop
    perform public.compute_submission_scores(sid);
  end loop;
end $$;