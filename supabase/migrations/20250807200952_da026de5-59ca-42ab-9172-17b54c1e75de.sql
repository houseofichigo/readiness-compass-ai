-- Phase 1: re-trigger scoring on test submission
update public.answers set chosen_value = chosen_value
where submission_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid;