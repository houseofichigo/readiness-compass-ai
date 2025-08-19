-- Add organization name and contact info columns to submissions table for better tracking
ALTER TABLE public.submissions 
ADD COLUMN organization_name text,
ADD COLUMN contact_email text,
ADD COLUMN contact_name text;

-- Create index for faster queries on organization_name
CREATE INDEX IF NOT EXISTS idx_submissions_organization_name ON public.submissions(organization_name);
CREATE INDEX IF NOT EXISTS idx_submissions_contact_email ON public.submissions(contact_email);

-- Create trigger function to auto-populate submission org/contact info when answers are inserted
CREATE OR REPLACE FUNCTION public.trg_sync_submission_contact_info_fn()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Only process M0 (org name), M1 (contact name), M2 (contact email)
  IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') AND NEW.question_id IN ('M0', 'M1', 'M2') THEN
    
    -- Update submission with the new contact info
    UPDATE public.submissions s SET
      organization_name = CASE 
        WHEN NEW.question_id = 'M0' THEN 
          COALESCE(NEW.raw_response#>>'{}', NEW.chosen_value)
        ELSE s.organization_name 
      END,
      contact_name = CASE 
        WHEN NEW.question_id = 'M1' THEN 
          COALESCE(NEW.raw_response#>>'{}', NEW.chosen_value)
        ELSE s.contact_name 
      END,
      contact_email = CASE 
        WHEN NEW.question_id = 'M2' THEN 
          COALESCE(NEW.raw_response#>>'{}', NEW.chosen_value)
        ELSE s.contact_email 
      END,
      updated_at = now()
    WHERE s.id = NEW.submission_id;
  END IF;
  
  RETURN NEW;
END;
$function$

-- Create trigger to auto-sync contact info
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
WHERE s.id = cd.submission_id
  AND (s.organization_name IS NULL OR s.contact_email IS NULL OR s.contact_name IS NULL);