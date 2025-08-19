-- Fix Critical Security Issues

-- 1. Fix feedback table email harvesting vulnerability
-- Remove the overly permissive policy
DROP POLICY IF EXISTS "Anyone can insert feedback" ON public.feedback;

-- Add secure policies for feedback
CREATE POLICY "Authenticated users can insert feedback" 
ON public.feedback 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Allow anonymous feedback but with rate limiting considerations (will be handled in app)
CREATE POLICY "Anonymous can insert limited feedback" 
ON public.feedback 
FOR INSERT 
TO anon
WITH CHECK (
  -- Limit to reasonable field lengths to prevent spam
  length(coalesce(comments, '')) <= 1000 
  AND length(coalesce(email, '')) <= 100
  AND (email IS NULL OR email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- 2. Secure database functions with proper search_path
-- Update critical functions to use secure search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.get_is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT coalesce(public.has_role(auth.uid(), 'admin'), false);
$$;

CREATE OR REPLACE FUNCTION public.is_org_member(_org_id uuid, _user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT exists (
    SELECT 1 FROM public.organization_members m
    WHERE m.organization_id = _org_id AND m.user_id = _user_id
  );
$$;

CREATE OR REPLACE FUNCTION public.is_org_owner_or_manager(_org_id uuid, _user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT exists (
    SELECT 1 FROM public.organization_members m
    WHERE m.organization_id = _org_id 
      AND m.user_id = _user_id
      AND m.member_role IN ('owner', 'manager')
  );
$$;

-- 3. Add security audit table for monitoring
CREATE TABLE IF NOT EXISTS public.security_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  ip_address inet,
  user_agent text,
  event_data jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on security events
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- Only admins can view security events
CREATE POLICY "Admin can manage security events" 
ON public.security_events 
FOR ALL 
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- 4. Add feedback rate limiting table
CREATE TABLE IF NOT EXISTS public.feedback_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address inet NOT NULL,
  submission_count integer DEFAULT 1,
  first_submission_at timestamp with time zone DEFAULT now(),
  last_submission_at timestamp with time zone DEFAULT now(),
  UNIQUE(ip_address)
);

-- Enable RLS on rate limits
ALTER TABLE public.feedback_rate_limits ENABLE ROW LEVEL SECURITY;

-- Only system can manage rate limits
CREATE POLICY "System can manage rate limits" 
ON public.feedback_rate_limits 
FOR ALL 
USING (false);

-- 5. Create function to check and update rate limits
CREATE OR REPLACE FUNCTION public.check_feedback_rate_limit(_ip_address inet)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  current_count integer;
  time_window interval := interval '1 hour';
  max_submissions integer := 5;
BEGIN
  -- Clean up old entries
  DELETE FROM public.feedback_rate_limits 
  WHERE last_submission_at < (now() - time_window);
  
  -- Get current count for this IP
  SELECT submission_count INTO current_count
  FROM public.feedback_rate_limits
  WHERE ip_address = _ip_address
  AND first_submission_at > (now() - time_window);
  
  -- If no record exists or within limits, allow and update
  IF current_count IS NULL THEN
    INSERT INTO public.feedback_rate_limits (ip_address)
    VALUES (_ip_address)
    ON CONFLICT (ip_address) DO UPDATE SET
      submission_count = 1,
      first_submission_at = now(),
      last_submission_at = now();
    RETURN true;
  ELSIF current_count < max_submissions THEN
    UPDATE public.feedback_rate_limits
    SET submission_count = submission_count + 1,
        last_submission_at = now()
    WHERE ip_address = _ip_address;
    RETURN true;
  ELSE
    RETURN false;
  END IF;
END;
$$;