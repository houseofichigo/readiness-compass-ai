-- Fix security issues in database functions by adding proper search paths
-- Phase 3: Security Hardening

-- Update all functions to have proper security settings
CREATE OR REPLACE FUNCTION public.populate_answer_metadata()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
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
        q.score_map_by_bucket,
        q.category,
        q.purpose,
        q.pillar_scores,
        q.pillar_options,
        q.pillar_logic
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
    
    -- Populate new category/purpose fields
    NEW.category := question_record.category;
    NEW.purpose := question_record.purpose;
    NEW.pillar_scores := question_record.pillar_scores;
    NEW.pillar_options := question_record.pillar_options;
    NEW.pillar_logic := question_record.pillar_logic;
    
    -- Initialize scoring fields with defaults
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
                   (option_item ? 'label' AND option_item ->> 'label' = answer_string) THEN
                    
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
                IF jsonb_typeof(countries) = 'array' THEN
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
                END IF;
                IF NEW.option_score IS NOT NULL THEN EXIT; END IF;
            END LOOP;
        END IF;
    END IF;

    RETURN NEW;
END;
$function$;

-- Update other security-sensitive functions
CREATE OR REPLACE FUNCTION public.backfill_answer_option_metadata()
 RETURNS TABLE(updated_count integer, total_processed integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    answer_record RECORD;
    option_item JSONB;
    bucket_score TEXT;
    countries JSONB;
    country_item JSONB;
    answer_string TEXT;
    updated_answers INTEGER := 0;
    total_answers INTEGER := 0;
BEGIN
    -- Process all answers that don't have option metadata
    FOR answer_record IN 
        SELECT id, question_id, value, question_options, score_map_by_bucket
        FROM public.answers 
        WHERE option_score IS NULL OR option_reasoning IS NULL
    LOOP
        total_answers := total_answers + 1;
        
        -- Extract answer value as string
        answer_string := NULL;
        IF answer_record.value IS NOT NULL THEN
            IF jsonb_typeof(answer_record.value) = 'string' THEN
                answer_string := answer_record.value #>> '{}';
            ELSIF jsonb_typeof(answer_record.value) = 'array' AND jsonb_array_length(answer_record.value) > 0 THEN
                answer_string := answer_record.value ->> 0;
            END IF;
        END IF;
        
        -- Try to find matching option metadata
        IF answer_record.question_options IS NOT NULL AND answer_string IS NOT NULL THEN
            IF jsonb_typeof(answer_record.question_options) = 'array' THEN
                FOR option_item IN SELECT * FROM jsonb_array_elements(answer_record.question_options)
                LOOP
                    -- Check if this option matches the answer value
                    IF (option_item ? 'value' AND option_item ->> 'value' = answer_string) OR 
                       (option_item ? 'label' AND option_item ->> 'label' = answer_string) THEN
                        
                        -- Update the answer with option metadata
                        UPDATE public.answers
                        SET 
                            option_score = CASE WHEN option_item ? 'score' THEN (option_item ->> 'score')::integer ELSE NULL END,
                            option_reasoning = CASE WHEN option_item ? 'reasoning' THEN option_item ->> 'reasoning' ELSE NULL END,
                            option_model_input_context = CASE WHEN option_item ? 'model_input_context' THEN option_item ->> 'model_input_context' ELSE NULL END,
                            answer_score = CASE 
                                WHEN option_item ? 'score' THEN (option_item ->> 'score')::integer * 20 
                                ELSE 50 
                            END
                        WHERE id = answer_record.id;
                        
                        updated_answers := updated_answers + 1;
                        EXIT; -- Found match, stop looking
                    END IF;
                END LOOP;
            END IF;
        END IF;
        
        -- Try score_map_by_bucket if no option match found
        IF answer_record.score_map_by_bucket IS NOT NULL AND answer_string IS NOT NULL THEN
            FOR bucket_score IN SELECT * FROM jsonb_object_keys(answer_record.score_map_by_bucket)
            LOOP
                countries := answer_record.score_map_by_bucket -> bucket_score;
                IF jsonb_typeof(countries) = 'array' THEN
                    FOR country_item IN SELECT * FROM jsonb_array_elements(countries)
                    LOOP
                        IF country_item #>> '{}' = answer_string OR country_item #>> '{}' = '*' THEN
                            UPDATE public.answers
                            SET 
                                option_score = bucket_score::integer,
                                answer_score = bucket_score::integer * 20,
                                option_reasoning = COALESCE(option_reasoning, 'Score based on country AI readiness level'),
                                option_model_input_context = COALESCE(option_model_input_context, 'Country-specific AI adoption context for ' || answer_string)
                            WHERE id = answer_record.id;
                            
                            updated_answers := updated_answers + 1;
                            EXIT;
                        END IF;
                    END LOOP;
                END IF;
                IF updated_answers > (total_answers - 1) THEN EXIT; END IF; -- Check if this answer was updated
            END LOOP;
        END IF;
    END LOOP;
    
    RETURN QUERY SELECT updated_answers, total_answers;
END;
$function$;

-- Add trigger for answer metadata population if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'populate_answer_metadata_trigger'
    ) THEN
        CREATE TRIGGER populate_answer_metadata_trigger
            BEFORE INSERT ON public.answers
            FOR EACH ROW
            EXECUTE FUNCTION public.populate_answer_metadata();
    END IF;
END $$;