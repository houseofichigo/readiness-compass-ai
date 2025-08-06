-- Update existing assessment with missing data
UPDATE assessments 
SET 
  size_breakpoints = '{"micro": "1-9", "small": "10-49", "medium": "50-249", "large": "250-999", "enterprise": "1000+"}'::jsonb,
  question_cap = '{"max_questions": 60, "auto_hide": ["D2", "P6"]}'::jsonb
WHERE id = 'ai_readiness_v2';

-- Insert sections (with ON CONFLICT to handle duplicates)
INSERT INTO sections (id, assessment_id, title, purpose, category, sequence) VALUES
('section_0', 'ai_readiness_v2', 'Organization Profile', 'Collect organization profile for track detection and personalized recommendations.', NULL, 0),
('section_1', 'ai_readiness_v2', 'Strategic Planning', 'Assess strategic alignment & planning maturity.', 'strategy', 1),
('section_2', 'ai_readiness_v2', 'Financial & Regulatory', 'Budget, runway, investor support, compliance.', NULL, 2),
('section_3', 'ai_readiness_v2', 'Data Foundation', 'Data foundation, security, ethics, compliance.', 'data', 3),
('section_4', 'ai_readiness_v2', 'Tools & Infrastructure', 'Platform maturity & technical capabilities.', 'tools', 4),
('section_5', 'ai_readiness_v2', 'Automation & Processes', 'Process maturity & automation readiness.', 'automation', 5),
('section_6', 'ai_readiness_v2', 'People & Skills', 'Team capabilities & organizational culture.', 'people', 6),
('section_7', 'ai_readiness_v2', 'Governance & Ethics', 'Risk management & ethical framework.', 'governance', 7)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  purpose = EXCLUDED.purpose,
  category = EXCLUDED.category,
  sequence = EXCLUDED.sequence;

-- Insert key questions from section 0 (Organization Profile)
INSERT INTO questions (id, assessment_id, section_id, text, type, sequence, required, options) VALUES
('M1', 'ai_readiness_v2', 'section_0', 'Company Name', 'text', 1, true, NULL),
('M2', 'ai_readiness_v2', 'section_0', 'Industry', 'select', 2, true, '[
  "Agriculture & Forestry", "Mining", "Manufacturing", "Utilities (Electricity, Gas, Water & Waste)",
  "Construction", "Wholesale Trade", "Retail Trade", "Transportation & Warehousing",
  "Information & Communication Technology", "Finance & Insurance", "Real Estate",
  "Professional, Scientific & Technical Services", "Administrative & Support & Waste Management Services",
  "Public Administration & Safety", "Education & Training", "Health Care & Social Assistance",
  "Arts & Recreation Services", "Accommodation & Food Services", "Other Services", "Other"
]'::jsonb),
('M3', 'ai_readiness_v2', 'section_0', 'Your Role', 'select', 3, true, '[
  "CEO / President", "CIO / CTO", "COO", "CFO", "CHRO / People Lead", "CMO / Marketing Lead",
  "Legal / Compliance Lead", "IT Lead", "Data / AI Lead", "ML Engineer", "Data Engineer",
  "DevOps Engineer", "Security Architect", "Infrastructure Manager", "Privacy Officer",
  "Compliance Manager", "Risk Manager", "Audit Lead", "Governance Officer", "Other"
]'::jsonb),
('M4', 'ai_readiness_v2', 'section_0', 'Company Size (employees)', 'select', 4, true, '[
  "1-9", "10-49", "50-249", "250-999", "1000+"
]'::jsonb),
('M5', 'ai_readiness_v2', 'section_0', 'Annual Revenue', 'select', 5, false, '[
  "Pre-revenue", "Under $1M", "$1M-$10M", "$10M-$100M", "$100M-$1B", "Over $1B"
]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  text = EXCLUDED.text,
  type = EXCLUDED.type,
  sequence = EXCLUDED.sequence,
  required = EXCLUDED.required,
  options = EXCLUDED.options;

-- Insert sample questions from section 1 (Strategic Planning)
INSERT INTO questions (id, assessment_id, section_id, text, type, sequence, required, options) VALUES
('S1', 'ai_readiness_v2', 'section_1', 'Does your organization have a formal AI strategy?', 'select', 1, true, '[
  "Yes, comprehensive and well-documented", "Yes, but basic/informal", "In development", "No, but planned", "No"
]'::jsonb),
('S2', 'ai_readiness_v2', 'section_1', 'How aligned is leadership on AI priorities?', 'select', 2, true, '[
  "Fully aligned with clear vision", "Mostly aligned", "Somewhat aligned", "Limited alignment", "No alignment"
]'::jsonb),
('S3', 'ai_readiness_v2', 'section_1', 'What is your primary AI objective?', 'select', 3, true, '[
  "Operational efficiency", "Revenue growth", "Customer experience", "Risk reduction", "Innovation/competitive advantage", "Cost reduction"
]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  text = EXCLUDED.text,
  type = EXCLUDED.type,
  sequence = EXCLUDED.sequence,
  required = EXCLUDED.required,
  options = EXCLUDED.options;

