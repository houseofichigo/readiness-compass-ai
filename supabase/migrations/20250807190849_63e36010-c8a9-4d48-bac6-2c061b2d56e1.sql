-- Batch 6: Auth scaffolding (profiles, org membership) and org-scoped RLS

-- 1) profiles table + trigger from auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- updated_at trigger
drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

-- Function + trigger to insert profile on new user
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2) organization_members table
create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  member_role text, -- 'owner' | 'member'
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

alter table public.organization_members enable row level security;

-- 3) Helper functions (SECURITY DEFINER) for RLS
create or replace function public.is_org_member(_org_id uuid, _user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.organization_members m
    where m.organization_id = _org_id and m.user_id = _user_id
  );
$$;

create or replace function public.submission_org(_submission_id uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select s.organization_id from public.submissions s where s.id = _submission_id;
$$;

-- 4) RLS policies for org-scoped access (in addition to admin policies already created)
-- organizations: members can select their org
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='organizations' AND policyname='Org members can select their org'
  ) THEN
    CREATE POLICY "Org members can select their org"
    ON public.organizations
    FOR SELECT
    TO authenticated
    USING (public.is_org_member(id));
  END IF;
END $$;

-- submissions: members CRUD within their org
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='submissions' AND policyname='Members can select submissions of their org'
  ) THEN
    CREATE POLICY "Members can select submissions of their org" ON public.submissions
    FOR SELECT TO authenticated USING (organization_id IS NOT NULL AND public.is_org_member(organization_id));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='submissions' AND policyname='Members can insert submissions into their org'
  ) THEN
    CREATE POLICY "Members can insert submissions into their org" ON public.submissions
    FOR INSERT TO authenticated WITH CHECK (organization_id IS NOT NULL AND public.is_org_member(organization_id));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='submissions' AND policyname='Members can update submissions of their org'
  ) THEN
    CREATE POLICY "Members can update submissions of their org" ON public.submissions
    FOR UPDATE TO authenticated USING (organization_id IS NOT NULL AND public.is_org_member(organization_id)) WITH CHECK (organization_id IS NOT NULL AND public.is_org_member(organization_id));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='submissions' AND policyname='Members can delete submissions of their org'
  ) THEN
    CREATE POLICY "Members can delete submissions of their org" ON public.submissions
    FOR DELETE TO authenticated USING (organization_id IS NOT NULL AND public.is_org_member(organization_id));
  END IF;
END $$;

-- answers: scope through submission -> organization
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='answers' AND policyname='Members can select answers of their org'
  ) THEN
    CREATE POLICY "Members can select answers of their org" ON public.answers
    FOR SELECT TO authenticated USING (public.is_org_member(public.submission_org(submission_id)));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='answers' AND policyname='Members can insert answers of their org'
  ) THEN
    CREATE POLICY "Members can insert answers of their org" ON public.answers
    FOR INSERT TO authenticated WITH CHECK (public.is_org_member(public.submission_org(submission_id)));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='answers' AND policyname='Members can update answers of their org'
  ) THEN
    CREATE POLICY "Members can update answers of their org" ON public.answers
    FOR UPDATE TO authenticated USING (public.is_org_member(public.submission_org(submission_id))) WITH CHECK (public.is_org_member(public.submission_org(submission_id)));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='answers' AND policyname='Members can delete answers of their org'
  ) THEN
    CREATE POLICY "Members can delete answers of their org" ON public.answers
    FOR DELETE TO authenticated USING (public.is_org_member(public.submission_org(submission_id)));
  END IF;
END $$;

-- section_scores
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='section_scores' AND policyname='Members can access section_scores of their org'
  ) THEN
    CREATE POLICY "Members can access section_scores of their org" ON public.section_scores
    FOR ALL TO authenticated USING (public.is_org_member(public.submission_org(submission_id))) WITH CHECK (public.is_org_member(public.submission_org(submission_id)));
  END IF;
END $$;

-- question_scores
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='question_scores' AND policyname='Members can access question_scores of their org'
  ) THEN
    CREATE POLICY "Members can access question_scores of their org" ON public.question_scores
    FOR ALL TO authenticated USING (public.is_org_member(public.submission_org(submission_id))) WITH CHECK (public.is_org_member(public.submission_org(submission_id)));
  END IF;
END $$;

-- assessment_sessions (has organization_id and submission_id)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='assessment_sessions' AND policyname='Members can access sessions of their org'
  ) THEN
    CREATE POLICY "Members can access sessions of their org" ON public.assessment_sessions
    FOR ALL TO authenticated USING (
      (organization_id IS NOT NULL AND public.is_org_member(organization_id)) OR
      public.is_org_member(public.submission_org(submission_id))
    ) WITH CHECK (
      (organization_id IS NOT NULL AND public.is_org_member(organization_id)) OR
      public.is_org_member(public.submission_org(submission_id))
    );
  END IF;
END $$;

-- analytics_events (org or through submission)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='analytics_events' AND policyname='Members can access analytics of their org'
  ) THEN
    CREATE POLICY "Members can access analytics of their org" ON public.analytics_events
    FOR ALL TO authenticated USING (
      (organization_id IS NOT NULL AND public.is_org_member(organization_id)) OR
      public.is_org_member(public.submission_org(submission_id))
    ) WITH CHECK (
      (organization_id IS NOT NULL AND public.is_org_member(organization_id)) OR
      public.is_org_member(public.submission_org(submission_id))
    );
  END IF;
END $$;