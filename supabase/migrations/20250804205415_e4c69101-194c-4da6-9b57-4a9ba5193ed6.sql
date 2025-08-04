-- Remove test data and add new admin user

-- 1. Remove all test submissions (this will also cascade delete related answers)
DELETE FROM submissions WHERE assessment_id = 'ai_readiness_v2';

-- 2. Add new admin user
INSERT INTO admin_users (email, role) 
VALUES ('Skander.ghazzai@dauphine.eu', 'superadmin')
ON CONFLICT (email) DO UPDATE SET role = 'superadmin';

-- Verify the cleanup
SELECT 'Submissions remaining:' as info, COUNT(*) as count FROM submissions
UNION ALL
SELECT 'Admin users:' as info, COUNT(*) as count FROM admin_users;