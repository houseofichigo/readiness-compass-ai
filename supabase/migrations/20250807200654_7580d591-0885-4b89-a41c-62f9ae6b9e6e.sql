-- Retry smoke test insertion after function fix
begin;
insert into public.submissions (id, completed)
values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, false)
on conflict (id) do nothing;

insert into public.answers (submission_id, question_id, chosen_value)
values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, 'A7', 'Integration complexity')
on conflict do nothing;
commit;