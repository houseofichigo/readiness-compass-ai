-- Batch 5: Roles, Admin RLS policies, and performance indexes

-- 1) Roles enum and user_roles table
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 2) Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- 3) Admin RLS policies on all domain tables
-- Helper DO block to create policy if missing
DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'organizations', 'users', 'questions', 'sections', 'tracks',
    'submissions', 'answers', 'section_scores', 'question_scores',
    'assessment_sessions', 'analytics_events', 'user_roles'
  ]) LOOP
    -- SELECT policy
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = tbl AND policyname = 'Admin can select all'
    ) THEN
      EXECUTE format('CREATE POLICY %I ON public.%I FOR SELECT TO authenticated USING (public.has_role(auth.uid(), ''admin''))', 'Admin can select all', tbl);
    END IF;

    -- INSERT policy
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = tbl AND policyname = 'Admin can insert all'
    ) THEN
      EXECUTE format('CREATE POLICY %I ON public.%I FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), ''admin''))', 'Admin can insert all', tbl);
    END IF;

    -- UPDATE policy
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = tbl AND policyname = 'Admin can update all'
    ) THEN
      EXECUTE format('CREATE POLICY %I ON public.%I FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), ''admin'')) WITH CHECK (public.has_role(auth.uid(), ''admin''))', 'Admin can update all', tbl);
    END IF;

    -- DELETE policy
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = tbl AND policyname = 'Admin can delete all'
    ) THEN
      EXECUTE format('CREATE POLICY %I ON public.%I FOR DELETE TO authenticated USING (public.has_role(auth.uid(), ''admin''))', 'Admin can delete all', tbl);
    END IF;
  END LOOP;
END $$;

-- NOTE: Public read policies already exist for tracks/sections/questions; they remain in place.

-- 4) Performance indexes
-- questions JSONB visibility
CREATE INDEX IF NOT EXISTS idx_questions_show_if_gin ON public.questions USING GIN (show_if);
CREATE INDEX IF NOT EXISTS idx_questions_hide_if_gin ON public.questions USING GIN (hide_if);

-- submissions numeric / jsonb
CREATE INDEX IF NOT EXISTS idx_submissions_percentage_score ON public.submissions (percentage_score);
CREATE INDEX IF NOT EXISTS idx_submissions_pillar_scores_gin ON public.submissions USING GIN (pillar_scores);

-- answers jsonb
CREATE INDEX IF NOT EXISTS idx_answers_pillar_scores_gin ON public.answers USING GIN (pillar_scores);
CREATE INDEX IF NOT EXISTS idx_answers_raw_response_gin ON public.answers USING GIN (raw_response);

-- analytics_events jsonb
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_data_gin ON public.analytics_events USING GIN (event_data);
CREATE INDEX IF NOT EXISTS idx_analytics_events_browser_info_gin ON public.analytics_events USING GIN (browser_info);

-- 5) Realtime already enabled on all tables in previous batches
