-- Add organization name and contact info columns to submissions table for better tracking
ALTER TABLE public.submissions 
ADD COLUMN IF NOT EXISTS organization_name text,
ADD COLUMN IF NOT EXISTS contact_email text,
ADD COLUMN IF NOT EXISTS contact_name text;

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_submissions_organization_name ON public.submissions(organization_name);
CREATE INDEX IF NOT EXISTS idx_submissions_contact_email ON public.submissions(contact_email);