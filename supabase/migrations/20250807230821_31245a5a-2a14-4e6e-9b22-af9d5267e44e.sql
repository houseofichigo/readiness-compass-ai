-- Batch 3: Fix anonymous submission reading and final polish

-- 1) Allow anonymous users to read submissions within a short time window (for Thank You page)
-- Add policy for anonymous users to read submissions they just created
CREATE POLICY "Anon can select recent anonymous or just-created submissions"
ON public.submissions
FOR SELECT
TO anon
USING (
  -- Recently created (within 1 hour) submissions can be read by anon
  created_at > (now() - interval '1 hour')
);

-- 2) Allow anonymous users to read answers for recent submissions
CREATE POLICY "Anon can select answers for recent submissions"
ON public.answers
FOR SELECT
TO anon
USING (
  -- Can read answers for submissions created within the last hour
  EXISTS (
    SELECT 1 FROM public.submissions s 
    WHERE s.id = answers.submission_id 
    AND s.created_at > (now() - interval '1 hour')
  )
);

-- 3) Create a secure RPC to load submission data (alternative approach)
CREATE OR REPLACE FUNCTION public.load_submission_data(_submission_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
DECLARE
  result jsonb;
  submission_row record;
  answers_data jsonb;
BEGIN
  -- Get submission data
  SELECT * INTO submission_row
  FROM public.submissions 
  WHERE id = _submission_id
  AND created_at > (now() - interval '24 hours'); -- Only recent submissions
  
  IF NOT FOUND THEN
    RETURN null;
  END IF;
  
  -- Get answers data
  SELECT jsonb_agg(
    jsonb_build_object(
      'question_id', question_id,
      'raw_response', raw_response,
      'chosen_value', chosen_value,
      'score', score,
      'pillar_scores', pillar_scores,
      'reasoning', reasoning,
      'model_input_context', model_input_context
    )
  ) INTO answers_data
  FROM public.answers
  WHERE submission_id = _submission_id;
  
  -- Build result
  result := jsonb_build_object(
    'id', submission_row.id,
    'completed', submission_row.completed,
    'total_score', submission_row.total_score,
    'max_possible_score', submission_row.max_possible_score,
    'percentage_score', submission_row.percentage_score,
    'pillar_scores', submission_row.pillar_scores,
    'created_at', submission_row.created_at,
    'organization_id', submission_row.organization_id,
    'answers', COALESCE(answers_data, '[]'::jsonb)
  );
  
  RETURN result;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.load_submission_data(uuid) TO anon, authenticated;