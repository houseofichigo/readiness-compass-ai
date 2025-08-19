-- Drop existing trigger if it exists and create new one
DROP TRIGGER IF EXISTS trg_sync_submission_contact_info ON public.answers;

CREATE TRIGGER trg_sync_submission_contact_info
  AFTER INSERT OR UPDATE ON public.answers
  FOR EACH ROW
  EXECUTE FUNCTION public.trg_sync_submission_contact_info_fn();

-- Backfill existing submissions with organization name and contact info
WITH contact_data AS (
  SELECT DISTINCT 
    a.submission_id,
    MAX(CASE WHEN a.question_id = 'M0' THEN COALESCE(a.raw_response#>>'{}', a.chosen_value) END) as org_name,
    MAX(CASE WHEN a.question_id = 'M1' THEN COALESCE(a.raw_response#>>'{}', a.chosen_value) END) as contact_name,
    MAX(CASE WHEN a.question_id = 'M2' THEN COALESCE(a.raw_response#>>'{}', a.chosen_value) END) as contact_email
  FROM public.answers a
  WHERE a.question_id IN ('M0', 'M1', 'M2')
  GROUP BY a.submission_id
)
UPDATE public.submissions s SET
  organization_name = cd.org_name,
  contact_name = cd.contact_name,
  contact_email = cd.contact_email,
  updated_at = now()
FROM contact_data cd
WHERE s.id = cd.submission_id;