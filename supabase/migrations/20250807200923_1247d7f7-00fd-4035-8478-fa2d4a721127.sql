-- Re-apply score backfill for A7, S7, C8 and templates, with RLS disabled during update
begin;
alter table public.question_choices disable row level security;

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
  and qc.score is null;

-- Ensure no remaining NULL scores
update public.question_choices set score = 50 where score is null;

alter table public.question_choices enable row level security;
commit;