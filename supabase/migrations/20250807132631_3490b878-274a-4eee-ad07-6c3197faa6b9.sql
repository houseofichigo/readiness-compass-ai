-- Update the populate_answer_metadata trigger to properly extract option data
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
    
    -- Initialize new fields with defaults
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