ALTER TABLE answers 
  ADD COLUMN section_id          TEXT,
  ADD COLUMN question_text       TEXT,
  ADD COLUMN question_type       TEXT,
  ADD COLUMN question_helper     TEXT,
  ADD COLUMN question_options    JSONB,
  ADD COLUMN question_required   BOOLEAN,
  ADD COLUMN answer_score        INT;