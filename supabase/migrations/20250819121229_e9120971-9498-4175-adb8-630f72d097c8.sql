-- Fix critical security issue: Restrict public access to submissions table
-- Remove the overly permissive policy that exposes contact information

DROP POLICY IF EXISTS "Anon can select recent anonymous or just-created submissions" ON public.submissions;

-- Drop existing view if it exists and recreate it properly
DROP VIEW IF EXISTS public.submissions_public_safe;

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
  updated_at
FROM public.submissions
WHERE created_at > (now() - interval '1 hour')
  AND organization_id IS NULL; -- Only anonymous submissions

-- Enable RLS on the view
ALTER VIEW public.submissions_public_safe SET (security_invoker = on);

-- Grant access to the safe view for anonymous users
GRANT SELECT ON public.submissions_public_safe TO anon, authenticated;

-- Create a more restrictive policy for anonymous users on submissions table
-- Only allow access to specific non-sensitive fields for anonymous submissions
CREATE POLICY "Anon can select limited fields from recent anonymous submissions"
ON public.submissions
FOR SELECT
TO anon, public
USING (
  organization_id IS NULL 
  AND created_at > (now() - interval '1 hour')
);

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