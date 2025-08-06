-- Update existing assessment with missing data
UPDATE assessments 
SET 
  size_breakpoints = '{"micro": "1-9", "small": "10-49", "medium": "50-249", "large": "250-999", "enterprise": "1000+"}'::jsonb,
  question_cap = '{"max_questions": 60, "auto_hide": ["D2", "P6"]}'::jsonb
WHERE id = 'ai_readiness_v2';

-- Clear and insert sections (simpler approach)
DELETE FROM sections WHERE assessment_id = 'ai_readiness_v2';
INSERT INTO sections (id, assessment_id, title, purpose, category, sequence) VALUES
('section_0', 'ai_readiness_v2', 'Organization Profile', 'Collect organization profile for track detection and personalized recommendations.', NULL, 0),
('section_1', 'ai_readiness_v2', 'Strategic Planning', 'Assess strategic alignment & planning maturity.', 'strategy', 1),
('section_2', 'ai_readiness_v2', 'Financial & Regulatory', 'Budget, runway, investor support, compliance.', NULL, 2),
('section_3', 'ai_readiness_v2', 'Data Foundation', 'Data foundation, security, ethics, compliance.', 'data', 3),
('section_4', 'ai_readiness_v2', 'Tools & Infrastructure', 'Platform maturity & technical capabilities.', 'tools', 4),
('section_5', 'ai_readiness_v2', 'Automation & Processes', 'Process maturity & automation readiness.', 'automation', 5),
('section_6', 'ai_readiness_v2', 'People & Skills', 'Team capabilities & organizational culture.', 'people', 6),
('section_7', 'ai_readiness_v2', 'Governance & Ethics', 'Risk management & ethical framework.', 'governance', 7);

-- Clear and insert questions
DELETE FROM questions WHERE assessment_id = 'ai_readiness_v2';
INSERT INTO questions (id, assessment_id, section_id, text, type, sequence, required, options) VALUES
-- Organization Profile questions
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
]'::jsonb),
-- Strategic Planning questions
('S1', 'ai_readiness_v2', 'section_1', 'Does your organization have a formal AI strategy?', 'select', 1, true, '[
  "Yes, comprehensive and well-documented", "Yes, but basic/informal", "In development", "No, but planned", "No"
]'::jsonb),
('S2', 'ai_readiness_v2', 'section_1', 'How aligned is leadership on AI priorities?', 'select', 2, true, '[
  "Fully aligned with clear vision", "Mostly aligned", "Somewhat aligned", "Limited alignment", "No alignment"
]'::jsonb),
('S3', 'ai_readiness_v2', 'section_1', 'What is your primary AI objective?', 'select', 3, true, '[
  "Operational efficiency", "Revenue growth", "Customer experience", "Risk reduction", "Innovation/competitive advantage", "Cost reduction"
]'::jsonb);

-- Clear and insert consent banners
DELETE FROM consent_banners WHERE section_id = 'section_0';
INSERT INTO consent_banners (section_id, text, required) VALUES
('section_0', 'By proceeding, you agree to process your data for this readiness report and related communications.', true);

-- Clear and insert track detection rules
DELETE FROM track_detection_rules;
INSERT INTO track_detection_rules (track_id, condition, precedence) VALUES
('TECH', '{"role": {"in": ["CIO / CTO", "IT Lead", "Data / AI Lead", "ML Engineer", "Data Engineer", "DevOps Engineer", "Security Architect", "Infrastructure Manager"]}}'::jsonb, 1),
('REG', '{"or": [{"computed.regulated": true}, {"role": {"in": ["Legal / Compliance Lead", "Privacy Officer", "Compliance Manager", "Risk Manager", "Audit Lead", "Governance Officer"]}}]}'::jsonb, 2),
('GEN', '{"default": true}'::jsonb, 3);

-- Clear and insert computed definitions
DELETE FROM computed_definitions WHERE section_id = 'section_0';
INSERT INTO computed_definitions (section_id, field_id, logic, conditions) VALUES
('section_0', 'regulated', 'M4_industry in regulated_industries', '{"regulated_industries": ["Finance & Insurance", "Health Care & Social Assistance", "Utilities (Electricity, Gas, Water & Waste)", "Transportation & Warehousing", "Manufacturing", "Information & Communication Technology", "Professional, Scientific & Technical Services", "Administrative & Support & Waste Management Services", "Accommodation & Food Services"]}'::jsonb),
('section_0', 'track', 'if M3 in tech_roles: return "TECH"; elif computed.regulated or M3 in reg_roles: return "REG"; else: return "GEN"', '{"tech_roles": ["CIO / CTO", "IT Lead", "Data / AI Lead", "ML Engineer", "Data Engineer", "DevOps Engineer", "Security Architect", "Infrastructure Manager"], "reg_roles": ["Legal / Compliance Lead", "Privacy Officer", "Compliance Manager", "Risk Manager", "Audit Lead", "Governance Officer"]}'::jsonb);