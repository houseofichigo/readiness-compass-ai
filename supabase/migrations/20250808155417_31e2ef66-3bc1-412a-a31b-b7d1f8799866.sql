-- Batch 1: Update ensure_organization_and_attach_submission to map member roles and add invalid-name guards
-- and backfill submissions missing organization_id.

-- 1) Replace function with enhanced logic
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
  v_role_text text;
  v_member_role text;
  v_invalid boolean;
BEGIN
  -- sanitize incoming name
  v_name := nullif(trim(_name), '');
  IF v_name IS NULL THEN
    RETURN NULL;
  END IF;

  -- invalid-name guards (avoid false positives)
  v_invalid := false;
  IF length(v_name) < 2 THEN v_invalid := true; END IF;
  IF lower(v_name) IN ('n/a','na','none','n.a.', 'not applicable') THEN v_invalid := true; END IF;
  IF v_name IN ('-', '.', '--') THEN v_invalid := true; END IF;
  IF v_invalid THEN
    RETURN NULL;
  END IF;

  -- Read contact fields from answers if present (M1=name, M2=email)
  SELECT a.raw_response#>>'{}' INTO v_contact_name
  FROM public.answers a WHERE a.submission_id = _submission_id AND a.question_id = 'M1' LIMIT 1;

  SELECT a.raw_response#>>'{}' INTO v_contact_email
  FROM public.answers a WHERE a.submission_id = _submission_id AND a.question_id = 'M2' LIMIT 1;

  -- Read role (M3) for member_role mapping
  SELECT a.raw_response#>>'{}' INTO v_role_text
  FROM public.answers a WHERE a.submission_id = _submission_id AND a.question_id = 'M3' LIMIT 1;

  v_member_role := 'member';
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

  -- Attach submission to organization (only if not already attached)
  UPDATE public.submissions s SET organization_id = v_org_id
  WHERE s.id = _submission_id AND s.organization_id IS NULL;

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
        VALUES (v_org_id, v_user_id, v_member_role);
      ELSE
        -- backfill role if missing
        UPDATE public.organization_members
        SET member_role = COALESCE(member_role, v_member_role)
        WHERE organization_id = v_org_id AND user_id = v_user_id;
      END IF;

      -- Add an app role record if table exists (defensive)
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

  RETURN v_org_id;
END; $function$;


-- 2) Backfill: attach organizations to submissions missing organization_id
DO $$
DECLARE
  r record;
  v_name text;
  v_industry text;
  v_country text;
  v_size text;
  v_revenue text;
BEGIN
  FOR r IN
    SELECT s.id
    FROM public.submissions s
    WHERE s.organization_id IS NULL
  LOOP
    -- fetch M0 (company name)
    SELECT a.raw_response#>>'{}' INTO v_name
    FROM public.answers a
    WHERE a.submission_id = r.id AND a.question_id = 'M0'
    LIMIT 1;

    -- skip if missing/invalid (function also guards)
    IF v_name IS NULL THEN
      CONTINUE;
    END IF;

    -- additional fields (optional)
    SELECT a.raw_response#>>'{}' INTO v_industry FROM public.answers a WHERE a.submission_id = r.id AND a.question_id = 'M4_industry' LIMIT 1;
    SELECT a.raw_response#>>'{}' INTO v_country  FROM public.answers a WHERE a.submission_id = r.id AND a.question_id = 'M5_country'   LIMIT 1;
    SELECT a.raw_response#>>'{}' INTO v_size     FROM public.answers a WHERE a.submission_id = r.id AND a.question_id = 'M6_size'      LIMIT 1;
    SELECT a.raw_response#>>'{}' INTO v_revenue  FROM public.answers a WHERE a.submission_id = r.id AND a.question_id = 'M7_revenue'   LIMIT 1;

    PERFORM public.ensure_organization_and_attach_submission(r.id, v_name, v_industry, v_country, v_size, v_revenue, NULL);
  END LOOP;
END $$;