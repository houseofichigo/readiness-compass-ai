-- Fix admin authentication and RLS issues

-- 1. Update admin_users RLS policy to be more permissive for authenticated users
DROP POLICY IF EXISTS "Admin users can view their own record" ON admin_users;

-- Allow authenticated users to read admin_users table (needed for admin check)
CREATE POLICY "Authenticated users can read admin table" 
ON admin_users FOR SELECT 
TO authenticated 
USING (true);

-- 2. Update the is_admin function to handle RLS properly
CREATE OR REPLACE FUNCTION public.is_admin(user_email text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = user_email
  );
$$;

-- 3. Create a function to get current user's admin role
CREATE OR REPLACE FUNCTION public.get_admin_role(user_email text)
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.admin_users 
  WHERE email = user_email
  LIMIT 1;
$$;

-- 4. Fix analytics view permissions
GRANT SELECT ON admin_analytics TO authenticated, anon;

-- 5. Ensure submissions can be read by admins
CREATE POLICY "Admins can view all submissions" 
ON submissions FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = auth.jwt() ->> 'email'
  )
);

-- 6. Ensure answers can be read by admins  
CREATE POLICY "Admins can view all answers" 
ON answers FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = auth.jwt() ->> 'email'
  )
);