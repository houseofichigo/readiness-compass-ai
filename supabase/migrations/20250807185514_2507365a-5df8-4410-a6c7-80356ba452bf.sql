-- Batch 2: Organizations + Users
-- 1) organizations table
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  industry text,
  industry_other text,
  sub_industry text,
  country text,
  region text,
  size_bucket text,
  revenue_bucket text,
  track text references public.tracks(id) on update cascade on delete set null,
  regulatory_status text,
  -- Analytics roll-ups
  first_submission_at timestamptz,
  last_submission_at timestamptz,
  total_submissions integer,
  completed_submissions integer,
  avg_overall_score double precision,
  median_score double precision,
  pillar_scores_avg jsonb,
  pillar_scores_median jsonb,
  benchmark_percentile integer,
  -- Contact & Business
  primary_contact_email text,
  website text,
  linkedin_url text,
  employee_count_exact integer,
  annual_revenue_exact numeric,
  -- Metadata
  is_verified boolean not null default false,
  verification_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.organizations enable row level security;

-- Basic indexes
create index if not exists idx_organizations_name on public.organizations (name);
create index if not exists idx_organizations_track on public.organizations (track);
create index if not exists idx_organizations_is_verified on public.organizations (is_verified);

-- updated_at trigger
DROP TRIGGER IF EXISTS trg_organizations_updated_at ON public.organizations;
CREATE TRIGGER trg_organizations_updated_at
BEFORE UPDATE ON public.organizations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Realtime support
alter table public.organizations replica identity full;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'organizations'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.organizations';
  END IF;
END $$;

-- RLS policies
-- Keep secure by default (no public access). We'll add admin/org-scoped policies when auth is implemented.

-- 2) users table (application-level users, optional until auth is wired)
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  role text, -- e.g. 'admin', 'respondent'
  password_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.users enable row level security;

-- updated_at trigger
DROP TRIGGER IF EXISTS trg_users_updated_at ON public.users;
CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Realtime support
alter table public.users replica identity full;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'users'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.users';
  END IF;
END $$;