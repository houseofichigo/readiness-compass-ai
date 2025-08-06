-- Fix data population issues in answers table
-- Create a comprehensive trigger to populate answer metadata automatically

-- First, create a function to enrich answers with question metadata
CREATE OR REPLACE FUNCTION public.populate_answer_metadata()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    question_record RECORD;
    submission_record RECORD;
BEGIN
    -- Get question metadata from questions table
    SELECT 
        q.section_id,
        q.text as question_text,
        q.type as question_type,
        q.helper as question_helper,
        q.options as question_options,
        q.required as question_required,
        COALESCE(q.score_per, 0) as default_score
    INTO question_record
    FROM public.questions q
    WHERE q.id = NEW.question_id
    LIMIT 1;

    -- Get submission info  
    SELECT assessment_id INTO submission_record
    FROM public.submissions s
    WHERE s.id = NEW.submission_id
    LIMIT 1;

    -- Populate metadata fields
    NEW.section_id := question_record.section_id;
    NEW.question_text := question_record.question_text;
    NEW.question_type := question_record.question_type;
    NEW.question_helper := question_record.question_helper;
    NEW.question_options := question_record.question_options;
    NEW.question_required := question_record.question_required;
    
    -- Calculate basic score if not provided
    IF NEW.answer_score IS NULL THEN
        NEW.answer_score := question_record.default_score;
    END IF;

    RETURN NEW;
END;
$$;

-- Create trigger for INSERT operations
DROP TRIGGER IF EXISTS trigger_populate_answer_metadata ON public.answers;
CREATE TRIGGER trigger_populate_answer_metadata
    BEFORE INSERT ON public.answers
    FOR EACH ROW
    EXECUTE FUNCTION public.populate_answer_metadata();

-- Also create a function to ensure submissions table gets proper user_id
CREATE OR REPLACE FUNCTION public.populate_submission_metadata()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    -- Set user_id if authenticated and not already set
    IF NEW.user_id IS NULL AND auth.uid() IS NOT NULL THEN
        NEW.user_id := auth.uid();
    END IF;

    RETURN NEW;
END;
$$;

-- Create trigger for submissions
DROP TRIGGER IF EXISTS trigger_populate_submission_metadata ON public.submissions;
CREATE TRIGGER trigger_populate_submission_metadata
    BEFORE INSERT ON public.submissions
    FOR EACH ROW
    EXECUTE FUNCTION public.populate_submission_metadata();

-- Update existing answers that are missing metadata
UPDATE public.answers 
SET 
    section_id = q.section_id,
    question_text = q.text,
    question_type = q.type,
    question_helper = q.helper,
    question_options = q.options,
    question_required = q.required,
    answer_score = COALESCE(answer_score, q.score_per, 0)
FROM public.questions q
WHERE public.answers.question_id = q.id
AND (public.answers.section_id IS NULL OR public.answers.question_text IS NULL);