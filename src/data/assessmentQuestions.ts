import { Section, Question } from "@/types/assessment";

// Start with a working base structure, then enhance with YAML
const baseAssessmentSections: Section[] = [
  {
    id: 'section_0',
    title: 'Organization Profile',
    purpose: 'Basic information to determine your assessment track',
    questions: [
      {
        id: 'M1',
        text: 'Full name',
        type: 'text',
        required: true
      },
      {
        id: 'M2', 
        text: 'Work email',
        type: 'email',
        required: true
      },
      {
        id: 'M3',
        text: 'Role/Position',
        type: 'single',
        required: true,
        options: [
          { value: 'Founder/CEO', label: 'Founder/CEO' },
          { value: 'C-level', label: 'C-level' },
          { value: 'Data/AI Lead', label: 'Data/AI Lead' },
          { value: 'IT Lead', label: 'IT Lead' },
          { value: 'Legal/Compliance', label: 'Legal/Compliance' },
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
          { value: 'IT', label: 'IT' },
          { value: 'HR', label: 'HR' },
          { value: 'Other', label: 'Other' }
        ]
      },
      {
        id: 'M9',
        text: 'Is your organization in a regulated industry?',
        type: 'single',
        required: true,
        options: [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
          { value: 'Not sure', label: 'Not sure' }
        ]
      }
    ]
  },
  {
    id: 'section_1',
    title: 'Strategy & Use-Case Readiness',
    purpose: 'Assess strategic alignment & planning maturity',
    questions: [
      {
        id: 'S1',
        text: 'Have you listed AI opportunities to launch within 12 months?',
        type: 'single',
        required: true,
        options: [
          { value: 'None', label: 'None' },
          { value: 'Idea list only', label: 'Idea list only' },
          { value: '1–2 documented', label: '1–2 documented use-cases' },
          { value: '3–5 prioritised', label: '3–5 prioritised w/owners' },
          { value: '≥ 6 with timeline', label: '≥ 6 with owner & timeline' }
        ]
      },
      {
        id: 'S2',
        text: 'What prioritisation approach does your organisation use?',
        type: 'single',
        required: false,
        options: [
          { value: 'No formal process', label: 'No formal process' },
          { value: 'Ad-hoc', label: 'Ad-hoc based on perceived value' },
          { value: 'Impact × Effort', label: 'Impact × Effort matrix' },
          { value: 'ROI-driven', label: 'ROI-driven financial model' }
        ]
      }
    ]
  },
  {
    id: 'section_2',
    title: 'Financial Commitment',
    purpose: 'Budget, runway, investor support, compliance',
    questions: [
      {
        id: 'F1',
        text: 'Current monthly AI + data budget',
        type: 'single',
        required: true,
        options: [
          { value: '< €100', label: '< €100' },
          { value: '€100–500', label: '€100–500' },
          { value: '€500–2k', label: '€500–2k' },
          { value: '€2–15k', label: '€2–15k' },
          { value: '> €15k', label: '> €15k' }
        ]
      }
    ]
  },
  {
    id: 'section_3',
    title: 'Data Foundation',
    purpose: 'Data foundation, security, ethics, compliance',
    questions: [
      {
        id: 'D1',
        text: 'Critical data storage locations',
        type: 'multi',
        required: true,
        options: [
          { value: 'Files & Spreadsheets', label: 'Files & Spreadsheets' },
          { value: 'Databases', label: 'Databases' },
          { value: 'Cloud & SaaS', label: 'Cloud & SaaS' },
          { value: 'Analytics/BI', label: 'Analytics & BI' },
          { value: 'Other', label: 'Other' }
        ]
      }
    ]
  },
  {
    id: 'section_4',
    title: 'Tool Integration',
    purpose: 'Tool stack & integration maturity',
    questions: [
      {
        id: 'T1',
        text: 'System integration level',
        type: 'single',
        required: true,
        options: [
          { value: 'Siloed', label: 'Siloed' },
          { value: 'CSV exports', label: 'CSV exports/imports' },
          { value: 'API-platform', label: 'API-platform' },
          { value: 'Real-time', label: 'Real-time data mesh' }
        ]
      }
    ]
  },
  {
    id: 'section_5',
    title: 'AI Automation',
    purpose: 'Automation maturity & AI agent governance',
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
          { value: 'FAQ answering', label: 'FAQ answering' }
        ]
      }
    ]
  },
  {
    id: 'section_6',
    title: 'People & Skills',
    purpose: 'Team capability & learning culture',
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
      }
    ]
  },
  {
    id: 'section_7',
    title: 'Governance & Ethics',
    purpose: 'Governance, risk & ethics',
    questions: [
      {
        id: 'G1',
        text: 'AI risk & bias management maturity',
        type: 'single',
        required: true,
        options: [
          { value: 'None', label: 'None' },
          { value: 'Ad-hoc fixes', label: 'Ad-hoc fixes' },
          { value: 'Model checks', label: 'Model checks' },
          { value: 'Formal framework', label: 'Formal framework' }
        ]
      }
    ]
  },
  {
    id: 'section_8',
    title: 'Implementation Planning',
    purpose: 'Implementation horizon, KPIs & vision',
    questions: [
      {
        id: 'P1',
        text: 'Implementation timeframe',
        type: 'single',
        required: true,
        options: [
          { value: '< 3 m', label: '< 3 months' },
          { value: '3–6 m', label: '3–6 months' },
          { value: '6–12 m', label: '6–12 months' },
          { value: '> 12 m', label: '> 12 months' }
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
      }
    ]
  }
];

// Try to load and enhance with YAML, but fall back to base structure
let assessmentSections: Section[] = baseAssessmentSections;

try {
  // Attempt to load YAML enhancement
  import('../ai-readiness-assessment.yaml?raw').then(async (module) => {
    try {
      const yaml = await import('js-yaml');
      const yamlSchema = yaml.load(module.default) as any;
      
      if (yamlSchema && yamlSchema.section_0) {
        // YAML loaded successfully, enhance the base structure
        console.log('✅ YAML schema loaded successfully');
        // Keep the working base structure for now
      }
    } catch (error) {
      console.warn('⚠️ YAML enhancement failed, using base structure:', error);
    }
  }).catch(() => {
    console.warn('⚠️ YAML file not found, using base structure');
  });
} catch (error) {
  console.warn('⚠️ YAML loading failed, using base structure:', error);
}

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
