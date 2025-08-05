-- Remove the foreign key constraint that's preventing answer insertion
-- Since questions are loaded from YAML, not from the database
ALTER TABLE public.answers DROP CONSTRAINT IF EXISTS answers_question_id_fkey;

-- Add a comment to document this design decision
COMMENT ON COLUMN public.answers.question_id IS 'Question ID from YAML configuration, not referencing questions table';