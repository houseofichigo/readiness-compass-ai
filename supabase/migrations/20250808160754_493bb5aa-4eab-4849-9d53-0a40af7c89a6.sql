-- Batch 5: Keep organization stats in sync via triggers

-- Replace trigger function to handle INSERT/UPDATE/DELETE and org changes
CREATE OR REPLACE FUNCTION public.trg_recompute_org_stats_fn()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_new_org uuid;
  v_old_org uuid;
BEGIN
  v_new_org := NULL; v_old_org := NULL;

  IF TG_OP = 'INSERT' THEN
    v_new_org := NEW.organization_id;
  ELSIF TG_OP = 'UPDATE' THEN
    v_new_org := NEW.organization_id;
    v_old_org := OLD.organization_id;
    IF v_old_org IS NOT NULL AND (v_new_org IS DISTINCT FROM v_old_org) THEN
      PERFORM public.recompute_org_stats(v_old_org);
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    v_old_org := OLD.organization_id;
  END IF;

  IF v_new_org IS NOT NULL THEN
    PERFORM public.recompute_org_stats(v_new_org);
  ELSIF v_old_org IS NOT NULL THEN
    PERFORM public.recompute_org_stats(v_old_org);
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create/replace triggers on submissions
DROP TRIGGER IF EXISTS trg_recompute_org_stats_ins_upd ON public.submissions;
CREATE TRIGGER trg_recompute_org_stats_ins_upd
AFTER INSERT OR UPDATE OF organization_id, completed, percentage_score, created_at
ON public.submissions
FOR EACH ROW
EXECUTE FUNCTION public.trg_recompute_org_stats_fn();

DROP TRIGGER IF EXISTS trg_recompute_org_stats_del ON public.submissions;
CREATE TRIGGER trg_recompute_org_stats_del
AFTER DELETE ON public.submissions
FOR EACH ROW
EXECUTE FUNCTION public.trg_recompute_org_stats_fn();