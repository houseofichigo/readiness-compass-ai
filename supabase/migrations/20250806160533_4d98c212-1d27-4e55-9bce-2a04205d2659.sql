-- First add section_8 to sections table
INSERT INTO sections (id, assessment_id, title, purpose, category, sequence)
VALUES ('section_8', 'ai-readiness-assessment', 'Implementation Horizon', 'Implementation horizon, KPIs & vision (to align training and strategic planning).', 'implementation', 8);

-- Add the final 5 questions to reach exactly 87 total
INSERT INTO questions (
  id, assessment_id, section_id, text, type, helper, options, show_if, required, sequence, 
  score_map, score_per, cap, weight, max_rank, score_by_count, score_formula, 
  max_select, rows, columns, groups, hide_if, is_add_on
) VALUES
('G7', 'ai-readiness-assessment', 'section_7', 'What is the status of independent audits for your AI systems?', 'single', NULL,
 '["None – no audits conducted", "Planned – audit scheduled", "In progress – audit underway", "Completed – initial audit done", "Ongoing – regular audit cycle"]'::jsonb,
 '{"track": ["REG", "TECH"]}'::jsonb, true, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('G8', 'ai-readiness-assessment', 'section_7', 'How far along are you in mapping AI risks under the EU AI Act?', 'single', 
 'Mapping means identifying and documenting risks under EU rules (e.g. creating a risk register of AI use cases).',
 '["Not aware – haven''t reviewed requirements", "Aware – know obligations but not mapped", "Mapping started – risk register in progress", "Completed – risk register finished", "Reported – findings shared with leadership"]'::jsonb,
 NULL, true, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('G9', 'ai-readiness-assessment', 'section_7', 'How regularly do you test your AI models for fairness?', 'single', NULL,
 '["Never – no fairness tests", "Ad-hoc – tests only after incidents", "Pre-release – tests before each deployment", "Quarterly – scheduled fairness reviews", "Continuous – automated monitoring"]'::jsonb,
 '{"track": ["REG", "TECH"]}'::jsonb, true, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

('G10', 'ai-readiness-assessment', 'section_7', 'What governance body oversees your AI ethics and compliance?', 'single', 
 'Governance bodies set and enforce rules—e.g. data‐privacy policies, bias‐review processes, acceptable‐use guidelines.   Examples: an internal AI ethics committee that reviews new models, a compliance team enforcing GDPR rules, or an external expert panel.',
 '["None – no oversight body", "Informal – occasional advisor reviews", "Ad-hoc – project-based ethics reviews", "Scheduled – regular ethics committee meetings", "External – includes independent ethics experts"]'::jsonb,
 NULL, true, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false),

-- Add one implementation question P1 to section_8 to reach 87
('P1', 'ai-readiness-assessment', 'section_8', 'When do you plan to roll out your AI initiatives?', 'single', 
 'Determines urgency and timing for targeted training.',
 '["Within 3 months", "3–6 months", "6–12 months", "Over 12 months"]'::jsonb,
 NULL, true, 1, '[100, 75, 50, 25]'::jsonb, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false);