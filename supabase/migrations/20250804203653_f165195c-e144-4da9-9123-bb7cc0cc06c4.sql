-- Create new admin user: sabri@houseofichigo.com
-- Password: AdminPass2024!

-- Insert admin user permissions
INSERT INTO admin_users (email, role) 
VALUES ('sabri@houseofichigo.com', 'superadmin')
ON CONFLICT (email) DO UPDATE SET role = 'superadmin';

-- Note: The actual user account with email/password needs to be created 
-- through Supabase Auth dashboard or API, as direct auth.users manipulation
-- requires special permissions that are not available in standard migrations.