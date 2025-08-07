
-- 1) Ensure RLS is enabled (no-op if already enabled)
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;

-- 2) Explicit anon policies for anonymous submissions

-- Allow anon (unauthenticated) to insert anonymous submissions
-- (organization_id must be NULL)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'submissions'
      AND policyname = 'Anon can insert anonymous submissions'
  ) THEN
    CREATE POLICY "Anon can insert anonymous submissions"
      ON public.submissions
      FOR INSERT
      TO anon
      WITH CHECK (organization_id IS NULL);
  END IF;
END$$;

-- Allow anon to insert answers only when they belong to an anonymous submission
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'answers'
      AND policyname = 'Anon can insert answers for anonymous submissions'
  ) THEN
    CREATE POLICY "Anon can insert answers for anonymous submissions"
      ON public.answers
      FOR INSERT
      TO anon
      WITH CHECK (public.is_anonymous_submission(submission_id));
  END IF;
END$$;

-- 3) Keep updated_at fresh on updates

-- Add trigger function is already present: public.update_updated_at_column()
-- Attach triggers if missing

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'set_timestamp_submissions'
  ) THEN
    CREATE TRIGGER set_timestamp_submissions
      BEFORE UPDATE ON public.submissions
      FOR EACH ROW
      EXECUTE PROCEDURE public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'set_timestamp_answers'
  ) THEN
    CREATE TRIGGER set_timestamp_answers
      BEFORE UPDATE ON public.answers
      FOR EACH ROW
      EXECUTE PROCEDURE public.update_updated_at_column();
  END IF;
END$$;

-- 4) Scoring + recompute triggers on answers

-- BEFORE: derive chosen_label/score and max_possible_score
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'before_answers_set_scoring'
  ) THEN
    CREATE TRIGGER before_answers_set_scoring
      BEFORE INSERT OR UPDATE ON public.answers
      FOR EACH ROW
      EXECUTE PROCEDURE public.set_answer_scoring();
  END IF;
END$$;

-- AFTER: recompute section_scores and submission totals
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'after_answers_recompute'
  ) THEN
    CREATE TRIGGER after_answers_recompute
      AFTER INSERT OR UPDATE ON public.answers
      FOR EACH ROW
      EXECUTE PROCEDURE public.trigger_compute_on_answers();
  END IF;
END$$;
