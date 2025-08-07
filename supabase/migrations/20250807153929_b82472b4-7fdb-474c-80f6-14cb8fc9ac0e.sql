-- Complete database synchronization with YAML data for profile questions
-- This will fix the critical data mismatch causing "options not available" errors

-- Update M3 (Primary role) with complete 24 roles from YAML
UPDATE questions 
SET options = '[
  {"value": "Founder / CEO", "label": "Founder / CEO", "score": 4, "reasoning": "Senior leadership → high AI influence", "model_input_context": "Respondent is C-level, with strong ability to steer AI strategy."},
  {"value": "C-level executive", "label": "C-level executive", "score": 4, "reasoning": "Senior leadership → high AI influence", "model_input_context": "Respondent is C-level, with strong ability to steer AI strategy."},
  {"value": "Head of Marketing", "label": "Head of Marketing", "score": 2, "reasoning": "Functional leader, some AI exposure", "model_input_context": "Respondent leads marketing—likely some AI use but not core to strategy."},
  {"value": "Head of Sales", "label": "Head of Sales", "score": 2, "reasoning": "Functional leader, some AI exposure", "model_input_context": "Respondent leads sales—likely some AI use but not core to strategy."},
  {"value": "Head of Finance", "label": "Head of Finance", "score": 2, "reasoning": "Functional leader, some AI exposure", "model_input_context": "Respondent leads finance—likely some analytical AI use, but not central."},
  {"value": "Head of Operations", "label": "Head of Operations", "score": 2, "reasoning": "Functional leader, some AI exposure", "model_input_context": "Respondent leads operations—may use process-automation AI, but not core."},
  {"value": "Product Lead", "label": "Product Lead", "score": 3, "reasoning": "Product management often drives AI feature roadmaps", "model_input_context": "Respondent leads product—likely directly engaged in AI/ML features."},
  {"value": "HR Lead", "label": "HR Lead", "score": 1, "reasoning": "Low direct AI influence", "model_input_context": "Respondent leads HR—AI use is typically more limited."},
  {"value": "Customer Support Lead", "label": "Customer Support Lead", "score": 1, "reasoning": "Low direct AI influence", "model_input_context": "Respondent leads support—may use basic AI but not strategic."},
  {"value": "CIO / CTO", "label": "CIO / CTO", "score": 5, "reasoning": "Technical leadership → very high AI influence", "model_input_context": "Respondent is CIO/CTO—primary sponsor for AI infrastructure."},
  {"value": "IT Lead", "label": "IT Lead", "score": 4, "reasoning": "Senior technical role → high AI influence", "model_input_context": "Respondent leads IT—strong role in selecting AI platforms."},
  {"value": "Data / AI Lead", "label": "Data / AI Lead", "score": 5, "reasoning": "Direct AI ownership", "model_input_context": "Respondent is Data/AI Lead—very familiar with AI use-cases."},
  {"value": "ML Engineer", "label": "ML Engineer", "score": 5, "reasoning": "Hands-on AI practitioner", "model_input_context": "Respondent is ML Engineer—deep technical AI expertise."},
  {"value": "Data Engineer", "label": "Data Engineer", "score": 4, "reasoning": "Key enabler of data pipelines for AI", "model_input_context": "Respondent is Data Engineer—critical to AI data readiness."},
  {"value": "DevOps Engineer", "label": "DevOps Engineer", "score": 3, "reasoning": "Supports deployment, less direct strategy", "model_input_context": "Respondent is DevOps—helps productionize AI but not strategic lead."},
  {"value": "Security Architect", "label": "Security Architect", "score": 3, "reasoning": "Enforces governance, moderate AI role", "model_input_context": "Respondent is Security Architect—supports safe AI deployment."},
  {"value": "Infrastructure Manager", "label": "Infrastructure Manager", "score": 3, "reasoning": "Manages platforms, moderate AI role", "model_input_context": "Respondent is Infrastructure Manager—ensures compute for AI."},
  {"value": "Legal / Compliance Lead", "label": "Legal / Compliance Lead", "score": 2, "reasoning": "Governance focus, indirect AI influence", "model_input_context": "Respondent is Legal/Compliance—ensures AI policies but not strategy."},
  {"value": "Privacy Officer", "label": "Privacy Officer", "score": 2, "reasoning": "Governance focus, indirect AI influence", "model_input_context": "Respondent is Privacy Officer—focus on data privacy over AI strategy."},
  {"value": "Compliance Manager", "label": "Compliance Manager", "score": 2, "reasoning": "Governance focus, indirect AI influence", "model_input_context": "Respondent is Compliance Manager—ensures AI compliance but not adoption lead."},
  {"value": "Risk Manager", "label": "Risk Manager", "score": 1, "reasoning": "Risk oversight, limited AI adoption role", "model_input_context": "Respondent is Risk Manager—focuses on risk rather than AI enablement."},
  {"value": "Audit Lead", "label": "Audit Lead", "score": 1, "reasoning": "Audit focus, limited AI adoption role", "model_input_context": "Respondent is Audit Lead—may audit AI but not drive adoption."},
  {"value": "Governance Officer", "label": "Governance Officer", "score": 1, "reasoning": "Governance focus, limited AI adoption role", "model_input_context": "Respondent is Governance Officer—ensures policy, not AI delivery."},
  {"value": "Other", "label": "Other", "score": 2, "reasoning": "Unknown role, moderate default", "model_input_context": "Respondent selected Other role—unclear AI involvement."}
]'::jsonb
WHERE id = 'M3';

