-- Batch 4: section_scores, question_scores, assessment_sessions, analytics_events

-- 1) section_scores
create table if not exists public.section_scores (
  submission_id uuid not null references public.submissions(id) on update cascade on delete cascade,
  section_id text not null references public.sections(id) on update cascade on delete restrict,
  score double precision,
  primary key (submission_id, section_id)
);

alter table public.section_scores enable row level security;

-- Indexes
create index if not exists idx_section_scores_section on public.section_scores (section_id);

-- Realtime support
alter table public.section_scores replica identity full;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'section_scores'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.section_scores';
  END IF;
END $$;

-- 2) question_scores
create table if not exists public.question_scores (
  submission_id uuid not null references public.submissions(id) on update cascade on delete cascade,
  question_id text not null references public.questions(id) on update cascade on delete restrict,
  score double precision,
  primary key (submission_id, question_id)
);

alter table public.question_scores enable row level security;

-- Indexes
create index if not exists idx_question_scores_question on public.question_scores (question_id);

-- Realtime support
alter table public.question_scores replica identity full;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'question_scores'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.question_scores';
  END IF;
END $$;

-- 3) assessment_sessions
create table if not exists public.assessment_sessions (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid references public.submissions(id) on update cascade on delete cascade,
  organization_id uuid references public.organizations(id) on update cascade on delete set null,
  section_id text references public.sections(id) on update cascade on delete restrict,
  started_at timestamptz,
  paused_at timestamptz,
  resumed_at timestamptz,
  completed_at timestamptz,
  time_spent_seconds integer,
  active_time_seconds integer,
  idle_time_seconds integer,
  questions_answered integer,
  questions_skipped integer,
  questions_total integer,
  completion_percentage double precision,
  revision_count integer,
  help_requests integer,
  exit_question_id text references public.questions(id) on update cascade on delete set null,
  exit_reason text,
  created_at timestamptz not null default now()
);

alter table public.assessment_sessions enable row level security;

-- Indexes
create index if not exists idx_assessment_sessions_submission on public.assessment_sessions (submission_id);
create index if not exists idx_assessment_sessions_section on public.assessment_sessions (section_id);
create index if not exists idx_assessment_sessions_created on public.assessment_sessions (created_at);

-- Realtime support
alter table public.assessment_sessions replica identity full;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'assessment_sessions'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.assessment_sessions';
  END IF;
END $$;

-- 4) analytics_events
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  event_category text,
  submission_id uuid references public.submissions(id) on update cascade on delete set null,
  organization_id uuid references public.organizations(id) on update cascade on delete set null,
  section_id text references public.sections(id) on update cascade on delete set null,
  question_id text references public.questions(id) on update cascade on delete set null,
  event_data jsonb,
  previous_value jsonb,
  new_value jsonb,
  response_time_ms integer,
  load_time_ms integer,
  user_agent text,
  ip_address inet,
  browser_info jsonb,
  screen_size text,
  device_type text,
  country_code char(2),
  timezone text,
  created_at timestamptz not null default now()
);

alter table public.analytics_events enable row level security;

-- Indexes
create index if not exists idx_analytics_events_submission on public.analytics_events (submission_id);
create index if not exists idx_analytics_events_event_name on public.analytics_events (event_name);
create index if not exists idx_analytics_events_created on public.analytics_events (created_at);

-- Realtime support
alter table public.analytics_events replica identity full;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'analytics_events'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.analytics_events';
  END IF;
END $$;