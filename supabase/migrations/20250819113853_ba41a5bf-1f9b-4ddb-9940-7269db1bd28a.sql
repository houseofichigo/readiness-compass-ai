-- Fix organizations table security issue - restrict access to sensitive data (corrected approach)

-- Drop the current overly permissive policy for org members
DROP POLICY IF EXISTS "Org members can select their org" ON public.organizations;

-- Create a security definer function to check if user is owner/manager of org
CREATE OR REPLACE FUNCTION public.is_org_owner_or_manager(_org_id uuid, _user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT exists (
    SELECT 1 FROM public.organization_members m
    WHERE m.organization_id = _org_id 
      AND m.user_id = _user_id
      AND m.member_role IN ('owner', 'manager')
  );
$$;

-- Create new restrictive policies for organization access

-- Policy 1: Only owners/managers can see their full organization data (including sensitive info)
CREATE POLICY "Org owners/managers can select full org data" 
ON public.organizations 
FOR SELECT 
USING (is_org_owner_or_manager(id));

-- Policy 2: Regular org members can only see basic organization info
-- This policy will need to be enforced at the application level by selecting only safe columns
CREATE POLICY "Org members can select limited org data" 
ON public.organizations 
FOR SELECT 
USING (
  is_org_member(id) AND NOT is_org_owner_or_manager(id)
);

-- Create a security definer function that returns safe organization data for regular members
CREATE OR REPLACE FUNCTION public.get_org_basic_info(_org_id uuid)
RETURNS TABLE (
  id uuid,
  name text,
  slug text,
  industry text,
  sub_industry text,
  country text,
  region text,
  size_bucket text,
  track text,
  regulatory_status text,
  total_submissions integer,
  completed_submissions integer,
  first_submission_at timestamptz,
  last_submission_at timestamptz,
  avg_overall_score double precision,
  median_score double precision,
  pillar_scores_avg jsonb,
  pillar_scores_median jsonb,
  benchmark_percentile integer,
  is_verified boolean,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT 
    o.id,
    o.name,
    o.slug,
    o.industry,
    o.sub_industry,
    o.country,
    o.region,
    o.size_bucket,
    o.track,
    o.regulatory_status,
    o.total_submissions,
    o.completed_submissions,
    o.first_submission_at,
    o.last_submission_at,
    o.avg_overall_score,
    o.median_score,
    o.pillar_scores_avg,
    o.pillar_scores_median,
    o.benchmark_percentile,
    o.is_verified,
    o.created_at,
    o.updated_at
  FROM public.organizations o
  WHERE o.id = _org_id
    AND is_org_member(_org_id);
$$;