-- Update M4_industry with complete 19 industries from YAML
UPDATE questions 
SET options = '[
  {"value": "Agriculture, Forestry & Fishing", "label": "Agriculture, Forestry & Fishing", "score": 2, "reasoning": "Early AI pilots in precision agriculture, but overall low adoption", "model_input_context": "Respondent''s industry is Agriculture—emerging AI use in precision farming."},
  {"value": "Mining & Quarrying", "label": "Mining & Quarrying", "score": 2, "reasoning": "AI used for safety and optimization, but limited breadth", "model_input_context": "Respondent''s industry is Mining—AI adoption growing in safety/optimization."},
  {"value": "Utilities (Electricity, Gas, Water & Waste)", "label": "Utilities (Electricity, Gas, Water & Waste)", "score": 4, "reasoning": "Strong use of AI for grid management, predictive maintenance", "model_input_context": "Respondent''s industry is Utilities—advanced AI for operations and maintenance."},
  {"value": "Construction", "label": "Construction", "score": 1, "reasoning": "Very low AI adoption, mostly manual workflows", "model_input_context": "Respondent''s industry is Construction—very early AI stage."},
  {"value": "Manufacturing", "label": "Manufacturing", "score": 4, "reasoning": "Extensive use of AI/automation in factories and supply chains", "model_input_context": "Respondent''s industry is Manufacturing—high AI maturity in automation."},
  {"value": "Wholesale Trade", "label": "Wholesale Trade", "score": 3, "reasoning": "Moderate AI adoption in inventory and logistics optimization", "model_input_context": "Respondent''s industry is Wholesale—using AI for inventory forecasting."},
  {"value": "Retail Trade", "label": "Retail Trade", "score": 3, "reasoning": "AI used in personalization and demand forecasting, moderate maturity", "model_input_context": "Respondent''s industry is Retail—AI in recommendation engines and forecasting."},
  {"value": "Transportation & Warehousing", "label": "Transportation & Warehousing", "score": 2, "reasoning": "Emerging AI in logistics and route optimization", "model_input_context": "Respondent''s industry is Transportation—AI pilots in routing and warehousing."},
  {"value": "Information & Communication Technology", "label": "Information & Communication Technology", "score": 5, "reasoning": "Leading AI ecosystem with rapid adoption of generative models", "model_input_context": "Respondent''s industry is ICT—very mature AI ecosystem."},
  {"value": "Finance & Insurance", "label": "Finance & Insurance", "score": 5, "reasoning": "High AI adoption in risk modeling, fraud detection", "model_input_context": "Respondent''s industry is Finance—strong AI maturity in analytics."},
  {"value": "Real Estate & Rental & Leasing", "label": "Real Estate & Rental & Leasing", "score": 2, "reasoning": "Limited AI adoption beyond property valuation", "model_input_context": "Respondent''s industry is Real Estate—basic AI in valuation models."},
  {"value": "Professional, Scientific & Technical Services", "label": "Professional, Scientific & Technical Services", "score": 3, "reasoning": "Growing AI adoption for consulting and research automation", "model_input_context": "Respondent''s industry is Professional Services—AI for analysis and automation."},
  {"value": "Administrative & Support & Waste Management", "label": "Administrative & Support & Waste Management", "score": 2, "reasoning": "Limited AI adoption, mostly operational efficiency", "model_input_context": "Respondent''s industry is Admin Services—AI in process optimization."},
  {"value": "Educational Services", "label": "Educational Services", "score": 3, "reasoning": "Growing AI adoption in personalized learning and administration", "model_input_context": "Respondent''s industry is Education—AI for personalized learning."},
  {"value": "Health Care & Social Assistance", "label": "Health Care & Social Assistance", "score": 4, "reasoning": "High AI potential in diagnostics and patient care, regulatory constraints", "model_input_context": "Respondent''s industry is Healthcare—advanced AI but regulatory challenges."},
  {"value": "Arts, Entertainment & Recreation", "label": "Arts, Entertainment & Recreation", "score": 2, "reasoning": "Limited AI adoption, mostly content generation", "model_input_context": "Respondent''s industry is Entertainment—AI in content creation."},
  {"value": "Accommodation & Food Services", "label": "Accommodation & Food Services", "score": 1, "reasoning": "Very low AI adoption, mostly traditional service models", "model_input_context": "Respondent''s industry is Hospitality—minimal AI adoption."},
  {"value": "Other Services (except Public Administration)", "label": "Other Services (except Public Administration)", "score": 2, "reasoning": "Variable AI adoption depending on specific service", "model_input_context": "Respondent''s industry is Other Services—variable AI maturity."},
  {"value": "Public Administration", "label": "Public Administration", "score": 2, "reasoning": "Slow AI adoption due to regulatory and procurement constraints", "model_input_context": "Respondent''s industry is Government—slow AI adoption due to regulations."}
]'::jsonb
WHERE id = 'M4_industry';

