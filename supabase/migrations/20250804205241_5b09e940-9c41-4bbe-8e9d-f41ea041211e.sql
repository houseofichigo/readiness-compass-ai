-- Create test data for admin dashboard demo

-- Insert some test submissions
INSERT INTO submissions (
  assessment_id, track, regulated, completed, 
  organization_name, full_name, email, role, 
  industry, country, company_size, revenue,
  created_at
) VALUES 
('ai_readiness_v2', 'TECH', false, true, 'Acme Corp', 'John Smith', 'john@acme.com', 'Data Scientist', 'Technology', 'USA', '50-100', '$10M-$50M', now() - interval '1 day'),
('ai_readiness_v2', 'REG', true, true, 'Global Bank', 'Sarah Johnson', 'sarah@bank.com', 'Compliance Officer', 'Financial Services', 'UK', '500+', '$1B+', now() - interval '2 days'),
('ai_readiness_v2', 'GEN', false, false, 'StartupXYZ', 'Mike Chen', 'mike@startup.com', 'CEO', 'E-commerce', 'Canada', '10-50', '$1M-$10M', now() - interval '3 hours'),
('ai_readiness_v2', 'TECH', false, true, 'TechFlow Inc', 'Lisa Wang', 'lisa@techflow.com', 'CTO', 'Software', 'Australia', '100-500', '$50M-$100M', now() - interval '6 hours'),
('ai_readiness_v2', 'GEN', false, true, 'RetailCorp', 'David Brown', 'david@retail.com', 'Operations Manager', 'Retail', 'Germany', '500+', '$100M-$500M', now() - interval '1 day'),
('ai_readiness_v2', 'REG', true, false, 'MedTech Solutions', 'Emma Davis', 'emma@medtech.com', 'Head of Regulatory', 'Healthcare', 'France', '50-100', '$10M-$50M', now() - interval '2 hours');

-- Get the submission IDs for creating test answers
DO $$
DECLARE
    sub_id UUID;
BEGIN
    -- Create test answers for completed submissions
    FOR sub_id IN SELECT id FROM submissions WHERE completed = true LOOP
        INSERT INTO answers (submission_id, question_id, value) VALUES
        (sub_id, 'M0', '"Test Organization"'),
        (sub_id, 'M3', '"Data Scientist"'),
        (sub_id, 'M4_industry', '"Technology"'),
        (sub_id, 'S1_Q1', '"Moderately prepared"'),
        (sub_id, 'S1_Q2', '"Yes, we have a strategy"'),
        (sub_id, 'D1_Q1', '"Good data quality"'),
        (sub_id, 'D1_Q2', '"Cloud-based storage"');
    END LOOP;
END $$;