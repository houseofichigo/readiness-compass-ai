-- IMMEDIATE FIX: Update questions table assessment_id
UPDATE public.questions 
SET assessment_id = 'ai_readiness_v2' 
WHERE assessment_id = 'ai-readiness-assessment';