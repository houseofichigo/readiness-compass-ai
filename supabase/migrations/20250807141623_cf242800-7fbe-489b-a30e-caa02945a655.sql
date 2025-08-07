-- Fix assessment ID consistency across all tables
-- Update questions table to use consistent assessment_id
UPDATE public.questions 
SET assessment_id = 'ai_readiness_v2' 
WHERE assessment_id = 'ai-readiness-assessment';

-- Update any submissions that might have inconsistent assessment_id
UPDATE public.submissions 
SET assessment_id = 'ai_readiness_v2' 
WHERE assessment_id IS NULL OR assessment_id != 'ai_readiness_v2';

-- Update any answers that reference the old assessment through submissions
UPDATE public.answers 
SET assessment_id = 'ai_readiness_v2'
WHERE submission_id IN (
  SELECT id FROM public.submissions 
  WHERE assessment_id = 'ai_readiness_v2'
);