-- Allow public (anon and authenticated) to submit assessments without org linkage
-- 1) Submissions: public insert when organization_id is NULL
create policy if not exists "Public can insert anonymous submissions"
  on public.submissions
  for insert
  to public
  with check (organization_id is null);

-- 2) Answers: public insert only for anonymous submissions
create policy if not exists "Public can insert answers for anonymous submissions"
  on public.answers
  for insert
  to public
  with check (exists (
    select 1 from public.submissions s
    where s.id = submissions_id_or_null(submission_id)
  ));

-- Helper function to validate that submission is anonymous (organization_id IS NULL)
-- Using a SECURITY DEFINER stable function to avoid complex policy logic and ensure performance
create or replace function public.submissions_id_or_null(_submission_id uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select s.id from public.submissions s
  where s.id = _submission_id and s.organization_id is null
$$;

-- 3) Create triggers for scoring and recompute if not present
do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'answers_set_scoring') then
    create trigger answers_set_scoring
    before insert or update on public.answers
    for each row execute function public.set_answer_scoring();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'answers_compute_scores') then
    create trigger answers_compute_scores
    after insert or update or delete on public.answers
    for each row execute function public.trigger_compute_on_answers();
  end if;
end $$;