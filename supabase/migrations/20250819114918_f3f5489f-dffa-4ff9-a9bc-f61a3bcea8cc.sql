-- Create trigger function to auto-populate submission org/contact info when answers are inserted
CREATE OR REPLACE FUNCTION public.trg_sync_submission_contact_info_fn()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;