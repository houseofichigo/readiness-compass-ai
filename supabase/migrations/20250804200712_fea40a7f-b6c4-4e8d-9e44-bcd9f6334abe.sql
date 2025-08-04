-- Create the assessment database schema

-- 1. assessments
CREATE TABLE assessments (
  id                   TEXT        PRIMARY KEY,
  version              TEXT        NOT NULL,
  locale_default       TEXT,
  max_visible_questions INT,
  size_breakpoints     JSONB,
  question_cap         JSONB,
  created_at           TIMESTAMP   NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMP   NOT NULL DEFAULT NOW()
);

-- 2. tracks
CREATE TABLE tracks (
  id      TEXT PRIMARY KEY,
  label   TEXT NOT NULL
);

-- 3. track_detection_rules
CREATE TABLE track_detection_rules (
  id          SERIAL       PRIMARY KEY,
  precedence  INT          NOT NULL,
  condition   JSONB        NOT NULL,
  track_id    TEXT         NOT NULL REFERENCES tracks(id)
);

-- 4. track_weights
CREATE TABLE track_weights (
  track_id   TEXT PRIMARY KEY REFERENCES tracks(id),
  strategy   INT NOT NULL,
  data       INT NOT NULL,
  tools      INT NOT NULL,
  automation INT NOT NULL,
  people     INT NOT NULL,
  governance INT NOT NULL
);

-- 5. sections
CREATE TABLE sections (
  id            TEXT       PRIMARY KEY,
  assessment_id TEXT       REFERENCES assessments(id),
  sequence      INT        NOT NULL,
  title         TEXT       NOT NULL,
  purpose       TEXT,
  category      TEXT
);

-- 6. consent_banners
CREATE TABLE consent_banners (
  section_id   TEXT    PRIMARY KEY REFERENCES sections(id),
  title        TEXT,
  description  TEXT,
  consent_text TEXT,
  text         TEXT,
  required     BOOLEAN NOT NULL DEFAULT TRUE
);

-- 7. computed_definitions
CREATE TABLE computed_definitions (
  section_id TEXT REFERENCES sections(id),
  field_id   TEXT,
  logic      TEXT,
  formula    TEXT,
  conditions JSONB,
  PRIMARY KEY (section_id, field_id)
);

-- 8. questions
CREATE TABLE questions (
  id             TEXT      PRIMARY KEY,
  assessment_id  TEXT      REFERENCES assessments(id),
  section_id     TEXT      REFERENCES sections(id) ON DELETE CASCADE,
  sequence       INT       NOT NULL,
  is_add_on      BOOLEAN   NOT NULL DEFAULT FALSE,
  text           TEXT      NOT NULL,
  type           TEXT      NOT NULL,
  helper         TEXT,
  required       BOOLEAN   NOT NULL DEFAULT FALSE,
  options        JSONB,
  rows           JSONB,
  columns        JSONB,
  groups         JSONB,
  show_if        JSONB,
  hide_if        JSONB,
  score_map      JSONB,
  score_per      INT,
  cap            INT,
  weight         JSONB,
  max_rank       INT,
  max_select     INT,
  score_formula  TEXT,
  score_by_count JSONB,
  created_at     TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 9. submissions
CREATE TABLE submissions (
  id                UUID       PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id     TEXT       REFERENCES assessments(id),
  user_id           UUID       REFERENCES auth.users(id),
  created_at        TIMESTAMP  NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMP  NOT NULL DEFAULT NOW(),
  track             TEXT       REFERENCES tracks(id),
  regulated         BOOLEAN,
  completed         BOOLEAN    NOT NULL DEFAULT FALSE,
  organization_name TEXT,
  full_name         TEXT,
  email             TEXT,
  role              TEXT,
  role_other        TEXT,
  industry          TEXT,
  industry_other    TEXT,
  country           TEXT,
  company_size      TEXT,
  revenue           TEXT
);

-- 10. answers
CREATE TABLE answers (
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  question_id   TEXT REFERENCES questions(id) ON DELETE CASCADE,
  value         JSONB,
  answered_at   TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (submission_id, question_id)
);

-- 11. computed_values
CREATE TABLE computed_values (
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  field_id      TEXT,
  value         JSONB,
  PRIMARY KEY (submission_id, field_id)
);

-- 12. section_scores
CREATE TABLE section_scores (
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  section_id    TEXT REFERENCES sections(id) ON DELETE CASCADE,
  score         NUMERIC,
  PRIMARY KEY (submission_id, section_id)
);

-- 13. question_scores
CREATE TABLE question_scores (
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  question_id   TEXT REFERENCES questions(id) ON DELETE CASCADE,
  score         NUMERIC,
  PRIMARY KEY (submission_id, question_id)
);

-- Create indexes for better performance
CREATE INDEX idx_sections_assessment_id ON sections(assessment_id);
CREATE INDEX idx_questions_section_id ON questions(section_id);
CREATE INDEX idx_questions_assessment_id ON questions(assessment_id);
CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_submissions_assessment_id ON submissions(assessment_id);
CREATE INDEX idx_answers_submission_id ON answers(submission_id);
CREATE INDEX idx_track_detection_rules_precedence ON track_detection_rules(precedence);

-- Enable Row Level Security
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE computed_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_scores ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user-specific data
CREATE POLICY "Users can view their own submissions" 
ON submissions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own submissions" 
ON submissions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions" 
ON submissions FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own answers" 
ON answers FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM submissions 
  WHERE submissions.id = answers.submission_id 
  AND submissions.user_id = auth.uid()
));

CREATE POLICY "Users can create their own answers" 
ON answers FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM submissions 
  WHERE submissions.id = answers.submission_id 
  AND submissions.user_id = auth.uid()
));

CREATE POLICY "Users can update their own answers" 
ON answers FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM submissions 
  WHERE submissions.id = answers.submission_id 
  AND submissions.user_id = auth.uid()
));

-- Similar policies for computed_values, section_scores, question_scores
CREATE POLICY "Users can view their own computed values" 
ON computed_values FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM submissions 
  WHERE submissions.id = computed_values.submission_id 
  AND submissions.user_id = auth.uid()
));

CREATE POLICY "Users can view their own section scores" 
ON section_scores FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM submissions 
  WHERE submissions.id = section_scores.submission_id 
  AND submissions.user_id = auth.uid()
));

CREATE POLICY "Users can view their own question scores" 
ON question_scores FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM submissions 
  WHERE submissions.id = question_scores.submission_id 
  AND submissions.user_id = auth.uid()
));

-- Public read access for assessment configuration tables
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE track_detection_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE track_weights ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE computed_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can read assessments" ON assessments FOR SELECT USING (true);
CREATE POLICY "Everyone can read tracks" ON tracks FOR SELECT USING (true);
CREATE POLICY "Everyone can read track detection rules" ON track_detection_rules FOR SELECT USING (true);
CREATE POLICY "Everyone can read track weights" ON track_weights FOR SELECT USING (true);
CREATE POLICY "Everyone can read sections" ON sections FOR SELECT USING (true);
CREATE POLICY "Everyone can read consent banners" ON consent_banners FOR SELECT USING (true);
CREATE POLICY "Everyone can read computed definitions" ON computed_definitions FOR SELECT USING (true);
CREATE POLICY "Everyone can read questions" ON questions FOR SELECT USING (true);

-- Create triggers for updated_at columns
CREATE TRIGGER update_assessments_updated_at
BEFORE UPDATE ON assessments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questions_updated_at
BEFORE UPDATE ON questions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at
BEFORE UPDATE ON submissions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();