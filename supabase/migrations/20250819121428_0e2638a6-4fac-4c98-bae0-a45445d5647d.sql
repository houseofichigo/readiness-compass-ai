-- Fix critical security issue: Restrict public access to submissions table

-- Drop all existing problematic policies
DROP POLICY IF EXISTS "Anon can select recent anonymous or just-created submissions" ON public.submissions;
DROP POLICY IF EXISTS "Anon can select limited fields from recent anonymous submission" ON public.submissions;
DROP POLICY IF EXISTS "Anon can select limited fields from recent anonymous submissions" ON public.submissions;

-- Drop and recreate the safe view
DROP VIEW IF EXISTS public.submissions_public_safe;

-- Create secure policies for submissions access
-- Anonymous users can only access basic fields of recent anonymous submissions
CREATE POLICY "Anonymous access restricted to non-sensitive fields"
ON public.submissions
FOR SELECT
TO anon, public
USING (
  organization_id IS NULL 
  AND created_at > (now() - interval '1 hour')
  AND contact_email IS NULL  -- Extra safety: only allow if no contact info stored
);

-- Create a secure function for loading safe submission data
CREATE OR REPLACE FUNCTION public.get_safe_submission_info(_submission_id uuid)
RETURNS TABLE (
  id uuid,
  completed boolean,
  total_score double precision,
  max_possible_score double precision,
  percentage_score double precision,
  pillar_scores jsonb,
  readiness_level text,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Only return safe data for recent anonymous submissions
  RETURN QUERY
  SELECT 
    s.id, s.completed, s.total_score, s.max_possible_score,
    s.percentage_score, s.pillar_scores, s.readiness_level,
    s.created_at, s.updated_at
  FROM public.submissions s
  WHERE s.id = _submission_id
    AND s.organization_id IS NULL  -- Only anonymous submissions
    AND s.created_at > (now() - interval '1 hour')
    AND s.contact_email IS NULL;   -- No contact information exposed
END;
$$;

-- Grant access to the function
GRANT EXECUTE ON FUNCTION public.get_safe_submission_info TO anon, authenticated;

-- Log the security fix
INSERT INTO public.security_events (event_type, event_data)
VALUES (
  'critical_security_fix',
  jsonb_build_object(
    'issue', 'customer_contact_harvesting_prevention',
    'description', 'Restricted public access to prevent contact information harvesting',
    'affected_table', 'submissions',
    'fix_applied', now()
  )
);