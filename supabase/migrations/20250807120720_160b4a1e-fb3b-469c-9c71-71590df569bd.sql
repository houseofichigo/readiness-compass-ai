-- COMPREHENSIVE DATABASE CLEANUP AND UPDATE FOR NEW YAML STRUCTURE

-- 1. First, let's clean up old scoring columns that are now obsolete
ALTER TABLE public.questions DROP COLUMN IF EXISTS score_map CASCADE;
ALTER TABLE public.questions DROP COLUMN IF EXISTS score_per CASCADE;
ALTER TABLE public.questions DROP COLUMN IF EXISTS cap CASCADE;
ALTER TABLE public.questions DROP COLUMN IF EXISTS weight CASCADE;
ALTER TABLE public.questions DROP COLUMN IF EXISTS score_by_count CASCADE;
ALTER TABLE public.questions DROP COLUMN IF EXISTS score_formula CASCADE;

-- 2. Ensure all new columns exist with proper structure
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS score_map_by_bucket jsonb;

-- 3. Add pillar_score to sections table (this should already exist but ensuring)
ALTER TABLE public.sections ADD COLUMN IF NOT EXISTS pillar_score integer;

-- 4. Clean and recreate the assessment configuration table
DELETE FROM public.assessments WHERE id = 'ai-readiness-v2';
INSERT INTO public.assessments (id, version, created_at, updated_at) 
VALUES ('ai-readiness-v2', '2.0', now(), now())
ON CONFLICT (id) DO UPDATE SET 
  version = EXCLUDED.version,
  updated_at = EXCLUDED.updated_at;

-- 5. Clear old question data to be replaced with new YAML structure
DELETE FROM public.questions WHERE assessment_id = 'ai-readiness-v2';
DELETE FROM public.sections WHERE assessment_id = 'ai-readiness-v2';

-- 6. Update the populate_answer_metadata function to handle the new structure properly
CREATE OR REPLACE FUNCTION public.populate_answer_metadata()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
    question_record RECORD;
    submission_record RECORD;
    option_item JSONB;
    bucket_score TEXT;
    countries JSONB;
    country_item JSONB;
    answer_string TEXT;
BEGIN
    -- Get question metadata from questions table
    SELECT 
        q.section_id,
        q.text as question_text,
        q.type as question_type,
        q.helper as question_helper,
        q.options as question_options,
        q.required as question_required,
        q.score_map_by_bucket
    INTO question_record
    FROM public.questions q
    WHERE q.id = NEW.question_id
    LIMIT 1;

    -- Get submission info  
    SELECT assessment_id INTO submission_record
    FROM public.submissions s
    WHERE s.id = NEW.submission_id
    LIMIT 1;

    -- Populate basic metadata fields
    NEW.section_id := question_record.section_id;
    NEW.question_text := question_record.question_text;
    NEW.question_type := question_record.question_type;
    NEW.question_helper := question_record.question_helper;
    NEW.question_options := question_record.question_options;
    NEW.question_required := question_record.question_required;
    
    -- Initialize new fields
    NEW.option_score := NULL;
    NEW.option_reasoning := NULL;
    NEW.option_model_input_context := NULL;
    NEW.answer_score := 50; -- default score
    
    -- Extract the answer value as string for comparison
    IF NEW.value IS NOT NULL THEN
        IF jsonb_typeof(NEW.value) = 'string' THEN
            answer_string := NEW.value #>> '{}';
        ELSIF jsonb_typeof(NEW.value) = 'array' AND jsonb_array_length(NEW.value) > 0 THEN
            answer_string := NEW.value ->> 0; -- Take first element for array answers
        END IF;
    END IF;

    -- Extract option-specific metadata if the answer matches an option
    IF question_record.question_options IS NOT NULL AND answer_string IS NOT NULL THEN
        -- Handle options with the new structure (objects with score, reasoning, model_input_context)
        IF jsonb_typeof(question_record.question_options) = 'array' THEN
            FOR option_item IN SELECT * FROM jsonb_array_elements(question_record.question_options)
            LOOP
                -- Check if this option matches the answer value
                IF (option_item ? 'value' AND option_item ->> 'value' = answer_string) OR 
                   (option_item ? 'label' AND option_item ->> 'label' = answer_string) OR
                   (NOT (option_item ? 'value') AND option_item #>> '{}' = answer_string) THEN
                    
                    -- Extract the new fields
                    IF option_item ? 'score' THEN
                        NEW.option_score := (option_item ->> 'score')::integer;
                        NEW.answer_score := NEW.option_score * 20; -- Convert 1-5 scale to 0-100
                    END IF;
                    
                    IF option_item ? 'reasoning' THEN
                        NEW.option_reasoning := option_item ->> 'reasoning';
                    END IF;
                    
                    IF option_item ? 'model_input_context' THEN
                        NEW.option_model_input_context := option_item ->> 'model_input_context';
                    END IF;
                    
                    EXIT; -- Found match, stop looking
                END IF;
            END LOOP;
        END IF;
        
        -- Handle score_map_by_bucket for countries etc. (only if no score found yet)
        IF question_record.score_map_by_bucket IS NOT NULL AND answer_string IS NOT NULL AND NEW.option_score IS NULL THEN
            FOR bucket_score IN SELECT * FROM jsonb_object_keys(question_record.score_map_by_bucket)
            LOOP
                countries := question_record.score_map_by_bucket -> bucket_score;
                FOR country_item IN SELECT * FROM jsonb_array_elements(countries)
                LOOP
                    IF country_item #>> '{}' = answer_string OR country_item #>> '{}' = '*' THEN
                        NEW.option_score := bucket_score::integer;
                        NEW.answer_score := NEW.option_score * 20; -- Convert 1-5 scale to 0-100
                        NEW.option_reasoning := COALESCE(NEW.option_reasoning, 'Score based on country AI readiness level');
                        NEW.option_model_input_context := COALESCE(NEW.option_model_input_context, 'Country-specific AI adoption context for ' || answer_string);
                        EXIT;
                    END IF;
                END LOOP;
                IF NEW.option_score IS NOT NULL THEN EXIT; END IF;
            END LOOP;
        END IF;
    END IF;

    RETURN NEW;
END;
$function$;

-- 7. Recreate the trigger
DROP TRIGGER IF EXISTS trigger_populate_answer_metadata ON public.answers;
CREATE TRIGGER trigger_populate_answer_metadata
    BEFORE INSERT OR UPDATE ON public.answers
    FOR EACH ROW
    EXECUTE FUNCTION public.populate_answer_metadata();

-- 8. Add useful indexes for performance
CREATE INDEX IF NOT EXISTS idx_questions_assessment_section ON public.questions(assessment_id, section_id);
CREATE INDEX IF NOT EXISTS idx_answers_question_score ON public.answers(question_id, option_score);
CREATE INDEX IF NOT EXISTS idx_answers_reasoning ON public.answers USING GIN(to_tsvector('english', option_reasoning));

-- Success message
SELECT 'Database cleanup and update completed successfully' as status;