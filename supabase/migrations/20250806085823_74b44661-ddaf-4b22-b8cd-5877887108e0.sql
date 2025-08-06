-- Populate assessments table
INSERT INTO assessments (id, version, locale_default, max_visible_questions, size_breakpoints, question_cap) 
VALUES (
  'ai_readiness_v2',
  '2.0',
  'en',
  60,
  '{"micro": "1-9", "small": "10-49", "medium": "50-249", "large": "250-999", "enterprise": "1000+"}'::jsonb,
  '{"max_questions": 60, "auto_hide": ["D2", "P6"]}'::jsonb
);

-- Populate sections table
INSERT INTO sections (id, assessment_id, title, purpose, category, sequence) VALUES
('section_0', 'ai_readiness_v2', 'Organization Profile', 'Collect organization profile for track detection and personalized recommendations.', NULL, 0),
('section_1', 'ai_readiness_v2', 'Strategic Planning', 'Assess strategic alignment & planning maturity.', 'strategy', 1),
('section_2', 'ai_readiness_v2', 'Financial & Regulatory', 'Budget, runway, investor support, compliance.', NULL, 2),
('section_3', 'ai_readiness_v2', 'Data Foundation', 'Data foundation, security, ethics, compliance.', 'data', 3),
('section_4', 'ai_readiness_v2', 'Tools & Infrastructure', 'Platform maturity & technical capabilities.', 'tools', 4),
('section_5', 'ai_readiness_v2', 'Automation & Processes', 'Process maturity & automation readiness.', 'automation', 5),
('section_6', 'ai_readiness_v2', 'People & Skills', 'Team capabilities & organizational culture.', 'people', 6),
('section_7', 'ai_readiness_v2', 'Governance & Ethics', 'Risk management & ethical framework.', 'governance', 7);

-- Populate consent banners table
INSERT INTO consent_banners (section_id, text, required) VALUES
('section_0', 'By proceeding, you agree to process your data for this readiness report and related communications.', true);

-- Populate track detection rules
INSERT INTO track_detection_rules (track_id, condition, precedence) VALUES
('TECH', '{"role": {"in": ["CIO / CTO", "IT Lead", "Data / AI Lead", "ML Engineer", "Data Engineer", "DevOps Engineer", "Security Architect", "Infrastructure Manager"]}}'::jsonb, 1),
('REG', '{"or": [{"computed.regulated": true}, {"role": {"in": ["Legal / Compliance Lead", "Privacy Officer", "Compliance Manager", "Risk Manager", "Audit Lead", "Governance Officer"]}}]}'::jsonb, 2),
('GEN', '{"default": true}'::jsonb, 3);

-- Populate computed definitions
INSERT INTO computed_definitions (section_id, field_id, logic, conditions) VALUES
('section_0', 'regulated', 'M4_industry in regulated_industries', '{"regulated_industries": ["Finance & Insurance", "Health Care & Social Assistance", "Utilities (Electricity, Gas, Water & Waste)", "Transportation & Warehousing", "Manufacturing", "Information & Communication Technology", "Professional, Scientific & Technical Services", "Administrative & Support & Waste Management Services", "Accommodation & Food Services"]}'::jsonb),
('section_0', 'track', 'if M3 in tech_roles: return "TECH"; elif computed.regulated or M3 in reg_roles: return "REG"; else: return "GEN"', '{"tech_roles": ["CIO / CTO", "IT Lead", "Data / AI Lead", "ML Engineer", "Data Engineer", "DevOps Engineer", "Security Architect", "Infrastructure Manager"], "reg_roles": ["Legal / Compliance Lead", "Privacy Officer", "Compliance Manager", "Risk Manager", "Audit Lead", "Governance Officer"]}'::jsonb);