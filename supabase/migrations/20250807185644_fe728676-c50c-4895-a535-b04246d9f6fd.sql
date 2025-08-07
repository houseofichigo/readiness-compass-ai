-- Batch 3: Questions + Submissions + Answers

-- 1) questions table
create table if not exists public.questions (
  id text primary key,
  section_id text not null references public.sections(id) on update cascade on delete restrict,
  text text not null,
  type text not null, -- 'single', 'multi', 'rank', etc.
  helper text,
  required boolean,
  sequence integer,
  -- Visibility
  show_if jsonb,
  hide_if jsonb,
  -- Scoring
  score_map jsonb,
  score_map_by_bucket jsonb,
  score_per integer,
  cap integer,
  score_formula text,
  weight integer[],
  max_rank integer,
  max_select integer,
  score_by_count jsonb,
  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.questions enable row level security;

-- Public read (assessment structure)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'questions' AND policyname = 'Questions are publicly readable'
  ) THEN
    EXECUTE 'CREATE POLICY "Questions are publicly readable" ON public.questions FOR SELECT USING (true)';
  END IF;
END $$;

-- Indexes for performance
create index if not exists idx_questions_section_sequence on public.questions (section_id, sequence);

-- updated_at trigger
DROP TRIGGER IF EXISTS trg_questions_updated_at ON public.questions;
CREATE TRIGGER trg_questions_updated_at
BEFORE UPDATE ON public.questions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Realtime support
alter table public.questions replica identity full;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'questions'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.questions';
  END IF;
END $$;

-- 2) submissions table
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on update cascade on delete set null,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Scoring
  total_score double precision,
  max_possible_score double precision,
  percentage_score double precision,
  pillar_scores jsonb,
  readiness_level text,
  -- Timing & Session
  completion_time_minutes integer,
  active_time_minutes integer,
  -- Tracking & Marketing
  ip_address inet,
  user_agent text,
  referrer_url text,
  utm_source text,
  utm_medium text,
  utm_campaign text
);

alter table public.submissions enable row level security;

-- Indexes
create index if not exists idx_submissions_org on public.submissions (organization_id);
create index if not exists idx_submissions_created on public.submissions (created_at);
create index if not exists idx_submissions_completed on public.submissions (completed);

-- updated_at trigger
DROP TRIGGER IF EXISTS trg_submissions_updated_at ON public.submissions;
CREATE TRIGGER trg_submissions_updated_at
BEFORE UPDATE ON public.submissions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Realtime support
alter table public.submissions replica identity full;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'submissions'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.submissions';
  END IF;
END $$;

-- 3) answers table
create table if not exists public.answers (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on update cascade on delete cascade,
  question_id text not null references public.questions(id) on update cascade on delete restrict,
  raw_response jsonb,
  chosen_value text,
  chosen_label text,
  -- Scoring
  score double precision,
  max_possible_score double precision,
  pillar_scores jsonb,
  confidence_score double precision,
  reasoning text,
  model_input_context text,
  -- Timing & Revision
  response_time_seconds integer,
  first_response_at timestamptz,
  final_response_at timestamptz,
  revision_count integer,
  -- Metadata
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Ensure a single row per submission/question
  unique (submission_id, question_id)
);

alter table public.answers enable row level security;

-- Indexes
create index if not exists idx_answers_submission on public.answers (submission_id);
create index if not exists idx_answers_question on public.answers (question_id);

-- updated_at trigger
DROP TRIGGER IF EXISTS trg_answers_updated_at ON public.answers;
CREATE TRIGGER trg_answers_updated_at
BEFORE UPDATE ON public.answers
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Realtime support
alter table public.answers replica identity full;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'answers'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.answers';
  END IF;
END $$;