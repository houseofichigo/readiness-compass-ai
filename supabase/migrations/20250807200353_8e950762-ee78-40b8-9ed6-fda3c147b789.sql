-- Phase 1 retry: fix type casting for round()
begin;

-- 1) Normalize obvious zero-score options where score is NULL
update public.question_choices qc
set score = 0
where qc.score is null
  and (
    lower(coalesce(qc.label, qc.value)) ilike 'none%'
    or lower(coalesce(qc.label, qc.value)) in ('i don''t know','i don’t know','unknown')
    or lower(coalesce(qc.label, qc.value)) ilike 'other%'
    or lower(coalesce(qc.label, qc.value)) ilike 'no%'
    or lower(coalesce(qc.label, qc.value)) ilike 'not%'
    or lower(coalesce(qc.label, qc.value)) ilike 'n/a%'
  );

-- 2) For remaining NULL scores, use question.score_per when available
update public.question_choices qc
set score = q.score_per::double precision
from public.questions q
where qc.question_id = q.id
  and qc.score is null
  and q.score_per is not null;

-- 3) Linear scaling 0..100 based on choice sequence for specific Likert-style questions (A7, S7, C8)
with ranked as (
  select
    qc.question_id,
    qc.value,
    coalesce(qc.sequence, rn) as seq_eff,
    min(coalesce(qc.sequence, rn)) over (partition by qc.question_id) as min_seq,
    max(coalesce(qc.sequence, rn)) over (partition by qc.question_id) as max_seq
  from (
    select
      question_id,
      value,
      sequence,
      row_number() over (partition by question_id order by sequence nulls last, value) as rn
    from public.question_choices
    where question_id in ('A7','S7','C8')
  ) qc
)
update public.question_choices qc
set score = (
  round(((r.seq_eff - r.min_seq)::numeric / nullif((r.max_seq - r.min_seq),0)) * 100::numeric, 2)
)::double precision
from ranked r
where qc.question_id = r.question_id
  and qc.value = r.value
  and qc.score is null
  and r.max_seq is not null;

-- 4) Fallback: any remaining NULL scores -> neutral 50
update public.question_choices qc
set score = 50
where qc.score is null;

-- 5) Backfill reasoning and model_input_context templates where missing/blank
update public.question_choices qc
set reasoning = case when (qc.reasoning is null or trim(qc.reasoning) = '')
                     then concat('Selected "', coalesce(qc.label, qc.value), '" for question ', q.id, ': ', left(q.text, 120), '...')
                     else qc.reasoning end,
    model_input_context = case when (qc.model_input_context is null or trim(qc.model_input_context) = '')
                               then concat('qid=', q.id, '; value=', qc.value, '; label=', coalesce(qc.label, qc.value))
                               else qc.model_input_context end
from public.questions q
where q.id = qc.question_id;

commit;