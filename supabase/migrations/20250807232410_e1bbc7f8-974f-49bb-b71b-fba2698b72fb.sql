-- Re-apply all changes with corrected trigger implementation

-- 1) Enhance record_assessment_session to set organization_id
CREATE OR REPLACE FUNCTION public.record_assessment_session(
  _submission_id uuid,
  _section_id text DEFAULT NULL::text,
  _started_at timestamp with time zone DEFAULT now(),
  _completed_at timestamp with time zone DEFAULT now()
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_id uuid; v_org uuid;
BEGIN
  v_org := public.submission_org(_submission_id);
  INSERT INTO public.assessment_sessions (
    id, submission_id, organization_id, section_id, started_at, completed_at, created_at
  ) VALUES (
    gen_random_uuid(), _submission_id, v_org, _section_id, _started_at, _completed_at, now()
  ) RETURNING id INTO v_id;
  RETURN v_id;
END; $function$;

-- 2) Enhance record_analytics_event to set organization_id and inherit user_agent
CREATE OR REPLACE FUNCTION public.record_analytics_event(
  _submission_id uuid,
  _event_name text,
  _event_category text DEFAULT 'assessment'::text,
  _event_data jsonb DEFAULT '{}'::jsonb,
  _section_id text DEFAULT NULL::text,
  _question_id text DEFAULT NULL::text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_id uuid; v_org uuid; v_ua text;
BEGIN
  v_org := public.submission_org(_submission_id);
  SELECT s.user_agent INTO v_ua FROM public.submissions s WHERE s.id = _submission_id;
  INSERT INTO public.analytics_events (
    id, submission_id, organization_id, event_name, event_category, event_data, section_id, question_id, user_agent, created_at
  ) VALUES (
    gen_random_uuid(), _submission_id, v_org, _event_name, _event_category, _event_data, _section_id, _question_id, v_ua, now()
  ) RETURNING id INTO v_id;
  RETURN v_id;
END; $function$;

-- 3) Rework ensure_organization_and_attach_submission to also capture contact and membership
CREATE OR REPLACE FUNCTION public.ensure_organization_and_attach_submission(
  _submission_id uuid,
  _name text,
  _industry text DEFAULT NULL::text,
  _country text DEFAULT NULL::text,
  _size_bucket text DEFAULT NULL::text,
  _revenue_bucket text DEFAULT NULL::text,
  _track text DEFAULT NULL::text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_slug text;
  v_org_id uuid;
  v_name text;
  v_contact_name text;
  v_contact_email text;
  v_user_id uuid;
BEGIN
  v_name := nullif(trim(_name), '');
  IF v_name IS NULL THEN
    RETURN NULL;
  END IF;

  -- Read contact fields from answers if present (M1=name, M2=email)
  SELECT a.raw_response#>>'{}' INTO v_contact_name
  FROM public.answers a WHERE a.submission_id = _submission_id AND a.question_id = 'M1' LIMIT 1;

  SELECT a.raw_response#>>'{}' INTO v_contact_email
  FROM public.answers a WHERE a.submission_id = _submission_id AND a.question_id = 'M2' LIMIT 1;

  v_slug := public.slugify(v_name);

  -- Upsert organization
  INSERT INTO public.organizations (id, name, slug, industry, country, size_bucket, revenue_bucket, track, primary_contact_email)
  VALUES (gen_random_uuid(), v_name, v_slug, _industry, _country, _size_bucket, _revenue_bucket, _track, nullif(v_contact_email,''))
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    industry = COALESCE(EXCLUDED.industry, organizations.industry),
    country = COALESCE(EXCLUDED.country, organizations.country),
    size_bucket = COALESCE(EXCLUDED.size_bucket, organizations.size_bucket),
    revenue_bucket = COALESCE(EXCLUDED.revenue_bucket, organizations.revenue_bucket),
    track = COALESCE(EXCLUDED.track, organizations.track),
    primary_contact_email = COALESCE(EXCLUDED.primary_contact_email, organizations.primary_contact_email),
    updated_at = now()
  RETURNING organizations.id INTO v_org_id;

  -- Attach submission to organization
  UPDATE public.submissions s SET organization_id = v_org_id WHERE s.id = _submission_id;

  -- Ensure a lightweight user for contact (stored in public.users)
  IF nullif(v_contact_email,'') IS NOT NULL THEN
    SELECT u.id INTO v_user_id FROM public.users u WHERE u.email = v_contact_email LIMIT 1;
    IF NOT FOUND THEN
      INSERT INTO public.users (email, name, role)
      VALUES (v_contact_email, COALESCE(v_contact_name, ''), 'user')
      RETURNING id INTO v_user_id;
    ELSE
      -- Keep latest name if provided
      IF nullif(v_contact_name,'') IS NOT NULL THEN
        UPDATE public.users SET name = v_contact_name, updated_at = now() WHERE id = v_user_id;
      END IF;
    END IF;

    -- Link as organization member if not already linked
    IF v_user_id IS NOT NULL THEN
      IF NOT EXISTS (
        SELECT 1 FROM public.organization_members m WHERE m.organization_id = v_org_id AND m.user_id = v_user_id
      ) THEN
        INSERT INTO public.organization_members (organization_id, user_id, member_role)
        VALUES (v_org_id, v_user_id, 'member');
      END IF;

      -- Add an app role record if table exists (defensive)
      IF EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='user_roles'
      ) THEN
        -- Only insert if the (user_id, role) combination isn't present
        IF NOT EXISTS (
          SELECT 1 FROM public.user_roles ur WHERE ur.user_id = v_user_id AND ur.role = 'user'::public.app_role
        ) THEN
          INSERT INTO public.user_roles (user_id, role) VALUES (v_user_id, 'user');
        END IF;
      END IF;
    END IF;
  END IF;

  RETURN v_org_id;
END; $function$;

-- 4) Org stats recompute function and trigger
CREATE OR REPLACE FUNCTION public.recompute_org_stats(_org_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_total int; v_completed int; v_first timestamptz; v_last timestamptz; v_avg double precision;
BEGIN
  SELECT COUNT(*),
         COUNT(*) FILTER (WHERE s.completed),
         MIN(s.created_at),
         MAX(s.created_at),
         AVG(s.percentage_score)
  INTO v_total, v_completed, v_first, v_last, v_avg
  FROM public.submissions s
  WHERE s.organization_id = _org_id;

  UPDATE public.organizations o SET
    total_submissions = v_total,
    completed_submissions = v_completed,
    first_submission_at = v_first,
    last_submission_at = v_last,
    avg_overall_score = v_avg,
    updated_at = now()
  WHERE o.id = _org_id;
END; $function$;

-- Trigger function wrapper
CREATE OR REPLACE FUNCTION public.trg_recompute_org_stats_fn()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.organization_id IS NOT NULL THEN
    PERFORM public.recompute_org_stats(NEW.organization_id);
  END IF;
  RETURN NEW;
END; $function$;

-- Create trigger using the wrapper
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_recompute_org_stats') THEN
    DROP TRIGGER trg_recompute_org_stats ON public.submissions;
  END IF;
  CREATE TRIGGER trg_recompute_org_stats
  AFTER INSERT OR UPDATE OF organization_id, completed, percentage_score ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION public.trg_recompute_org_stats_fn();
END $$;
