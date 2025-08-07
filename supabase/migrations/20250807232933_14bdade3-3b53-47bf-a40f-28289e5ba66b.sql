-- Step 1: Add robust DB automation (scoring + updated_at + org stats)

-- Ensure updated_at maintenance triggers on key tables
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_submissions_updated_at') THEN
    CREATE TRIGGER trg_submissions_updated_at
    BEFORE UPDATE ON public.submissions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_answers_updated_at') THEN
    CREATE TRIGGER trg_answers_updated_at
    BEFORE UPDATE ON public.answers
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_organizations_updated_at') THEN
    CREATE TRIGGER trg_organizations_updated_at
    BEFORE UPDATE ON public.organizations
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_sections_updated_at') THEN
    CREATE TRIGGER trg_sections_updated_at
    BEFORE UPDATE ON public.sections
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_questions_updated_at') THEN
    CREATE TRIGGER trg_questions_updated_at
    BEFORE UPDATE ON public.questions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_question_choices_updated_at') THEN
    CREATE TRIGGER trg_question_choices_updated_at
    BEFORE UPDATE ON public.question_choices
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_analytics_events_updated_at') THEN
    CREATE TRIGGER trg_analytics_events_updated_at
    BEFORE UPDATE ON public.analytics_events
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_assessment_sessions_updated_at') THEN
    CREATE TRIGGER trg_assessment_sessions_updated_at
    BEFORE UPDATE ON public.assessment_sessions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

-- Ensure answer scoring runs automatically on write
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_answers_set_scoring') THEN
    CREATE TRIGGER trg_answers_set_scoring
    BEFORE INSERT OR UPDATE ON public.answers
    FOR EACH ROW EXECUTE FUNCTION public.set_answer_scoring();
  END IF;
END $$;

-- Ensure submission aggregate scores recompute after answer changes
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_answers_compute_scores') THEN
    CREATE TRIGGER trg_answers_compute_scores
    AFTER INSERT OR UPDATE OR DELETE ON public.answers
    FOR EACH ROW EXECUTE FUNCTION public.trigger_compute_on_answers();
  END IF;
END $$;

-- Ensure organization stats recompute on submission insert/update
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_submissions_recompute_org_stats') THEN
    CREATE TRIGGER trg_submissions_recompute_org_stats
    AFTER INSERT OR UPDATE ON public.submissions
    FOR EACH ROW
    WHEN (NEW.organization_id IS NOT NULL)
    EXECUTE FUNCTION public.trg_recompute_org_stats_fn();
  END IF;
END $$;
