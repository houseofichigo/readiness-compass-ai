-- Attach scoring and updated_at triggers (idempotent)

-- 1) BEFORE INSERT/UPDATE on answers → set_answer_scoring
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_answers_set_scoring'
  ) THEN
    DROP TRIGGER trg_answers_set_scoring ON public.answers;
  END IF;
END$$;

CREATE TRIGGER trg_answers_set_scoring
BEFORE INSERT OR UPDATE ON public.answers
FOR EACH ROW
EXECUTE FUNCTION public.set_answer_scoring();

-- 2) AFTER INSERT/UPDATE/DELETE on answers → trigger_compute_on_answers
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_answers_compute_scores'
  ) THEN
    DROP TRIGGER trg_answers_compute_scores ON public.answers;
  END IF;
END$$;

CREATE TRIGGER trg_answers_compute_scores
AFTER INSERT OR UPDATE OR DELETE ON public.answers
FOR EACH ROW
EXECUTE FUNCTION public.trigger_compute_on_answers();

-- 3) BEFORE UPDATE updated_at triggers across tables
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_answers_updated_at') THEN
    DROP TRIGGER update_answers_updated_at ON public.answers;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_submissions_updated_at') THEN
    DROP TRIGGER update_submissions_updated_at ON public.submissions;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_questions_updated_at') THEN
    DROP TRIGGER update_questions_updated_at ON public.questions;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_question_choices_updated_at') THEN
    DROP TRIGGER update_question_choices_updated_at ON public.question_choices;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_sections_updated_at') THEN
    DROP TRIGGER update_sections_updated_at ON public.sections;
  END IF;
END$$;

CREATE TRIGGER update_answers_updated_at
BEFORE UPDATE ON public.answers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at
BEFORE UPDATE ON public.submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_questions_updated_at
BEFORE UPDATE ON public.questions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_question_choices_updated_at
BEFORE UPDATE ON public.question_choices
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sections_updated_at
BEFORE UPDATE ON public.sections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();