import { Section, Question } from "@/types/assessment";

// Complete assessment sections from YAML - ALL QUESTIONS INCLUDED
const assessmentSections: Section[] = [
  {
    id: 'section_0',
    title: 'Organization Profile',
    purpose: 'Collect organisation profile for track detection.',
    questions: [
      {
        id: 'M0',
        text: 'Company Name',
        type: 'text',
        required: true
      },
      {
        id: 'M1',
        text: 'Full name',
        type: 'text',
        required: true
      },
      {
        id: 'M2',
        text: 'Work e-mail',
        type: 'email',
        required: true
      },
      {
        id: 'M3',
        text: 'Role / Position',
        type: 'single',
        required: true,
        options: [
          { value: 'Founder/CEO', label: 'Founder/CEO' },
          { value: 'C-level', label: 'C-level' },
          { value: 'CIO/CTO', label: 'CIO/CTO' },
          { value: 'Head Marketing', label: 'Head Marketing' },
          { value: 'Head Sales', label: 'Head Sales' },
          { value: 'Head Finance', label: 'Head Finance' },
          { value: 'Head Ops', label: 'Head Ops' },
          { value: 'Legal/Compliance', label: 'Legal/Compliance' },
          { value: 'IT Lead', label: 'IT Lead' },
          { value: 'Data/AI Lead', label: 'Data/AI Lead' },
          { value: 'Product Lead', label: 'Product Lead' },
          { value: 'HR Lead', label: 'HR Lead' },
          { value: 'Customer Support Lead', label: 'Customer Support Lead' },
          { value: 'Other', label: 'Other' }
        ]
      },
      {
        id: 'M4',
        text: 'Department',
        type: 'single',
        required: true,
        options: [
          { value: 'Marketing', label: 'Marketing' },
          { value: 'Sales', label: 'Sales' },
          { value: 'Finance', label: 'Finance' },
          { value: 'Operations/Logistics', label: 'Operations/Logistics' },
          { value: 'IT', label: 'IT' },
          { value: 'HR', label: 'HR' },
          { value: 'Product', label: 'Product' },
          { value: 'Customer Support', label: 'Customer Support' },
          { value: 'General management', label: 'General management' },
          { value: 'Multiple', label: 'Multiple' },
          { value: 'Other', label: 'Other' }
        ]
      },
      {
        id: 'M5',
        text: 'Industry & Sub-sector',
        type: 'industry_dropdown',
        required: true,
        helper: 'Select your primary industry sector'
      },
      {
        id: 'M6',
        text: 'Country',
        type: 'country_dropdown',
        required: true
      },
      {
        id: 'M7',
        text: 'Company size (FTE)',
        type: 'single',
        required: true,
        options: [
          { value: '1-9', label: '1-9' },
          { value: '10-49', label: '10-49' },
          { value: '50-249', label: '50-249' },
          { value: '250-999', label: '250-999' },
          { value: '≥ 1 000', label: '≥ 1 000' }
        ]
      },
      {
        id: 'M8',
        text: 'Annual revenue',
        type: 'single',
        required: true,
        options: [
          { value: '< €250 k', label: '< €250 k' },
          { value: '€250 k–1 M', label: '€250 k–1 M' },
          { value: '1–5 M', label: '1–5 M' },
          { value: '5–20 M', label: '5–20 M' },
          { value: '20–100 M', label: '20–100 M' },
          { value: '> 100 M', label: '> 100 M' },
          { value: 'Prefer not to say', label: 'Prefer not to say' }
        ]
      },
      {
        id: 'M9',
        text: 'Is your organisation in a regulated industry?',
        type: 'single',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
          { value: 'Not sure', label: 'Not sure' }
        ]
      },
      {
        id: 'M10',
        text: 'I agree to processing my data for the readiness report and related communications.',
        type: 'checkbox',
        required: true
      }
    ]
  },
  {
    id: 'section_1',
    title: 'Strategy & Use-Case Readiness',
    purpose: 'Assess strategic alignment & planning maturity.',
    questions: [
      {
        id: 'S1',
        text: 'Have you listed AI opportunities to launch within 12 months?',
        type: 'single',
        required: true,
        options: [
          { value: 'None', label: 'None' },
          { value: 'Idea list only', label: 'Idea list only' },
          { value: '1–2 documented use-cases', label: '1–2 documented use-cases' },
          { value: '3–5 prioritised w/owners', label: '3–5 prioritised w/owners' },
          { value: '≥ 6 with owner & timeline', label: '≥ 6 with owner & timeline' }
        ]
      },
      {
        id: 'S6',
        text: 'How do you track competitor or industry AI activity?',
        type: 'single',
        required: false,
        options: [
          { value: 'Not tracked', label: 'Not tracked' },
          { value: 'Occasional look-ups', label: 'Occasional look-ups' },
          { value: 'Annual review', label: 'Annual review' },
          { value: 'Quarterly reporting', label: 'Quarterly reporting' },
          { value: 'Continuous dashboard/feed', label: 'Continuous dashboard/feed' }
        ]
      },
      {
        id: 'S7',
        text: 'Rank your top two AI objectives',
        type: 'rank',
        required: false,
        max_rank: 2,
        options: [
          { value: 'Productivity', label: 'Productivity' },
          { value: 'Cost reduction', label: 'Cost reduction' },
          { value: 'Revenue growth', label: 'Revenue growth' },
          { value: 'Customer-experience improvement', label: 'Customer-experience improvement' },
          { value: 'Innovation', label: 'Innovation' },
          { value: 'Regulatory compliance', label: 'Regulatory compliance' },
          { value: 'Investor positioning', label: 'Investor positioning' }
        ]
      },
      {
        id: 'S8',
        text: 'Leadership alignment on AI',
        type: 'single',
        required: false,
        options: [
          { value: 'No alignment', label: 'No alignment' },
          { value: 'Occasional discussions', label: 'Occasional discussions' },
          { value: 'Executive interest no action', label: 'Executive interest no action' },
          { value: 'Budget approved', label: 'Budget approved' },
          { value: 'Active executive championing', label: 'Active executive championing' }
        ]
      },
      {
        id: 'S9',
        text: 'Which teams help define AI use-cases?',
        type: 'multi',
        required: false,
        options: [
          { value: 'Executive leadership', label: 'Executive leadership' },
          { value: 'Product/Marketing', label: 'Product/Marketing' },
          { value: 'Operations', label: 'Operations' },
          { value: 'Data/IT', label: 'Data/IT' },
          { value: 'Legal/Compliance', label: 'Legal/Compliance' },
          { value: 'HR', label: 'HR' },
          { value: 'Finance', label: 'Finance' },
          { value: 'Customer Support', label: 'Customer Support' },
          { value: 'Other', label: 'Other' }
        ]
      },
      {
        id: 'S10',
        text: 'Change-management readiness for AI adoption',
        type: 'single',
        required: false,
        options: [
          { value: 'Not prepared', label: 'Not prepared' },
          { value: 'Ad-hoc', label: 'Ad-hoc' },
          { value: 'Formal for some projects', label: 'Formal for some projects' },
          { value: 'Org-wide framework', label: 'Org-wide framework' },
          { value: 'Continuous-improvement culture', label: 'Continuous-improvement culture' }
        ]
      }
    ]
  },
  {
    id: 'section_2',
    title: 'Financial Commitment',
    purpose: 'Budget, runway, investor support, compliance.',
    questions: [
      {
        id: 'F1',
        text: 'Current monthly AI + data budget',
        type: 'single',
        required: true,
        options: [
          { value: '< €100', label: '< €100' },
          { value: '€100–500', label: '€100–500' },
          { value: '€500–2 k', label: '€500–2 k' },
          { value: '€2–15 k', label: '€2–15 k' },
          { value: '≥ €15 k', label: '≥ €15 k' }
        ]
      },
      {
        id: 'F3',
        text: 'Funding runway at current spend',
        type: 'single',
        required: false,
        options: [
          { value: '< 3 m', label: '< 3 m' },
          { value: '3–6 m', label: '3–6 m' },
          { value: '6–12 m', label: '6–12 m' },
          { value: '12–24 m', label: '12–24 m' },
          { value: '> 24 m', label: '> 24 m' }
        ],
        helper: 'Shows financial sustainability of AI initiatives.'
      },
      {
        id: 'F4',
        text: 'Board / investor support for AI',
        type: 'single',
        required: false,
        options: [
          { value: 'Not supportive', label: 'Not supportive' },
          { value: 'Talks only', label: 'Talks only' },
          { value: 'Open to AI', label: 'Open to AI' },
          { value: 'Budget approved', label: 'Budget approved' },
          { value: 'Actively championing', label: 'Actively championing' }
        ]
      },
      {
        id: 'F5',
        text: 'Applicable regulatory frameworks',
        type: 'multi',
        required: false,
        options: [
          { value: 'GDPR', label: 'GDPR' },
          { value: 'EU AI Act', label: 'EU AI Act' },
          { value: 'ISO 27001', label: 'ISO 27001' },
          { value: 'SOC 2', label: 'SOC 2' },
          { value: 'PCI-DSS', label: 'PCI-DSS' },
          { value: 'HIPAA', label: 'HIPAA' },
          { value: 'MiFID II/MDR', label: 'MiFID II/MDR' },
          { value: 'CCPA', label: 'CCPA' },
          { value: 'LGPD', label: 'LGPD' },
          { value: 'POPIA', label: 'POPIA' },
          { value: 'None', label: 'None' },
          { value: 'Other', label: 'Other' }
        ]
      }
    ]
  },
  {
    id: 'section_3',
    title: 'Data Foundation',
    purpose: 'Data foundation, security, ethics, compliance.',
    questions: [
      {
        id: 'D1',
        text: 'Where is your most critical data stored?',
        type: 'multi',
        required: true,
        options: [
          { value: 'Files & Spreadsheets', label: 'Files & Spreadsheets' },
          { value: 'Databases', label: 'Databases' },
          { value: 'Cloud & SaaS', label: 'Cloud & SaaS' },
          { value: 'Internal Tools/Legacy', label: 'Internal Tools/Legacy' },
          { value: 'Analytics/BI', label: 'Analytics/BI' },
          { value: 'Other', label: 'Other' }
        ],
        helper: 'Critical data includes anything essential to running operations, serving customers, or making decisions.'
      },
      {
        id: 'D6',
        text: 'Security controls applied',
        type: 'multi',
        required: false,
        options: [
          { value: 'Encryption at rest', label: 'Encryption at rest' },
          { value: 'TLS/HTTPS', label: 'TLS/HTTPS' },
          { value: 'Role-based access', label: 'Role-based access' },
          { value: 'Audit logs', label: 'Audit logs' },
          { value: 'DLP', label: 'DLP' },
          { value: 'Tokenisation', label: 'Tokenisation' },
          { value: 'Differential privacy', label: 'Differential privacy' },
          { value: 'None', label: 'None' }
        ]
      },
      {
        id: 'D7',
        text: 'Data stewardship & cleaning cadence',
        type: 'single',
        required: false,
        options: [
          { value: 'No owner', label: 'No owner' },
          { value: 'Occasional clean-ups', label: 'Occasional clean-ups' },
          { value: 'Owner + periodic', label: 'Owner + periodic' },
          { value: 'Steward + monthly', label: 'Steward + monthly' },
          { value: 'Continuous stewarding', label: 'Continuous stewarding' }
        ]
      },
      {
        id: 'D8',
        text: 'Audit readiness for GDPR / AI Act',
        type: 'single',
        required: false,
        options: [
          { value: 'None', label: 'None' },
          { value: 'Basic logs', label: 'Basic logs' },
          { value: 'Audit trail for critical', label: 'Audit trail for critical' },
          { value: '+ explainability', label: '+ explainability' },
          { value: '+ automated checks', label: '+ automated checks' }
        ]
      },
      {
        id: 'D11',
        text: 'AI ethics & privacy policies',
        type: 'single',
        required: false,
        options: [
          { value: 'No policies', label: 'No policies' },
          { value: 'High-level principles', label: 'High-level principles' },
          { value: 'Documented guidelines', label: 'Documented guidelines' },
          { value: '+ training & oversight', label: '+ training & oversight' },
          { value: 'Audited & improved', label: 'Audited & improved' }
        ]
      }
    ]
  },
  {
    id: 'section_4',
    title: 'Tool Integration',
    purpose: 'Tool stack & integration maturity.',
    questions: [
      {
        id: '4A',
        text: 'Role-adaptive tool inventory',
        type: 'multi',
        required: false,
        options: [
          { value: 'CRM', label: 'CRM' },
          { value: 'Marketing automation', label: 'Marketing automation' },
          { value: 'Data warehouse', label: 'Data warehouse' },
          { value: 'BI dashboard', label: 'BI dashboard' },
          { value: 'Low-code builder', label: 'Low-code builder' },
          { value: 'Project management', label: 'Project management' },
          { value: 'Chat/Collaboration', label: 'Chat/Collaboration' },
          { value: 'Other', label: 'Other' }
        ]
      },
      {
        id: 'T1',
        text: 'System integration level',
        type: 'single',
        required: true,
        options: [
          { value: 'Siloed/no connections', label: 'Siloed/no connections' },
          { value: 'CSV exports/imports', label: 'CSV exports/imports' },
          { value: 'Batch sync', label: 'Batch sync' },
          { value: 'API-platform', label: 'API-platform' },
          { value: 'Real-time data mesh', label: 'Real-time data mesh' }
        ]
      },
      {
        id: 'T2',
        text: 'Integration reliability',
        type: 'single',
        required: false,
        options: [
          { value: 'Weekly failures', label: 'Weekly failures' },
          { value: 'Monthly failures', label: 'Monthly failures' },
          { value: 'Quarterly failures', label: 'Quarterly failures' },
          { value: 'Rarely', label: 'Rarely' },
          { value: 'Never', label: 'Never' }
        ]
      },
      {
        id: 'T3',
        text: 'Ownership of integrations',
        type: 'single',
        required: false,
        options: [
          { value: 'No owner', label: 'No owner' },
          { value: 'External agency', label: 'External agency' },
          { value: 'Ops/Product', label: 'Ops/Product' },
          { value: 'Internal tech team', label: 'Internal tech team' },
          { value: 'Dedicated integration team', label: 'Dedicated integration team' }
        ]
      },
      {
        id: 'T4',
        text: 'External AI-API connectivity',
        type: 'single',
        required: false,
        options: [
          { value: 'Not possible', label: 'Not possible' },
          { value: 'Prototype only', label: 'Prototype only' },
          { value: 'Limited pilots', label: 'Limited pilots' },
          { value: 'One API in production', label: 'One API in production' },
          { value: 'Multiple in production', label: 'Multiple in production' }
        ]
      },
      {
        id: 'T8',
        text: 'Low/no-code platforms in use',
        type: 'multi',
        required: false,
        options: [
          { value: 'Zapier', label: 'Zapier' },
          { value: 'Make', label: 'Make' },
          { value: 'n8n', label: 'n8n' },
          { value: 'Power Automate', label: 'Power Automate' },
          { value: 'UiPath', label: 'UiPath' },
          { value: 'Workato', label: 'Workato' },
          { value: 'Airbyte', label: 'Airbyte' },
          { value: 'Fivetran', label: 'Fivetran' },
          { value: 'dbt', label: 'dbt' },
          { value: 'None', label: 'None' },
          { value: 'Other', label: 'Other' }
        ]
      }
    ]
  },
  {
    id: 'section_5',
    title: 'AI Automation',
    purpose: 'Automation maturity & AI agent governance.',
    questions: [
      {
        id: 'A1',
        text: 'Task pain-point ranking',
        type: 'rank',
        required: true,
        max_rank: 3,
        options: [
          { value: 'Reporting', label: 'Reporting' },
          { value: 'Scheduling', label: 'Scheduling' },
          { value: 'Data entry', label: 'Data entry' },
          { value: 'FAQ', label: 'FAQ' },
          { value: 'Ticket triage', label: 'Ticket triage' },
          { value: 'Contract gen', label: 'Contract gen' },
          { value: 'Inventory mgmt', label: 'Inventory mgmt' },
          { value: 'Compliance checks', label: 'Compliance checks' },
          { value: 'Other', label: 'Other' }
        ]
      },
      {
        id: 'A2',
        text: 'Overall automation maturity',
        type: 'single',
        required: false,
        options: [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' }
        ]
      },
      {
        id: 'A3',
        text: 'Integration/automation platforms',
        type: 'multi',
        required: false,
        options: [
          { value: 'Zapier', label: 'Zapier' },
          { value: 'Make', label: 'Make' },
          { value: 'n8n', label: 'n8n' },
          { value: 'Power Automate', label: 'Power Automate' },
          { value: 'UiPath', label: 'UiPath' },
          { value: 'Workato', label: 'Workato' },
          { value: 'Custom scripts', label: 'Custom scripts' },
          { value: 'None', label: 'None' },
          { value: 'Other', label: 'Other' }
        ]
      },
      {
        id: 'A4',
        text: 'AI agents implementation status',
        type: 'single',
        required: false,
        options: [
          { value: 'None', label: 'None' },
          { value: 'Prototype', label: 'Prototype' },
          { value: 'One live', label: 'One live' },
          { value: 'A few', label: 'A few' },
          { value: 'Multiple', label: 'Multiple' }
        ]
      },
      {
        id: 'A5',
        text: 'Tasks suitable for agents',
        type: 'multi',
        required: false,
        options: [
          { value: 'Customer support', label: 'Customer support' },
          { value: 'Report gen', label: 'Report gen' },
          { value: 'Email drafting', label: 'Email drafting' },
          { value: 'Lead scoring', label: 'Lead scoring' },
          { value: 'Meeting summary', label: 'Meeting summary' },
          { value: 'Market research', label: 'Market research' },
          { value: 'Quality control', label: 'Quality control' },
          { value: 'None', label: 'None' },
          { value: 'Other', label: 'Other' }
        ]
      },
      {
        id: 'A7',
        text: 'Monitoring & alerting setup',
        type: 'single',
        required: false,
        options: [
          { value: 'None', label: 'None' },
          { value: 'Manual checks', label: 'Manual checks' },
          { value: 'KPI dashboard', label: 'KPI dashboard' },
          { value: 'Automated alerts', label: 'Automated alerts' },
          { value: 'Full observability', label: 'Full observability' }
        ]
      },
      {
        id: 'A8',
        text: 'Implementation blockers',
        type: 'multi',
        required: false,
        options: [
          { value: 'Data silos', label: 'Data silos' },
          { value: 'Lack tech resources', label: 'Lack tech resources' },
          { value: 'Team buy-in', label: 'Team buy-in' },
          { value: 'Compliance concerns', label: 'Compliance concerns' },
          { value: 'ROI unclear', label: 'ROI unclear' },
          { value: 'Budget constraints', label: 'Budget constraints' },
          { value: 'Control concerns', label: 'Control concerns' },
          { value: 'Integration complexity', label: 'Integration complexity' },
          { value: 'Other', label: 'Other' }
        ]
      }
    ]
  },
  {
    id: 'section_6',
    title: 'People & Skills',
    purpose: 'Team capability & learning culture.',
    questions: [
      {
        id: 'C1',
        text: 'AI tool usage frequency',
        type: 'single',
        required: true,
        options: [
          { value: 'Never', label: 'Never' },
          { value: 'Rarely', label: 'Rarely' },
          { value: 'Monthly', label: 'Monthly' },
          { value: 'Weekly', label: 'Weekly' },
          { value: 'Daily', label: 'Daily' }
        ]
      },
      {
        id: 'C2',
        text: 'Prompt-writing confidence',
        type: 'single',
        required: false,
        options: [
          { value: 'None', label: 'None' },
          { value: 'Copy/paste', label: 'Copy/paste' },
          { value: 'Edit existing', label: 'Edit existing' },
          { value: 'Structured', label: 'Structured' },
          { value: 'Chains', label: 'Chains' }
        ]
      },
      {
        id: 'C3',
        text: 'Internal knowledge sharing',
        type: 'single',
        required: false,
        options: [
          { value: 'None', label: 'None' },
          { value: 'Occasional tips', label: 'Occasional tips' },
          { value: 'Chat channel', label: 'Chat channel' },
          { value: 'Workshops', label: 'Workshops' },
          { value: 'CoP', label: 'CoP' }
        ]
      },
      {
        id: 'C4',
        text: 'Upskilling budget per FTE (€ / yr)',
        type: 'single',
        required: false,
        options: [
          { value: '0', label: '0' },
          { value: '<200', label: '<200' },
          { value: '200–500', label: '200–500' },
          { value: '500–1k', label: '500–1k' },
          { value: '>1k', label: '>1k' }
        ]
      },
      {
        id: 'C6',
        text: 'Training topic priority',
        type: 'rank',
        required: false,
        max_rank: 5,
        options: [
          { value: 'Prompt engineering', label: 'Prompt engineering' },
          { value: 'AI tool mastery', label: 'AI tool mastery' },
          { value: 'Data literacy', label: 'Data literacy' },
          { value: 'Change management', label: 'Change management' },
          { value: 'Ethics & governance', label: 'Ethics & governance' },
          { value: 'Technical implementation', label: 'Technical implementation' },
          { value: 'Business case', label: 'Business case' },
          { value: 'Leadership', label: 'Leadership' },
          { value: 'Other', label: 'Other' }
        ]
      },
      {
        id: 'C7',
        text: 'External AI expertise engagement',
        type: 'single',
        required: false,
        options: [
          { value: 'None', label: 'None' },
          { value: 'Occasional', label: 'Occasional' },
          { value: 'Regular advisors', label: 'Regular advisors' },
          { value: 'Network', label: 'Network' },
          { value: 'Board', label: 'Board' }
        ]
      },
      {
        id: 'C8',
        text: 'Pilot project openness',
        type: 'single',
        required: false,
        options: [
          { value: 'Resistant', label: 'Resistant' },
          { value: 'Cautious', label: 'Cautious' },
          { value: 'Interested', label: 'Interested' },
          { value: 'Proactive', label: 'Proactive' },
          { value: 'Piloting', label: 'Piloting' }
        ]
      },
      {
        id: 'C9',
        text: 'Cross-functional collaboration frequency',
        type: 'single',
        required: false,
        options: [
          { value: 'Never', label: 'Never' },
          { value: 'Occasionally', label: 'Occasionally' },
          { value: 'Quarterly', label: 'Quarterly' },
          { value: 'Squads', label: 'Squads' },
          { value: 'Embedded practice', label: 'Embedded practice' }
        ]
      },
      {
        id: 'C10',
        text: 'Psychological safety for AI experimentation',
        type: 'single',
        required: false,
        options: [
          { value: 'Not at all', label: 'Not at all' },
          { value: 'Rarely', label: 'Rarely' },
          { value: 'Sometimes', label: 'Sometimes' },
          { value: 'Often', label: 'Often' },
          { value: 'Always', label: 'Always' }
        ]
      }
    ]
  },
  {
    id: 'section_7',
    title: 'Governance & Ethics',
    purpose: 'Governance, risk & ethics.',
    questions: [
      {
        id: 'G1',
        text: 'Risk & bias management maturity',
        type: 'single',
        required: true,
        options: [
          { value: 'None', label: 'None' },
          { value: 'Ad-hoc fixes', label: 'Ad-hoc fixes' },
          { value: 'Release checks', label: 'Release checks' },
          { value: 'Framework', label: 'Framework' },
          { value: 'AI-Act compliant', label: 'AI-Act compliant' }
        ]
      },
      {
        id: 'G2',
        text: 'Explainability & audit depth',
        type: 'single',
        required: false,
        options: [
          { value: 'None', label: 'None' },
          { value: 'Critical models only', label: 'Critical models only' },
          { value: 'Logs+scripts', label: 'Logs+scripts' },
          { value: 'All models', label: 'All models' },
          { value: 'Audit-ready', label: 'Audit-ready' }
        ]
      },
      {
        id: 'G3',
        text: 'Stakeholder transparency',
        type: 'single',
        required: false,
        options: [
          { value: 'None', label: 'None' },
          { value: 'Policy mention', label: 'Policy mention' },
          { value: 'Docs+FAQs', label: 'Docs+FAQs' },
          { value: '"Explain" buttons', label: '"Explain" buttons' },
          { value: 'Full disclosure', label: 'Full disclosure' }
        ]
      },
      {
        id: 'G4',
        text: 'Incident response plan',
        type: 'single',
        required: false,
        options: [
          { value: 'None', label: 'None' },
          { value: 'IT plan', label: 'IT plan' },
          { value: 'Manual rollback', label: 'Manual rollback' },
          { value: 'Automated rollback', label: 'Automated rollback' },
          { value: 'Playbook', label: 'Playbook' }
        ]
      },
      {
        id: 'G5',
        text: 'Human oversight threshold',
        type: 'single',
        required: false,
        options: [
          { value: 'No oversight', label: 'No oversight' },
          { value: 'Final review', label: 'Final review' },
          { value: 'Spot checks', label: 'Spot checks' },
          { value: 'Human-in-loop', label: 'Human-in-loop' },
          { value: 'Escalation', label: 'Escalation' }
        ]
      },
      {
        id: 'G6',
        text: 'Privacy-by-design level',
        type: 'single',
        required: false,
        options: [
          { value: 'Basic compliance', label: 'Basic compliance' },
          { value: 'Enhanced', label: 'Enhanced' },
          { value: 'PETs', label: 'PETs' },
          { value: 'Design', label: 'Design' },
          { value: 'Automated', label: 'Automated' }
        ]
      },
      {
        id: 'G8',
        text: 'EU AI Act risk mapping',
        type: 'single',
        required: false,
        options: [
          { value: 'Not aware', label: 'Not aware' },
          { value: 'Aware', label: 'Aware' },
          { value: 'Mapping started', label: 'Mapping started' },
          { value: 'Completed', label: 'Completed' },
          { value: 'Reported to board', label: 'Reported to board' }
        ]
      },
      {
        id: 'G10',
        text: 'Ethics committee or oversight board',
        type: 'single',
        required: false,
        options: [
          { value: 'None', label: 'None' },
          { value: 'Informal', label: 'Informal' },
          { value: 'Ad-hoc', label: 'Ad-hoc' },
          { value: 'Quarterly', label: 'Quarterly' },
          { value: 'External experts', label: 'External experts' }
        ]
      }
    ]
  },
  {
    id: 'section_8',
    title: 'Implementation Planning',
    purpose: 'Implementation horizon, KPIs & vision.',
    questions: [
      {
        id: 'P1',
        text: 'Implementation timeframe',
        type: 'single',
        required: true,
        options: [
          { value: '< 3 m', label: '< 3 m' },
          { value: '3–6 m', label: '3–6 m' },
          { value: '6–12 m', label: '6–12 m' },
          { value: '> 12 m', label: '> 12 m' }
        ]
      },
      {
        id: 'P2',
        text: 'Risk appetite',
        type: 'single',
        required: true,
        options: [
          { value: 'Conservative', label: 'Conservative' },
          { value: 'Balanced', label: 'Balanced' },
          { value: 'Progressive', label: 'Progressive' },
          { value: 'Aggressive', label: 'Aggressive' }
        ]
      },
      {
        id: 'P3',
        text: 'Success KPIs',
        type: 'multi',
        required: false,
        max_select: 3,
        options: [
          { value: 'ROI', label: 'ROI' },
          { value: 'Cost reduction', label: 'Cost reduction' },
          { value: 'Efficiency', label: 'Efficiency' },
          { value: 'CX', label: 'CX' },
          { value: 'Productivity', label: 'Productivity' },
          { value: 'Innovation', label: 'Innovation' },
          { value: 'Compliance', label: 'Compliance' },
          { value: 'Sustainability', label: 'Sustainability' }
        ]
      },
      {
        id: 'P4',
        text: 'Resource allocation strategy',
        type: 'single',
        required: false,
        options: [
          { value: 'Internal build', label: 'Internal build' },
          { value: 'Mixed', label: 'Mixed' },
          { value: 'External', label: 'External' }
        ]
      },
      {
        id: 'P5',
        text: 'Technology preferences & architectures',
        type: 'multi',
        required: false,
        options: [
          { value: 'Cloud-native', label: 'Cloud-native' },
          { value: 'Hybrid/on-prem', label: 'Hybrid/on-prem' },
          { value: 'API-first', label: 'API-first' },
          { value: 'Low/no-code', label: 'Low/no-code' },
          { value: 'Open-source', label: 'Open-source' },
          { value: 'Enterprise suite', label: 'Enterprise suite' }
        ]
      },
      {
        id: 'P7',
        text: 'Change threshold & readiness',
        type: 'single',
        required: false,
        options: [
          { value: 'Not willing', label: 'Not willing' },
          { value: 'Minor tweaks', label: 'Minor tweaks' },
          { value: 'Moderate', label: 'Moderate' },
          { value: 'Major transformation', label: 'Major transformation' },
          { value: 'Continuous', label: 'Continuous' }
        ]
      }
    ]
  }
];

export { assessmentSections };

// Export metadata
export const assessmentMeta = {
  locale_default: 'en',
  max_visible_questions: 60,
  tracks: {
    TECH: 'Technical / Data-Lead',
    REG: 'Regulated / Compliance', 
    GEN: 'General Business'
  }
};

export const assessmentData = {
  sections: assessmentSections
};