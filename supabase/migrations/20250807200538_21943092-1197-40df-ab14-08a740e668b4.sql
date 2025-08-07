-- Phase 1: Scoring smoke test - create sample submission and answer
begin;

-- Use deterministic UUIDs for verification
-- Note: Using explicit UUID literals for traceability

-- 1) Ensure test submission exists
insert into public.submissions (id, completed)
values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, false)
on conflict (id) do nothing;

-- 2) Insert a sample answer for question A7 (choose the last option with highest sequence)
-- Pick a value known to exist from choices
insert into public.answers (submission_id, question_id, chosen_value)
values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, 'A7', 'Integration complexity')
on conflict do nothing;

commit;