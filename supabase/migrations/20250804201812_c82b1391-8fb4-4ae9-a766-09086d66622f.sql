-- Seed data for assessment configuration

-- Insert assessment metadata
INSERT INTO assessments (id, version, locale_default, max_visible_questions) VALUES 
('ai_readiness_v2', '2.0', 'en', 60)
ON CONFLICT (id) DO NOTHING;

-- Insert tracks
INSERT INTO tracks (id, label) VALUES 
('TECH', 'Technical / Data-Lead'),
('REG', 'Regulated / Compliance-Heavy'),
('GEN', 'General / Business-Lead')
ON CONFLICT (id) DO NOTHING;

-- Insert track weights
INSERT INTO track_weights (track_id, strategy, data, tools, automation, people, governance) VALUES 
('TECH', 15, 25, 25, 20, 10, 5),
('REG', 15, 20, 15, 15, 15, 20),
('GEN', 20, 20, 20, 15, 15, 10)
ON CONFLICT (track_id) DO NOTHING;

-- Insert some basic track detection rules
INSERT INTO track_detection_rules (precedence, condition, track_id) VALUES 
(1, '{"M3": ["Data Scientist", "Data Engineer", "AI Engineer", "Machine Learning Engineer"]}', 'TECH'),
(2, '{"M3": ["Compliance Officer", "Legal Counsel", "Risk Manager"]}', 'REG'),
(3, '{"regulated": true}', 'REG'),
(10, '{}', 'GEN')
ON CONFLICT (id) DO NOTHING;