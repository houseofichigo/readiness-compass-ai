-- Create admin users table for access control
CREATE TABLE admin_users (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text UNIQUE NOT NULL,
  role       text NOT NULL DEFAULT 'analyst',  -- 'superadmin', 'analyst'
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can read their own admin record
CREATE POLICY "Admin users can view their own record" 
ON admin_users FOR SELECT 
TO authenticated 
USING (auth.jwt() ->> 'email' = email);

-- Insert initial admin users (replace with actual admin emails)
INSERT INTO admin_users (email, role) VALUES 
('admin@company.com', 'superadmin'),
('analyst@company.com', 'analyst')
ON CONFLICT (email) DO NOTHING;

-- Create a function to check if user is admin
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

-- Create admin analytics view for easy querying
CREATE OR REPLACE VIEW admin_analytics AS
SELECT 
  COUNT(*) as total_submissions,
  COUNT(*) FILTER (WHERE completed = true) as completed_submissions,
  COUNT(*) FILTER (WHERE DATE(created_at) = CURRENT_DATE) as today_submissions,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as week_submissions,
  COUNT(DISTINCT organization_name) FILTER (WHERE organization_name IS NOT NULL AND organization_name != '') as active_organizations,
  ROUND(
    (COUNT(*) FILTER (WHERE completed = true) * 100.0 / NULLIF(COUNT(*), 0))::numeric, 2
  ) as completion_rate
FROM submissions;

-- Enable realtime for admin dashboard
ALTER TABLE submissions REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE submissions;

-- Update triggers for admin_users
CREATE TRIGGER update_admin_users_updated_at
BEFORE UPDATE ON admin_users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();