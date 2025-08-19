-- Fix critical security issue: Prevent unauthorized access to organization business intelligence

-- Add explicit deny policies for public access to organizations table
CREATE POLICY "Deny all public access to organizations"
ON public.organizations
FOR ALL
TO public, anon
USING (false)
WITH CHECK (false);

-- Create a safe view for any legitimate public organization references
-- This view only exposes the absolute minimum non-sensitive data
CREATE VIEW public.organizations_public_safe AS
SELECT 
  id,
  name,
  slug,
  -- Only expose general industry category, not specific details
  CASE 
    WHEN industry IS NOT NULL THEN 'Technology'
    ELSE 'Other'
  END as industry_category,
  -- Only expose general size category, not specific counts
  CASE 
    WHEN size_bucket IN ('1-10', '11-50') THEN 'Small'
    WHEN size_bucket IN ('51-200', '201-500') THEN 'Medium'
    WHEN size_bucket IN ('501-1000', '1000+') THEN 'Large'
    ELSE 'Not specified'
  END as size_category,
  created_at
FROM public.organizations;

-- Enable security invoker on the view to respect RLS
ALTER VIEW public.organizations_public_safe SET (security_invoker = on);

-- Grant minimal access to the safe view
GRANT SELECT ON public.organizations_public_safe TO anon, authenticated;

-- Create a function to safely get organization info for members only
CREATE OR REPLACE FUNCTION public.get_organization_safe_info(_org_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  result jsonb;
  org_row record;
  is_member boolean;
  is_owner_manager boolean;
BEGIN
  -- Check if user is a member of this organization
  SELECT is_org_member(_org_id) INTO is_member;
  SELECT is_org_owner_or_manager(_org_id) INTO is_owner_manager;
  
  IF NOT is_member THEN
    -- Log unauthorized access attempt
    INSERT INTO public.security_events (event_type, user_id, event_data)
    VALUES (
      'unauthorized_org_access_attempt',
      auth.uid(),
      jsonb_build_object(
        'organization_id', _org_id,
        'timestamp', now(),
        'user_authenticated', auth.uid() IS NOT NULL
      )
    );
    RETURN null;
  END IF;
  
  -- Get basic info for regular members (limited data)
  IF NOT is_owner_manager THEN
    SELECT id, name, slug, industry, created_at
    INTO org_row
    FROM public.organizations 
    WHERE id = _org_id;
    
    result := jsonb_build_object(
      'id', org_row.id,
      'name', org_row.name,
      'slug', org_row.slug,
      'industry', org_row.industry,
      'created_at', org_row.created_at
    );
  ELSE
    -- Owners/managers can see full details using existing function
    SELECT get_org_basic_info(_org_id) INTO result;
  END IF;
  
  -- Log successful access for audit
  INSERT INTO public.security_events (event_type, user_id, event_data)
  VALUES (
    'org_data_accessed',
    auth.uid(),
    jsonb_build_object(
      'organization_id', _org_id,
      'access_level', CASE WHEN is_owner_manager THEN 'full' ELSE 'basic' END,
      'timestamp', now()
    )
  );
  
  RETURN result;
END;
$$;

-- Add extra protection for sensitive columns in updates
CREATE POLICY "Restrict updates to sensitive business data"
ON public.organizations
FOR UPDATE
TO authenticated
USING (
  -- Only owners/managers can update sensitive business intelligence
  is_org_owner_or_manager(id)
)
WITH CHECK (
  -- Verify the user is still an owner/manager during the update
  is_org_owner_or_manager(id)
);

-- Enhanced policy to ensure authenticated users can only access orgs they're members of
CREATE POLICY "Authenticated users can only access their member organizations"
ON public.organizations
FOR SELECT
TO authenticated
USING (
  -- User must be a member of the organization AND have valid auth
  is_org_member(id) AND auth.uid() IS NOT NULL
);

-- Create a function to audit organization access attempts
CREATE OR REPLACE FUNCTION public.audit_organization_access(_org_id uuid, _access_type text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.security_events (event_type, user_id, event_data)
  VALUES (
    'organization_access_audit',
    auth.uid(),
    jsonb_build_object(
      'organization_id', _org_id,
      'access_type', _access_type,
      'user_is_member', is_org_member(_org_id),
      'user_is_owner_manager', is_org_owner_or_manager(_org_id),
      'timestamp', now()
    )
  );
END;
$$;

-- Log this security fix
INSERT INTO public.security_events (event_type, event_data)
VALUES (
  'security_fix_applied',
  jsonb_build_object(
    'fix', 'restricted_organization_business_intelligence',
    'description', 'Added explicit policies to prevent unauthorized access to business intelligence in organizations table',
    'sensitive_fields_protected', jsonb_build_array(
      'revenue_bucket', 'annual_revenue_exact', 'employee_count_exact',
      'linkedin_url', 'primary_contact_email', 'website', 'sub_industry',
      'regulatory_status', 'benchmark_percentile', 'country', 'region'
    ),
    'access_restrictions', jsonb_build_object(
      'public_access', 'completely_denied',
      'authenticated_access', 'members_only',
      'full_data_access', 'owners_managers_only'
    ),
    'timestamp', now()
  )
);