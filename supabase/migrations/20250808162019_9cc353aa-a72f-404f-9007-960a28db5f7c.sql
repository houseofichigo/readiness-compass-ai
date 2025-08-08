-- Fix cleanup function: avoid RETURNING INTO, use ROW_COUNT only
CREATE OR REPLACE FUNCTION public.cleanup_invalid_completed_submissions()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_updated int := 0;
BEGIN
  WITH m0 AS (
    SELECT a.submission_id,
           NULLIF(btrim(a.raw_response#>>'{}'), '') AS company
    FROM public.answers a
    WHERE a.question_id = 'M0'
  ), invalid AS (
    SELECT s.id
    FROM public.submissions s
    LEFT JOIN m0 ON m0.submission_id = s.id
    WHERE s.completed = true
      AND (
        s.organization_id IS NULL OR
        m0.company IS NULL OR length(m0.company) < 2 OR lower(m0.company) IN ('n/a','na','none','n.a.','not applicable') OR m0.company IN ('-','.','--')
      )
  )
  UPDATE public.submissions s
  SET completed = false, updated_at = now()
  WHERE s.id IN (SELECT id FROM invalid);

  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated;
END;
$$;

-- Run cleanup and output counts
SELECT public.cleanup_invalid_completed_submissions() AS fixed_count;

-- Post-checks
WITH m0 AS (
  SELECT a.submission_id,
         NULLIF(btrim(a.raw_response#>>'{}'), '') AS company
  FROM public.answers a
  WHERE a.question_id = 'M0'
)
SELECT COUNT(*) AS remaining_invalid_completed
FROM public.submissions s
LEFT JOIN m0 ON m0.submission_id = s.id
WHERE s.completed = true
  AND (
    s.organization_id IS NULL OR
    m0.company IS NULL OR length(m0.company) < 2 OR lower(m0.company) IN ('n/a','na','none','n.a.','not applicable') OR m0.company IN ('-','.','--')
  );