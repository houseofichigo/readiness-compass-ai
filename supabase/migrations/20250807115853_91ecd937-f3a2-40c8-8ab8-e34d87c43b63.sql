-- Add new scoring and context fields to questions table
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS score_map_by_bucket jsonb;

-- Add new fields to answers table for automatic population
ALTER TABLE public.answers ADD COLUMN IF NOT EXISTS option_score integer;
ALTER TABLE public.answers ADD COLUMN IF NOT EXISTS option_reasoning text;
ALTER TABLE public.answers ADD COLUMN IF NOT EXISTS option_model_input_context text;

-- Add pillar_score to sections table
ALTER TABLE public.sections ADD COLUMN IF NOT EXISTS pillar_score integer;

-- Update the populate_answer_metadata function to include new fields
CREATE OR REPLACE FUNCTION public.populate_answer_metadata()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
    question_record RECORD;
    submission_record RECORD;
    selected_option JSONB;
    option_item JSONB;
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
    
    -- Extract option-specific metadata if the answer matches an option
    IF question_record.question_options IS NOT NULL AND NEW.value IS NOT NULL THEN
        -- Handle single-select answers
        IF jsonb_typeof(NEW.value) = 'string' THEN
            FOR option_item IN SELECT * FROM jsonb_array_elements(question_record.question_options)
            LOOP
                IF option_item->>'value' = (NEW.value#>>'{}') OR option_item->>'label' = (NEW.value#>>'{}') THEN
                    NEW.option_score := COALESCE((option_item->>'score')::integer, NULL);
                    NEW.option_reasoning := option_item->>'reasoning';
                    NEW.option_model_input_context := option_item->>'model_input_context';
                    EXIT;
                END IF;
            END LOOP;
        END IF;
        
        -- Handle score_map_by_bucket for countries etc.
        IF question_record.score_map_by_bucket IS NOT NULL AND jsonb_typeof(NEW.value) = 'string' THEN
            DECLARE
                bucket_score TEXT;
                countries JSONB;
                country_list JSONB;
            BEGIN
                FOR bucket_score IN SELECT * FROM jsonb_object_keys(question_record.score_map_by_bucket)
                LOOP
                    countries := question_record.score_map_by_bucket->bucket_score;
                    FOR country_list IN SELECT * FROM jsonb_array_elements(countries)
                    LOOP
                        IF country_list#>>'{}'  = (NEW.value#>>'{}') OR country_list#>>'{}'  = '*' THEN
                            NEW.option_score := bucket_score::integer;
                            NEW.option_reasoning := 'Score based on country AI readiness level';
                            NEW.option_model_input_context := 'Country-specific AI adoption context';
                            EXIT;
                        END IF;
                    END LOOP;
                    IF NEW.option_score IS NOT NULL THEN EXIT; END IF;
                END LOOP;
            END;
        END IF;
    END IF;
    
    -- Calculate basic score if not provided
    IF NEW.answer_score IS NULL THEN
        NEW.answer_score := COALESCE(NEW.option_score * 20, question_record.default_score);
    END IF;

    RETURN NEW;
END;
$function$;

-- Create trigger if it doesn't exist
DROP TRIGGER IF EXISTS trigger_populate_answer_metadata ON public.answers;
CREATE TRIGGER trigger_populate_answer_metadata
    BEFORE INSERT OR UPDATE ON public.answers
    FOR EACH ROW
    EXECUTE FUNCTION public.populate_answer_metadata();

-- Update existing answers that might be missing the new metadata
UPDATE public.answers 
SET 
    option_score = NULL,
    option_reasoning = NULL,
    option_model_input_context = NULL
WHERE option_score IS NULL AND option_reasoning IS NULL AND option_model_input_context IS NULL;