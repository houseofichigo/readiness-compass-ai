-- Fix answers triggers to use existing trigger functions directly
-- Drop wrapper functions and triggers
 drop trigger if exists before_answers_set_scoring on public.answers;
 drop trigger if exists after_answers_compute_submission on public.answers;
 drop function if exists public.tg_before_answers_set_scoring();
 drop function if exists public.tg_after_answers_compute_submission();

-- Create correct triggers using existing trigger functions
create trigger before_answers_set_scoring
before insert or update on public.answers
for each row execute function public.set_answer_scoring();

create trigger after_answers_compute_submission
after insert or update on public.answers
for each row execute function public.trigger_compute_on_answers();
