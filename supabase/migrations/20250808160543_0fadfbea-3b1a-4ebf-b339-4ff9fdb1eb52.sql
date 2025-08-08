-- Batch 4: Auto-set/update member roles based on M3 answers
CREATE OR REPLACE FUNCTION public.trg_update_member_role_on_m3_fn()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_role_text text;
  v_member_role text := 'member';
  v_email text;
  v_user_id uuid;
  v_org_id uuid;
  v_company text;
  v_industry text;
  v_country text;
  v_size text;
  v_revenue text;
BEGIN
  -- Derive role from answer
  v_role_text := COALESCE(NEW.raw_response#>>'{}', NEW.chosen_value);
  IF v_role_text IS NOT NULL THEN
    v_role_text := lower(v_role_text);
    IF v_role_text ~ '(chief|c[- ]?level|executive|founder|owner|ceo|cto|cio|coo)' THEN
      v_member_role := 'owner';
    ELSIF v_role_text ~ '(vp|vice president|director|head|lead|manager)' THEN
      v_member_role := 'manager';
    ELSIF v_role_text ~ '(consultant|contractor|external|advisor|adviser)' THEN
      v_member_role := 'guest';
    ELSE
      v_member_role := 'member';
    END IF;
  END IF;

  -- Contact email (M2)
  SELECT a.raw_response#>>'{}' INTO v_email
  FROM public.answers a WHERE a.submission_id = NEW.submission_id AND a.question_id = 'M2' LIMIT 1;

  -- Ensure submission has an organization
  SELECT s.organization_id INTO v_org_id FROM public.submissions s WHERE s.id = NEW.submission_id;
  IF v_org_id IS NULL THEN
    SELECT a.raw_response#>>'{}' INTO v_company FROM public.answers a WHERE a.submission_id = NEW.submission_id AND a.question_id = 'M0' LIMIT 1;
    IF v_company IS NOT NULL AND btrim(v_company) <> '' THEN
      SELECT a.raw_response#>>'{}' INTO v_industry FROM public.answers a WHERE a.submission_id = NEW.submission_id AND a.question_id = 'M4_industry' LIMIT 1;
      SELECT a.raw_response#>>'{}' INTO v_country  FROM public.answers a WHERE a.submission_id = NEW.submission_id AND a.question_id = 'M5_country'   LIMIT 1;
      SELECT a.raw_response#>>'{}' INTO v_size     FROM public.answers a WHERE a.submission_id = NEW.submission_id AND a.question_id = 'M6_size'      LIMIT 1;
      SELECT a.raw_response#>>'{}' INTO v_revenue  FROM public.answers a WHERE a.submission_id = NEW.submission_id AND a.question_id = 'M7_revenue'   LIMIT 1;
      PERFORM public.ensure_organization_and_attach_submission(NEW.submission_id, v_company, v_industry, v_country, v_size, v_revenue, NULL);
      SELECT s.organization_id INTO v_org_id FROM public.submissions s WHERE s.id = NEW.submission_id;
    END IF;
  END IF;

  -- Upsert/update membership if we have org + known auth user email
  IF v_org_id IS NOT NULL AND nullif(v_email,'') IS NOT NULL THEN
    SELECT u.id INTO v_user_id FROM auth.users u WHERE u.email = v_email LIMIT 1;
    IF FOUND THEN
      IF NOT EXISTS (
        SELECT 1 FROM public.organization_members m WHERE m.organization_id = v_org_id AND m.user_id = v_user_id
      ) THEN
        INSERT INTO public.organization_members (organization_id, user_id, member_role)
        VALUES (v_org_id, v_user_id, v_member_role);
      ELSE
        UPDATE public.organization_members
        SET member_role = v_member_role
        WHERE organization_id = v_org_id AND user_id = v_user_id;
      END IF;

      -- Ensure base app role
      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='user_roles'
      ) THEN
        IF NOT EXISTS (
          SELECT 1 FROM public.user_roles ur WHERE ur.user_id = v_user_id AND ur.role = 'user'::public.app_role
        ) THEN
          INSERT INTO public.user_roles (user_id, role) VALUES (v_user_id, 'user');
        END IF;
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_update_member_role_on_m3 ON public.answers;
CREATE TRIGGER trg_update_member_role_on_m3
AFTER INSERT OR UPDATE OF raw_response, chosen_value
ON public.answers
FOR EACH ROW
WHEN (NEW.question_id = 'M3')
EXECUTE FUNCTION public.trg_update_member_role_on_m3_fn();