-- Update M5_country with comprehensive country list and scoring buckets
UPDATE questions 
SET options = '[
  {"value": "United States", "label": "United States", "score": 5, "reasoning": "AI global leader", "model_input_context": "US market - highest AI maturity and innovation"},
  {"value": "China", "label": "China", "score": 5, "reasoning": "AI global leader", "model_input_context": "Chinese market - major AI investments and rapid adoption"},
  {"value": "United Kingdom", "label": "United Kingdom", "score": 4, "reasoning": "Strong AI ecosystem", "model_input_context": "UK market - strong AI research and financial sector adoption"},
  {"value": "Canada", "label": "Canada", "score": 4, "reasoning": "Strong AI ecosystem", "model_input_context": "Canadian market - strong AI research infrastructure"},
  {"value": "Germany", "label": "Germany", "score": 4, "reasoning": "Strong AI ecosystem", "model_input_context": "German market - industrial AI leadership"},
  {"value": "France", "label": "France", "score": 4, "reasoning": "Strong AI ecosystem", "model_input_context": "French market - government AI initiatives"},
  {"value": "Singapore", "label": "Singapore", "score": 4, "reasoning": "Strong AI ecosystem", "model_input_context": "Singapore market - smart nation AI strategy"},
  {"value": "Israel", "label": "Israel", "score": 4, "reasoning": "Strong AI ecosystem", "model_input_context": "Israeli market - high-tech AI innovation hub"},
  {"value": "South Korea", "label": "South Korea", "score": 4, "reasoning": "Strong AI ecosystem", "model_input_context": "Korean market - tech giants driving AI adoption"},
  {"value": "Japan", "label": "Japan", "score": 4, "reasoning": "Strong AI ecosystem", "model_input_context": "Japanese market - robotics and AI integration"},
  {"value": "Australia", "label": "Australia", "score": 3, "reasoning": "Moderate AI adoption", "model_input_context": "Australian market - growing AI investments"},
  {"value": "Netherlands", "label": "Netherlands", "score": 3, "reasoning": "Moderate AI adoption", "model_input_context": "Dutch market - EU AI hub with good infrastructure"},
  {"value": "Sweden", "label": "Sweden", "score": 3, "reasoning": "Moderate AI adoption", "model_input_context": "Swedish market - strong tech sector"},
  {"value": "Switzerland", "label": "Switzerland", "score": 3, "reasoning": "Moderate AI adoption", "model_input_context": "Swiss market - financial services AI adoption"},
  {"value": "Norway", "label": "Norway", "score": 3, "reasoning": "Moderate AI adoption", "model_input_context": "Norwegian market - oil and energy AI applications"},
  {"value": "Denmark", "label": "Denmark", "score": 3, "reasoning": "Moderate AI adoption", "model_input_context": "Danish market - digital government initiatives"},
  {"value": "Finland", "label": "Finland", "score": 3, "reasoning": "Moderate AI adoption", "model_input_context": "Finnish market - Nokia legacy and AI education"},
  {"value": "Austria", "label": "Austria", "score": 3, "reasoning": "Moderate AI adoption", "model_input_context": "Austrian market - industrial automation"},
  {"value": "Belgium", "label": "Belgium", "score": 3, "reasoning": "Moderate AI adoption", "model_input_context": "Belgian market - EU headquarters with AI initiatives"},
  {"value": "Ireland", "label": "Ireland", "score": 3, "reasoning": "Moderate AI adoption", "model_input_context": "Irish market - tech hub for multinationals"},
  {"value": "New Zealand", "label": "New Zealand", "score": 3, "reasoning": "Moderate AI adoption", "model_input_context": "New Zealand market - agricultural AI applications"},
  {"value": "Italy", "label": "Italy", "score": 2, "reasoning": "Limited AI adoption", "model_input_context": "Italian market - slower AI adoption in traditional industries"},
  {"value": "Spain", "label": "Spain", "score": 2, "reasoning": "Limited AI adoption", "model_input_context": "Spanish market - emerging AI sector"},
  {"value": "Portugal", "label": "Portugal", "score": 2, "reasoning": "Limited AI adoption", "model_input_context": "Portuguese market - growing startup ecosystem"},
  {"value": "Poland", "label": "Poland", "score": 2, "reasoning": "Limited AI adoption", "model_input_context": "Polish market - emerging tech sector"},
  {"value": "Czech Republic", "label": "Czech Republic", "score": 2, "reasoning": "Limited AI adoption", "model_input_context": "Czech market - developing AI capabilities"},
  {"value": "Hungary", "label": "Hungary", "score": 2, "reasoning": "Limited AI adoption", "model_input_context": "Hungarian market - automotive industry automation"},
  {"value": "Greece", "label": "Greece", "score": 2, "reasoning": "Limited AI adoption", "model_input_context": "Greek market - early AI development stage"},
  {"value": "Brazil", "label": "Brazil", "score": 2, "reasoning": "Limited AI adoption", "model_input_context": "Brazilian market - financial services AI growth"},
  {"value": "Mexico", "label": "Mexico", "score": 2, "reasoning": "Limited AI adoption", "model_input_context": "Mexican market - manufacturing automation"},
  {"value": "India", "label": "India", "score": 2, "reasoning": "Limited AI adoption", "model_input_context": "Indian market - large IT services but uneven AI adoption"},
  {"value": "Russia", "label": "Russia", "score": 2, "reasoning": "Limited AI adoption", "model_input_context": "Russian market - state-led AI initiatives"},
  {"value": "Turkey", "label": "Turkey", "score": 2, "reasoning": "Limited AI adoption", "model_input_context": "Turkish market - emerging AI ecosystem"},
  {"value": "Argentina", "label": "Argentina", "score": 1, "reasoning": "Early stage AI adoption", "model_input_context": "Argentine market - limited AI infrastructure"},
  {"value": "Chile", "label": "Chile", "score": 1, "reasoning": "Early stage AI adoption", "model_input_context": "Chilean market - mining industry automation"},
  {"value": "Colombia", "label": "Colombia", "score": 1, "reasoning": "Early stage AI adoption", "model_input_context": "Colombian market - developing AI capabilities"},
  {"value": "Peru", "label": "Peru", "score": 1, "reasoning": "Early stage AI adoption", "model_input_context": "Peruvian market - limited AI adoption"},
  {"value": "South Africa", "label": "South Africa", "score": 1, "reasoning": "Early stage AI adoption", "model_input_context": "South African market - emerging AI sector"},
  {"value": "Nigeria", "label": "Nigeria", "score": 1, "reasoning": "Early stage AI adoption", "model_input_context": "Nigerian market - growing fintech AI"},
  {"value": "Egypt", "label": "Egypt", "score": 1, "reasoning": "Early stage AI adoption", "model_input_context": "Egyptian market - early AI development"},
  {"value": "Kenya", "label": "Kenya", "score": 1, "reasoning": "Early stage AI adoption", "model_input_context": "Kenyan market - mobile money AI applications"},
  {"value": "Morocco", "label": "Morocco", "score": 1, "reasoning": "Early stage AI adoption", "model_input_context": "Moroccan market - emerging tech sector"},
  {"value": "Ukraine", "label": "Ukraine", "score": 1, "reasoning": "Early stage AI adoption", "model_input_context": "Ukrainian market - IT outsourcing with AI potential"},
  {"value": "Saudi Arabia", "label": "Saudi Arabia", "score": 2, "reasoning": "Limited AI adoption", "model_input_context": "Saudi market - Vision 2030 AI investments"},
  {"value": "United Arab Emirates", "label": "United Arab Emirates", "score": 2, "reasoning": "Limited AI adoption", "model_input_context": "UAE market - smart city AI initiatives"},
  {"value": "Hong Kong", "label": "Hong Kong", "score": 3, "reasoning": "Moderate AI adoption", "model_input_context": "Hong Kong market - financial AI hub"},
  {"value": "Taiwan", "label": "Taiwan", "score": 3, "reasoning": "Moderate AI adoption", "model_input_context": "Taiwanese market - semiconductor AI applications"},
  {"value": "Malaysia", "label": "Malaysia", "score": 2, "reasoning": "Limited AI adoption", "model_input_context": "Malaysian market - digital transformation initiatives"},
  {"value": "Thailand", "label": "Thailand", "score": 2, "reasoning": "Limited AI adoption", "model_input_context": "Thai market - manufacturing automation"},
  {"value": "Vietnam", "label": "Vietnam", "score": 2, "reasoning": "Limited AI adoption", "model_input_context": "Vietnamese market - growing tech outsourcing"},
  {"value": "Philippines", "label": "Philippines", "score": 1, "reasoning": "Early stage AI adoption", "model_input_context": "Philippine market - BPO sector AI adoption"},
  {"value": "Indonesia", "label": "Indonesia", "score": 1, "reasoning": "Early stage AI adoption", "model_input_context": "Indonesian market - fintech AI growth"},
  {"value": "Other", "label": "Other", "score": 2, "reasoning": "Unknown region, moderate default", "model_input_context": "Other country - variable AI maturity"}
]'::jsonb
WHERE id = 'M5_country';