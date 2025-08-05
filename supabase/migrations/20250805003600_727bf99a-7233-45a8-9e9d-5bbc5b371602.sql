-- Fix the RLS policies to allow both anonymous and authenticated users
-- to create submissions and answers

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Anyone can create submissions" ON public.submissions;
DROP POLICY IF EXISTS "Anyone can create answers" ON public.answers;

-- Create new policies that allow both anon and authenticated users
CREATE POLICY "Public can create submissions" 
ON public.submissions 
FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Public can create answers" 
ON public.answers 
FOR INSERT 
TO public
WITH CHECK (true);

-- Also ensure read access works for both
DROP POLICY IF EXISTS "Anyone can view submissions" ON public.submissions;
DROP POLICY IF EXISTS "Anyone can view answers" ON public.answers;

CREATE POLICY "Public can view submissions" 
ON public.submissions 
FOR SELECT 
TO public
USING (true);

CREATE POLICY "Public can view answers" 
ON public.answers 
FOR SELECT 
TO public
USING (true);