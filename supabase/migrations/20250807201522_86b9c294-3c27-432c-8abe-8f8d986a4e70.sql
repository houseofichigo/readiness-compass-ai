-- Phase 4: User feedback collection table with RLS
begin;

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  submission_id uuid null,
  email text null,
  rating int null,
  comments text null,
  page text null,
  user_agent text null,
  constraint feedback_rating_range check (rating is null or (rating between 1 and 5))
);

alter table public.feedback enable row level security;

-- Allow anyone (including anonymous) to submit feedback
create policy if not exists "Anyone can insert feedback" on public.feedback
for insert
with check (true);

-- Admins can manage all feedback
create policy if not exists "Admin can manage feedback" on public.feedback
for all
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

commit;