-- Batch 1: Database functions, triggers, and indexes to support anonymous org creation, sessions, and analytics + ensure scoring triggers

-- 1) Helper: simple slugify without extensions
create or replace function public.slugify(_input text)
returns text
language sql
immutable
as $$
  select trim(both '-' from lower(regexp_replace(coalesce(_input,''), '[^a-zA-Z0-9]+', '-', 'g')));
$$;

-- 2) Ensure organization exists and attach to submission (SECURITY DEFINER to bypass RLS)
create or replace function public.ensure_organization_and_attach_submission(
  _submission_id uuid,
  _name text,
  _industry text default null,
  _country text default null,
  _size_bucket text default null,
  _revenue_bucket text default null,
  _track text default null
) returns uuid
language plpgsql
security definer
set search_path to public
as $$
declare
  v_slug text;
  v_org_id uuid;
  v_name text;
begin
  v_name := nullif(trim(_name), '');
  if v_name is null then
    -- If no name, nothing to do
    return null;
  end if;

  v_slug := slugify(v_name);

  -- Upsert organization by slug
  insert into public.organizations (id, name, slug, industry, country, size_bucket, revenue_bucket, track)
  values (gen_random_uuid(), v_name, v_slug, _industry, _country, _size_bucket, _revenue_bucket, _track)
  on conflict (slug) do update set
    name = excluded.name,
    industry = coalesce(excluded.industry, organizations.industry),
    country = coalesce(excluded.country, organizations.country),
    size_bucket = coalesce(excluded.size_bucket, organizations.size_bucket),
    revenue_bucket = coalesce(excluded.revenue_bucket, organizations.revenue_bucket),
    track = coalesce(excluded.track, organizations.track),
    updated_at = now()
  returning organizations.id into v_org_id;

  -- Attach to submission
  update public.submissions s
  set organization_id = v_org_id
  where s.id = _submission_id;

  return v_org_id;
end;
$$;

-- Permissions to call from anon/authenticated clients
grant execute on function public.ensure_organization_and_attach_submission(uuid, text, text, text, text, text, text) to anon, authenticated;

-- 3) Record a minimal assessment session row
create or replace function public.record_assessment_session(
  _submission_id uuid,
  _section_id text default null,
  _started_at timestamptz default now(),
  _completed_at timestamptz default now()
) returns uuid
language plpgsql
security definer
set search_path to public
as $$
declare v_id uuid;
begin
  insert into public.assessment_sessions (
    id, submission_id, section_id, started_at, completed_at, created_at
  ) values (
    gen_random_uuid(), _submission_id, _section_id, _started_at, _completed_at, now()
  ) returning id into v_id;
  return v_id;
end; $$;

grant execute on function public.record_assessment_session(uuid, text, timestamptz, timestamptz) to anon, authenticated;

-- 4) Record analytics event helper
create or replace function public.record_analytics_event(
  _submission_id uuid,
  _event_name text,
  _event_category text default 'assessment',
  _event_data jsonb default '{}'::jsonb,
  _section_id text default null,
  _question_id text default null
) returns uuid
language plpgsql
security definer
set search_path to public
as $$
declare v_id uuid;
begin
  insert into public.analytics_events (
    id, submission_id, event_name, event_category, event_data, section_id, question_id, created_at
  ) values (
    gen_random_uuid(), _submission_id, _event_name, _event_category, _event_data, _section_id, _question_id, now()
  ) returning id into v_id;
  return v_id;
end; $$;

grant execute on function public.record_analytics_event(uuid, text, text, jsonb, text, text) to anon, authenticated;

-- 5) Ensure scoring triggers on answers
-- BEFORE trigger to compute per-answer fields
create or replace function public.tg_before_answers_set_scoring()
returns trigger
language plpgsql
security definer
set search_path to public
as $$
begin
  new := public.set_answer_scoring(new);
  return new;
end; $$;

-- AFTER trigger to recompute submission aggregates
create or replace function public.tg_after_answers_compute_submission()
returns trigger
language plpgsql
security definer
set search_path to public
as $$
begin
  perform public.trigger_compute_on_answers();
  return new;
end; $$;

-- Drop existing triggers if any (idempotent)
drop trigger if exists before_answers_set_scoring on public.answers;
drop trigger if exists after_answers_compute_submission on public.answers;

-- Create triggers
create trigger before_answers_set_scoring
before insert or update on public.answers
for each row execute function public.tg_before_answers_set_scoring();

create trigger after_answers_compute_submission
after insert or update on public.answers
for each row execute function public.tg_after_answers_compute_submission();

-- 6) Performance indexes
create index if not exists idx_answers_submission_id on public.answers (submission_id);
create index if not exists idx_answers_question_id on public.answers (question_id);
create index if not exists idx_submissions_created_at on public.submissions (created_at);
