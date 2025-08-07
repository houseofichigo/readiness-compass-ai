
-- 1) Ensure updated_at columns auto-update

-- Answers
drop trigger if exists trg_answers_updated_at on public.answers;
create trigger trg_answers_updated_at
before update on public.answers
for each row execute function public.update_updated_at_column();

-- Submissions
drop trigger if exists trg_submissions_updated_at on public.submissions;
create trigger trg_submissions_updated_at
before update on public.submissions
for each row execute function public.update_updated_at_column();

-- Questions
drop trigger if exists trg_questions_updated_at on public.questions;
create trigger trg_questions_updated_at
before update on public.questions
for each row execute function public.update_updated_at_column();

-- Question choices
drop trigger if exists trg_question_choices_updated_at on public.question_choices;
create trigger trg_question_choices_updated_at
before update on public.question_choices
for each row execute function public.update_updated_at_column();

-- Sections
drop trigger if exists trg_sections_updated_at on public.sections;
create trigger trg_sections_updated_at
before update on public.sections
for each row execute function public.update_updated_at_column();


-- 2) Scoring on answers and recompute totals

-- Copy choice label/score and set max_possible_score
drop trigger if exists trg_answers_set_scoring on public.answers;
create trigger trg_answers_set_scoring
before insert or update on public.answers
for each row execute function public.set_answer_scoring();

-- Recompute section scores and submission totals after any change to answers
drop trigger if exists trg_answers_compute on public.answers;
create trigger trg_answers_compute
after insert or update or delete on public.answers
for each row execute function public.trigger_compute_on_answers();
