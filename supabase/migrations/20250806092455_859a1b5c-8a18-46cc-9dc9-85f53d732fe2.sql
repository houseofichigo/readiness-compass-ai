-- Add remaining questions for section 1 (Strategic Planning)
INSERT INTO questions (id, assessment_id, section_id, text, type, sequence, required, options, score_map, helper, max_rank, weight) VALUES
('S2_conditional', 'ai_readiness_v2', 'section_1', 'How do you decide which AI opportunities to pursue first?', 'select', 4, true, '["No formal process", "Ad hoc based on perceived value", "Impact × Effort matrix", "Impact × Effort + capacity weighting", "ROI-driven financial model", "Risk-adjusted prioritization"]'::jsonb, NULL, 'Select the process you currently use.', NULL, NULL),
('S3_conditional', 'ai_readiness_v2', 'section_1', 'How integrated are your AI performance metrics with corporate KPIs or OKRs?', 'select', 5, true, '["No AI KPIs/OKRs defined", "KPIs drafted but not tracked", "KPIs tracked but not linked", "Partially aligned with departmental OKRs", "Fully embedded in executive OKRs"]'::jsonb, NULL, NULL, NULL, NULL),
('S4', 'ai_readiness_v2', 'section_1', 'How do you estimate ROI for AI projects?', 'select', 6, true, '["Don''t estimate ROI", "Rough experience-based estimates", "Simple cost–benefit analysis", "Linked ROI to clear KPIs and goals", "Detailed financial or risk-adjusted models"]'::jsonb, NULL, 'Choose the method that matches your current practice.', NULL, NULL),
('S5', 'ai_readiness_v2', 'section_1', 'What is your typical time from idea to measurable AI impact?', 'select', 7, true, '["Over 12 months", "6–12 months", "3–6 months", "1–3 months", "Under 30 days"]'::jsonb, '[0,25,50,75,100]'::jsonb, NULL, NULL, NULL),
('S6', 'ai_readiness_v2', 'section_1', 'How do you monitor competitor or industry AI developments?', 'select', 8, true, '["Not tracked", "Occasional ad hoc research", "Annual review", "Quarterly reporting", "Continuous dashboard or feed"]'::jsonb, NULL, NULL, NULL, NULL),
('S7', 'ai_readiness_v2', 'section_1', 'Rank your top four strategic objectives for AI initiatives', 'rank', 9, true, '["Productivity", "Cost reduction", "Revenue growth", "Customer experience", "Innovation", "Regulatory compliance", "Investor positioning"]'::jsonb, NULL, NULL, 4, '[40, 30, 20, 10]'::jsonb),
('S8', 'ai_readiness_v2', 'section_1', 'How aligned is your leadership team on AI strategy?', 'select', 10, true, '["No alignment", "Occasional discussions", "Executive interest without action", "Budget approved", "Active executive sponsorship"]'::jsonb, '[0,25,50,75,100]'::jsonb, NULL, NULL, NULL),
('S9', 'ai_readiness_v2', 'section_1', 'Which teams are involved in defining AI use cases?', 'multi_select', 11, true, '["Executive leadership", "Product & marketing", "Operations", "Data & IT", "Legal & compliance", "HR", "Finance", "Customer support"]'::jsonb, NULL, NULL, NULL, NULL),
('S10', 'ai_readiness_v2', 'section_1', 'How prepared is your organization to manage change from AI adoption?', 'select', 12, true, '["Not prepared", "Ad hoc readiness", "Formal process for some projects", "Organization-wide framework", "Continuous improvement culture"]'::jsonb, '[0,25,50,75,100]'::jsonb, NULL, NULL, NULL),
('S11', 'ai_readiness_v2', 'section_1', 'How clear are the goals and metrics for your AI use cases?', 'select', 13, true, '["No clear goals", "Goals defined with no metrics", "Some metrics tracked", "Most goals with metrics", "All goals have metrics and thresholds"]'::jsonb, '[0,25,50,75,100]'::jsonb, NULL, NULL, NULL),
('S12', 'ai_readiness_v2', 'section_1', 'What best describes your approach to piloting and deploying AI projects?', 'select', 14, true, '["POC only with strict compliance checks", "Small pilots with controlled access", "Case-by-case security review for deployments", "Agile testing with integrated oversight", "Fast iterations with production readiness and risk management"]'::jsonb, '[0,25,50,75,100]'::jsonb, NULL, NULL, NULL);

-- Update the organization profile questions to match the YAML structure
UPDATE questions SET text = 'Organization name' WHERE id = 'M1';
UPDATE questions SET 
  text = 'Full name',
  type = 'text'
WHERE id = 'M2';

-- Insert missing organization profile questions
INSERT INTO questions (id, assessment_id, section_id, text, type, sequence, required, helper) VALUES
('M0', 'ai_readiness_v2', 'section_0', 'Organization name', 'text', 0, true, NULL),
('M2_email', 'ai_readiness_v2', 'section_0', 'Business e-mail', 'email', 3, true, 'Use your work address (no Gmail, Hotmail, etc.)');

-- Update M3 to match YAML
UPDATE questions SET 
  text = 'Primary role',
  helper = 'Determines your recommendation track.',
  options = '["Founder / CEO", "C-level executive", "Head of Marketing", "Head of Sales", "Head of Finance", "Head of Operations", "Product Lead", "HR Lead", "Customer Support Lead", "CIO / CTO", "IT Lead", "Data / AI Lead", "ML Engineer", "Data Engineer", "DevOps Engineer", "Security Architect", "Infrastructure Manager", "Legal / Compliance Lead", "Privacy Officer", "Compliance Manager", "Risk Manager", "Audit Lead", "Governance Officer"]'::jsonb
WHERE id = 'M3';

-- Update the rest to match YAML
UPDATE questions SET 
  id = 'M4_industry',
  text = 'Industry & sub-sector',
  type = 'dropdown'
WHERE id = 'M4';

INSERT INTO questions (id, assessment_id, section_id, text, type, sequence, required, options) VALUES
('M5_country', 'ai_readiness_v2', 'section_0', 'Country', 'dropdown', 5, true, '["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Brazzaville)", "Costa Rica", "Côte d''Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Palestine", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "São Tomé and Príncipe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]'::jsonb),
('M6_size', 'ai_readiness_v2', 'section_0', 'Company size (FTE)', 'select', 6, true, '["1–9", "10–49", "50–249", "250–999", "≥ 1 000", "Prefer not to say"]'::jsonb),
('M7_revenue', 'ai_readiness_v2', 'section_0', 'Annual revenue', 'select', 7, true, '["< €250 k", "€250 k–1 M", "€1 M–€5 M", "€5 M–€20 M", "€20 M–€100 M", "> €100 M", "Prefer not to say"]'::jsonb);