-- Function to check if a submission is anonymous (no organization)
create or replace function public.is_anonymous_submission(_submission_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.submissions s
    where s.id = _submission_id and s.organization_id is null
  );
$$;

-- Submissions: allow public inserts when organization_id is null
drop policy if exists "Public can insert anonymous submissions" on public.submissions;
create policy "Public can insert anonymous submissions"
  on public.submissions
  for insert
  to public
  with check (organization_id is null);

-- Answers: allow public inserts tied to anonymous submissions
drop policy if exists "Public can insert answers for anonymous submissions" on public.answers;
create policy "Public can insert answers for anonymous submissions"
  on public.answers
  for insert
  to public
  with check (public.is_anonymous_submission(submission_id));

-- Triggers for scoring and recomputation
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