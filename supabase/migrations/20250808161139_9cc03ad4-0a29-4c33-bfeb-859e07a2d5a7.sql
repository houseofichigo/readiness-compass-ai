-- Batch 6: Guard completion if M0 invalid/missing and org not attached

CREATE OR REPLACE FUNCTION public.trg_validate_submission_completion_fn()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_company text;
  v_invalid boolean := false;
BEGIN
  -- Only validate when flipping to completed = true
  IF TG_OP = 'UPDATE' AND NEW.completed = true AND (OLD.completed IS DISTINCT FROM NEW.completed) THEN

    -- Require organization_id to be present
    IF NEW.organization_id IS NULL THEN
      RAISE EXCEPTION 'Cannot mark submission % as completed: organization is not attached (missing company name M0).', NEW.id
        USING ERRCODE = 'check_violation';
    END IF;

    -- Fetch M0 company name
    SELECT a.raw_response#>>'{}' INTO v_company
    FROM public.answers a
    WHERE a.submission_id = NEW.id AND a.question_id = 'M0'
    LIMIT 1;

    v_company := nullif(btrim(v_company), '');

    -- Validate company name using same guards to avoid false positives
    IF v_company IS NULL THEN
      v_invalid := true;
    END IF;
    IF NOT v_invalid AND length(v_company) < 2 THEN
      v_invalid := true;
    END IF;
    IF NOT v_invalid AND lower(v_company) IN ('n/a','na','none','n.a.','not applicable') THEN
      v_invalid := true;
    END IF;
    IF NOT v_invalid AND v_company IN ('-','.','--') THEN
      v_invalid := true;
    END IF;

    IF v_invalid THEN
      RAISE EXCEPTION 'Cannot mark submission % as completed: invalid company name (M0).', NEW.id
        USING ERRCODE = 'check_violation';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_validate_submission_completion ON public.submissions;
CREATE TRIGGER trg_validate_submission_completion
BEFORE UPDATE OF completed ON public.submissions
FOR EACH ROW
EXECUTE FUNCTION public.trg_validate_submission_completion_fn();