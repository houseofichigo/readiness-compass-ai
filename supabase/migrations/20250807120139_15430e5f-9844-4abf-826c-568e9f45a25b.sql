-- First, let's see what's in the questions table and update it with the latest YAML data
-- We need to ensure all questions have the proper options structure with score, reasoning, and model_input_context

-- Create a function to sync questions from the application YAML data
CREATE OR REPLACE FUNCTION public.sync_questions_from_yaml()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
    -- This function will be called from the application to sync YAML data
    -- For now, we'll update the existing questions structure to support the new fields
    
    -- Update questions that should have the new option structure
    -- Note: The actual data sync will happen from the application layer
    
    RAISE NOTICE 'Questions sync function created - to be called from application';
END;
$function$;

-- Update the populate_answer_metadata function to be more robust
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
BEGIN
    -- Get question metadata from questions table
    SELECT 
        q.section_id,
        q.text as question_text,
        q.type as question_type,
        q.helper as question_helper,
        q.options as question_options,
        q.required as question_required,
        q.score_map_by_bucket,
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
    
    -- Extract option-specific metadata if the answer matches an option
    IF question_record.question_options IS NOT NULL AND NEW.value IS NOT NULL THEN
        -- Handle single-select answers
        IF jsonb_typeof(NEW.value) = 'string' THEN
            -- Check if options is an array of objects with the new structure
            IF jsonb_typeof(question_record.question_options) = 'array' THEN
                FOR option_item IN SELECT * FROM jsonb_array_elements(question_record.question_options)
                LOOP
                    -- Check if this option matches the answer value
                    IF (option_item ? 'value' AND option_item->>'value' = (NEW.value#>>'{}')) OR 
                       (option_item ? 'label' AND option_item->>'label' = (NEW.value#>>'{}')) OR
                       (NOT (option_item ? 'value') AND option_item#>>'{}'  = (NEW.value#>>'{}')) THEN
                        
                        -- Extract the new fields
                        IF option_item ? 'score' THEN
                            NEW.option_score := (option_item->>'score')::integer;
                        END IF;
                        
                        IF option_item ? 'reasoning' THEN
                            NEW.option_reasoning := option_item->>'reasoning';
                        END IF;
                        
                        IF option_item ? 'model_input_context' THEN
                            NEW.option_model_input_context := option_item->>'model_input_context';
                        END IF;
                        
                        EXIT;
                    END IF;
                END LOOP;
            END IF;
        END IF;
        
        -- Handle score_map_by_bucket for countries etc.
        IF question_record.score_map_by_bucket IS NOT NULL AND jsonb_typeof(NEW.value) = 'string' AND NEW.option_score IS NULL THEN
            FOR bucket_score IN SELECT * FROM jsonb_object_keys(question_record.score_map_by_bucket)
            LOOP
                countries := question_record.score_map_by_bucket->bucket_score;
                FOR country_item IN SELECT * FROM jsonb_array_elements(countries)
                LOOP
                    IF country_item#>>'{}'  = (NEW.value#>>'{}') OR country_item#>>'{}'  = '*' THEN
                        NEW.option_score := bucket_score::integer;
                        NEW.option_reasoning := COALESCE(NEW.option_reasoning, 'Score based on country AI readiness level');
                        NEW.option_model_input_context := COALESCE(NEW.option_model_input_context, 'Country-specific AI adoption context');
                        EXIT;
                    END IF;
                END LOOP;
                IF NEW.option_score IS NOT NULL THEN EXIT; END IF;
            END LOOP;
        END IF;
    END IF;
    
    -- Calculate basic score if not provided
    IF NEW.answer_score IS NULL THEN
        NEW.answer_score := COALESCE(NEW.option_score * 20, question_record.default_score, 50);
    END IF;

    RETURN NEW;
END;
$function$;

-- Make sure the options columns can store the new extended structure
-- Add indexes for better performance on the new fields
CREATE INDEX IF NOT EXISTS idx_answers_option_score ON public.answers(option_score);
CREATE INDEX IF NOT EXISTS idx_answers_option_reasoning ON public.answers(option_reasoning);
CREATE INDEX IF NOT EXISTS idx_questions_score_map_by_bucket ON public.questions USING GIN(score_map_by_bucket);