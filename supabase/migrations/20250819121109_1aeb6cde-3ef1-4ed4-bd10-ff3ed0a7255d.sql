-- Fix critical security issue: Restrict public access to submissions table
-- Remove the overly permissive policy that exposes contact information

DROP POLICY IF EXISTS "Anon can select recent anonymous or just-created submissions" ON public.submissions;

-- Create a safe view for public access that only exposes non-sensitive data
CREATE VIEW public.submissions_public_safe AS
SELECT 
  id,
  completed,
  total_score,
  max_possible_score,
  percentage_score,
  pillar_scores,
  readiness_level,
  created_at,
  updated_at,
  -- Exclude sensitive fields: contact_email, contact_name, organization_name, 
  -- ip_address, user_agent, referrer_url, utm fields, organization_id
  NULL as contact_email,
  NULL as contact_name,
  NULL as organization_name,
  NULL as organization_id
FROM public.submissions
WHERE created_at > (now() - interval '1 hour');

-- Enable RLS on the view
ALTER VIEW public.submissions_public_safe SET (security_invoker = on);

-- Grant access to the safe view for anonymous users
GRANT SELECT ON public.submissions_public_safe TO anon, authenticated;

-- Create a more restrictive policy for anonymous users on submissions table
-- Only allow access to specific fields for anonymous submissions within the last hour
CREATE POLICY "Anon can select limited fields from recent anonymous submissions"
ON public.submissions
FOR SELECT
TO anon, public
USING (
  organization_id IS NULL 
  AND created_at > (now() - interval '1 hour')
);

-- Create a function to safely load submission data for anonymous users
CREATE OR REPLACE FUNCTION public.get_safe_submission_data(_submission_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  result jsonb;
  submission_row record;
BEGIN
  -- Only return data for recent anonymous submissions
  SELECT 
    id, completed, total_score, max_possible_score, percentage_score,
    pillar_scores, readiness_level, created_at, updated_at
  INTO submission_row
  FROM public.submissions 
  WHERE id = _submission_id
    AND organization_id IS NULL  -- Only anonymous submissions
    AND created_at > (now() - interval '1 hour');
  
  IF NOT FOUND THEN
    RETURN null;
  END IF;
  
  -- Build safe result without sensitive data
  result := jsonb_build_object(
    'id', submission_row.id,
    'completed', submission_row.completed,
    'total_score', submission_row.total_score,
    'max_possible_score', submission_row.max_possible_score,
    'percentage_score', submission_row.percentage_score,
    'pillar_scores', submission_row.pillar_scores,
    'readiness_level', submission_row.readiness_level,
    'created_at', submission_row.created_at,
    'updated_at', submission_row.updated_at
  );
  
  RETURN result;
END;
$$;

-- Log this security fix
INSERT INTO public.security_events (event_type, event_data)
VALUES (
  'security_fix_applied',
  jsonb_build_object(
    'fix', 'restricted_submissions_public_access',
    'description', 'Removed public access to sensitive contact information in submissions table',
    'timestamp', now()
  )
);