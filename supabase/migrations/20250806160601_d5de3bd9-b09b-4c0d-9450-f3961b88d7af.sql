-- Add only the missing governance questions to reach 87 total

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

-- Add one more question to reach 87 - P7 from section_8
('P7', 'ai-readiness-assessment', 'section_8', 'How significant of an organizational change are you prepared for to adopt AI?', 'single', 
 'Matches change-management training to readiness level.',
 '["Minimal changes", "Minor tweaks", "Moderate transformation", "Major transformation", "Continuous evolution"]'::jsonb,
 NULL, true, 7, '[0, 25, 50, 75, 100]'::jsonb, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false);