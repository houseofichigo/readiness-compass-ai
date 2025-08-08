-- Batch 2: Auto-attach org on future M0 answers
-- Create trigger function to call ensure_organization_and_attach_submission when M0 is inserted/updated
CREATE OR REPLACE FUNCTION public.trg_attach_org_on_m0_fn()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_company text;
  v_industry text;
  v_country text;
  v_size text;
  v_revenue text;
BEGIN
  -- Only act on M0
  IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') AND NEW.question_id = 'M0' THEN
    -- Extract company name from raw_response or chosen_value
    v_company := COALESCE(NEW.raw_response#>>'{}', NEW.chosen_value);

    -- Early exit if blank
    IF v_company IS NULL OR btrim(v_company) = '' THEN
      RETURN NEW;
    END IF;

    -- Try to read supplementary fields for this submission if present
    SELECT a.raw_response#>>'{}' INTO v_industry FROM public.answers a WHERE a.submission_id = NEW.submission_id AND a.question_id = 'M4_industry' LIMIT 1;
    SELECT a.raw_response#>>'{}' INTO v_country  FROM public.answers a WHERE a.submission_id = NEW.submission_id AND a.question_id = 'M5_country'   LIMIT 1;
    SELECT a.raw_response#>>'{}' INTO v_size     FROM public.answers a WHERE a.submission_id = NEW.submission_id AND a.question_id = 'M6_size'      LIMIT 1;
    SELECT a.raw_response#>>'{}' INTO v_revenue  FROM public.answers a WHERE a.submission_id = NEW.submission_id AND a.question_id = 'M7_revenue'   LIMIT 1;

    -- Attach org if submission is not yet attached; function has guards
    PERFORM public.ensure_organization_and_attach_submission(NEW.submission_id, v_company, v_industry, v_country, v_size, v_revenue, NULL);
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger on answers for M0 inserts/updates
DROP TRIGGER IF EXISTS trg_attach_org_on_m0 ON public.answers;
CREATE TRIGGER trg_attach_org_on_m0
AFTER INSERT OR UPDATE OF raw_response, chosen_value
ON public.answers
FOR EACH ROW
WHEN (NEW.question_id = 'M0')
EXECUTE FUNCTION public.trg_attach_org_on_m0_fn();