-- Insert consent banners
INSERT INTO consent_banners (section_id, text, required) VALUES
('section_0', 'By proceeding, you agree to process your data for this readiness report and related communications.', true)
ON CONFLICT (section_id) DO UPDATE SET
  text = EXCLUDED.text,
  required = EXCLUDED.required;

-- Insert track detection rules
INSERT INTO track_detection_rules (track_id, condition, precedence) VALUES
('TECH', '{"role": {"in": ["CIO / CTO", "IT Lead", "Data / AI Lead", "ML Engineer", "Data Engineer", "DevOps Engineer", "Security Architect", "Infrastructure Manager"]}}'::jsonb, 1),
('REG', '{"or": [{"computed.regulated": true}, {"role": {"in": ["Legal / Compliance Lead", "Privacy Officer", "Compliance Manager", "Risk Manager", "Audit Lead", "Governance Officer"]}}]}'::jsonb, 2),
('GEN', '{"default": true}'::jsonb, 3)
ON CONFLICT (track_id, precedence) DO UPDATE SET
  condition = EXCLUDED.condition;

-- Insert computed definitions
INSERT INTO computed_definitions (section_id, field_id, logic, conditions) VALUES
('section_0', 'regulated', 'M4_industry in regulated_industries', '{"regulated_industries": ["Finance & Insurance", "Health Care & Social Assistance", "Utilities (Electricity, Gas, Water & Waste)", "Transportation & Warehousing", "Manufacturing", "Information & Communication Technology", "Professional, Scientific & Technical Services", "Administrative & Support & Waste Management Services", "Accommodation & Food Services"]}'::jsonb),
('section_0', 'track', 'if M3 in tech_roles: return "TECH"; elif computed.regulated or M3 in reg_roles: return "REG"; else: return "GEN"', '{"tech_roles": ["CIO / CTO", "IT Lead", "Data / AI Lead", "ML Engineer", "Data Engineer", "DevOps Engineer", "Security Architect", "Infrastructure Manager"], "reg_roles": ["Legal / Compliance Lead", "Privacy Officer", "Compliance Manager", "Risk Manager", "Audit Lead", "Governance Officer"]}'::jsonb)
ON CONFLICT (section_id, field_id) DO UPDATE SET
  logic = EXCLUDED.logic,
  conditions = EXCLUDED.conditions;

-- Create function to calculate and save assessment scores
CREATE OR REPLACE FUNCTION save_assessment_scores(submission_uuid uuid)
RETURNS void AS $$
DECLARE
    answer_record RECORD;
    section_total numeric := 0;
    question_score numeric := 0;
BEGIN
    -- Calculate scores for each answer
    FOR answer_record IN 
        SELECT a.question_id, a.value, q.score_map, q.section_id
        FROM answers a
        JOIN questions q ON a.question_id = q.id
        WHERE a.submission_id = submission_uuid
    LOOP
        -- Simple scoring logic - can be enhanced based on question type
        question_score := 0;
        
        -- If question has score_map, use it
        IF answer_record.score_map IS NOT NULL THEN
            question_score := COALESCE((answer_record.score_map->>(answer_record.value::text))::numeric, 0);
        ELSE
            -- Default scoring for select questions
            CASE answer_record.value::text
                WHEN 'Yes, comprehensive and well-documented' THEN question_score := 5;
                WHEN 'Yes, but basic/informal' THEN question_score := 4;
                WHEN 'In development' THEN question_score := 3;
                WHEN 'No, but planned' THEN question_score := 2;
                WHEN 'No' THEN question_score := 1;
                WHEN 'Fully aligned with clear vision' THEN question_score := 5;
                WHEN 'Mostly aligned' THEN question_score := 4;
                WHEN 'Somewhat aligned' THEN question_score := 3;
                WHEN 'Limited alignment' THEN question_score := 2;
                WHEN 'No alignment' THEN question_score := 1;
                ELSE question_score := 0;
            END CASE;
        END IF;
        
        -- Insert question score
        INSERT INTO question_scores (submission_id, question_id, score)
        VALUES (submission_uuid, answer_record.question_id, question_score)
        ON CONFLICT (submission_id, question_id) 
        DO UPDATE SET score = EXCLUDED.score;
        
    END LOOP;
    
    -- Calculate section scores
    FOR answer_record IN 
        SELECT DISTINCT q.section_id
        FROM answers a
        JOIN questions q ON a.question_id = q.id
        WHERE a.submission_id = submission_uuid
    LOOP
        SELECT COALESCE(AVG(qs.score), 0) INTO section_total
        FROM question_scores qs
        JOIN questions q ON qs.question_id = q.id
        WHERE qs.submission_id = submission_uuid 
        AND q.section_id = answer_record.section_id;
        
        -- Insert section score
        INSERT INTO section_scores (submission_id, section_id, score)
        VALUES (submission_uuid, answer_record.section_id, section_total)
        ON CONFLICT (submission_id, section_id)
        DO UPDATE SET score = EXCLUDED.score;
    END LOOP;
    
END;
$$ LANGUAGE plpgsql;