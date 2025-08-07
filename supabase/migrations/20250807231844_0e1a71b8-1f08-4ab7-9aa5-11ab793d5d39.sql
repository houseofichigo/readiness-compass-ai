-- Ensure updated_at auto-updates on key tables
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_submissions_updated_at'
  ) THEN
    CREATE TRIGGER set_submissions_updated_at
    BEFORE UPDATE ON public.submissions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_answers_updated_at'
  ) THEN
    CREATE TRIGGER set_answers_updated_at
    BEFORE UPDATE ON public.answers
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_organizations_updated_at'
  ) THEN
    CREATE TRIGGER set_organizations_updated_at
    BEFORE UPDATE ON public.organizations
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

-- Attach scoring triggers to answers so scores and totals compute automatically
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_set_answer_scoring'
  ) THEN
    DROP TRIGGER trg_set_answer_scoring ON public.answers;
  END IF;
  CREATE TRIGGER trg_set_answer_scoring
  BEFORE INSERT OR UPDATE ON public.answers
  FOR EACH ROW EXECUTE FUNCTION public.set_answer_scoring();
END $$;

DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_recompute_on_answers'
  ) THEN
    DROP TRIGGER trg_recompute_on_answers ON public.answers;
  END IF;
  CREATE TRIGGER trg_recompute_on_answers
  AFTER INSERT OR UPDATE OR DELETE ON public.answers
  FOR EACH ROW EXECUTE FUNCTION public.trigger_compute_on_answers();
END $$;
