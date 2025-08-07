-- Update questions table to sync with YAML data
-- Fix M3 - Role question
UPDATE public.questions 
SET options = '[
  {"value": "CEO", "label": "CEO"},
  {"value": "CTO", "label": "CTO"},
  {"value": "CDO", "label": "CDO"},
  {"value": "VP_Engineering", "label": "VP Engineering"},
  {"value": "Head_of_Data", "label": "Head of Data"},
  {"value": "Product_Manager", "label": "Product Manager"},
  {"value": "Data_Scientist", "label": "Data Scientist"},
  {"value": "Software_Engineer", "label": "Software Engineer"},
  {"value": "Other", "label": "Other"}
]'::jsonb
WHERE id = 'M3';

-- Fix M4_industry - Industry question
UPDATE public.questions 
SET options = '[
  {"value": "Technology", "label": "Technology"},
  {"value": "Healthcare", "label": "Healthcare"},
  {"value": "Finance", "label": "Finance"},
  {"value": "Manufacturing", "label": "Manufacturing"},
  {"value": "Retail", "label": "Retail"},
  {"value": "Education", "label": "Education"},
  {"value": "Government", "label": "Government"},
  {"value": "Energy", "label": "Energy"},
  {"value": "Transportation", "label": "Transportation"},
  {"value": "Media", "label": "Media"},
  {"value": "Real_Estate", "label": "Real Estate"},
  {"value": "Agriculture", "label": "Agriculture"},
  {"value": "Other", "label": "Other"}
]'::jsonb
WHERE id = 'M4_industry';

-- Fix M5_country - Country question with major countries
UPDATE public.questions 
SET options = '[
  {"value": "United States", "label": "United States"},
  {"value": "Canada", "label": "Canada"},
  {"value": "United Kingdom", "label": "United Kingdom"},
  {"value": "Germany", "label": "Germany"},
  {"value": "France", "label": "France"},
  {"value": "Spain", "label": "Spain"},
  {"value": "Italy", "label": "Italy"},
  {"value": "Netherlands", "label": "Netherlands"},
  {"value": "Sweden", "label": "Sweden"},
  {"value": "Norway", "label": "Norway"},
  {"value": "Denmark", "label": "Denmark"},
  {"value": "Finland", "label": "Finland"},
  {"value": "Switzerland", "label": "Switzerland"},
  {"value": "Austria", "label": "Austria"},
  {"value": "Belgium", "label": "Belgium"},
  {"value": "Ireland", "label": "Ireland"},
  {"value": "Portugal", "label": "Portugal"},
  {"value": "Poland", "label": "Poland"},
  {"value": "Czech Republic", "label": "Czech Republic"},
  {"value": "Hungary", "label": "Hungary"},
  {"value": "Greece", "label": "Greece"},
  {"value": "Australia", "label": "Australia"},
  {"value": "New Zealand", "label": "New Zealand"},
  {"value": "Japan", "label": "Japan"},
  {"value": "South Korea", "label": "South Korea"},
  {"value": "China", "label": "China"},
  {"value": "India", "label": "India"},
  {"value": "Singapore", "label": "Singapore"},
  {"value": "Hong Kong", "label": "Hong Kong"},
  {"value": "Taiwan", "label": "Taiwan"},
  {"value": "Malaysia", "label": "Malaysia"},
  {"value": "Thailand", "label": "Thailand"},
  {"value": "Vietnam", "label": "Vietnam"},
  {"value": "Philippines", "label": "Philippines"},
  {"value": "Indonesia", "label": "Indonesia"},
  {"value": "Brazil", "label": "Brazil"},
  {"value": "Mexico", "label": "Mexico"},
  {"value": "Argentina", "label": "Argentina"},
  {"value": "Chile", "label": "Chile"},
  {"value": "Colombia", "label": "Colombia"},
  {"value": "Peru", "label": "Peru"},
  {"value": "South Africa", "label": "South Africa"},
  {"value": "Nigeria", "label": "Nigeria"},
  {"value": "Egypt", "label": "Egypt"},
  {"value": "Kenya", "label": "Kenya"},
  {"value": "Morocco", "label": "Morocco"},
  {"value": "Israel", "label": "Israel"},
  {"value": "UAE", "label": "United Arab Emirates"},
  {"value": "Saudi Arabia", "label": "Saudi Arabia"},
  {"value": "Turkey", "label": "Turkey"},
  {"value": "Russia", "label": "Russia"},
  {"value": "Ukraine", "label": "Ukraine"},
  {"value": "Other", "label": "Other"}
]'::jsonb
WHERE id = 'M5_country';

-- Fix M6_size - Company size question
UPDATE public.questions 
SET options = '[
  {"value": "1-10", "label": "1-10 employees", "score": 2},
  {"value": "11-50", "label": "11-50 employees", "score": 3},
  {"value": "51-200", "label": "51-200 employees", "score": 3},
  {"value": "201-1000", "label": "201-1,000 employees", "score": 4},
  {"value": "1001-5000", "label": "1,001-5,000 employees", "score": 4},
  {"value": "5000+", "label": "5,000+ employees", "score": 5}
]'::jsonb
WHERE id = 'M6_size';

-- Fix M7_revenue - Annual revenue question
UPDATE public.questions 
SET options = '[
  {"value": "under_1m", "label": "Under $1M", "score": 2},
  {"value": "1m_10m", "label": "$1M - $10M", "score": 3},
  {"value": "10m_50m", "label": "$10M - $50M", "score": 3},
  {"value": "50m_100m", "label": "$50M - $100M", "score": 4},
  {"value": "100m_500m", "label": "$100M - $500M", "score": 4},
  {"value": "500m_1b", "label": "$500M - $1B", "score": 5},
  {"value": "over_1b", "label": "Over $1B", "score": 5}
]'::jsonb
WHERE id = 'M7_revenue';