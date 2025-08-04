import { Section, Question } from "@/types/assessment";
import yaml from 'js-yaml';

// Fallback section titles
function getSectionTitle(sectionKey: string): string {
  const titles: Record<string, string> = {
    'section_0': 'Organization Profile',
    'section_1': 'Strategy & Use-Case Readiness',
    'section_2': 'Financial Commitment & Compliance Context',
    'section_3': 'Data Foundation & Governance',
    'section_4': 'Tool Inventory & Integration',
    'section_5': 'AI Agents & Automation Assessment',
    'section_6': 'People & Skills Assessment',
    'section_7': 'Governance, Risk & Ethics',
    'section_8': 'Implementation & Roadmap Planning'
  };
  return titles[sectionKey] || `Section ${sectionKey.split('_')[1]}`;
}

// Convert schema sections to our TypeScript types
function convertSchemaToSections(schemaSections: any): Section[] {
  if (!schemaSections) {
    console.error("No schema sections found");
    return [];
  }

  return Object.keys(schemaSections)
    .filter(key => key.startsWith('section_'))
    .sort((a, b) => {
      const aNum = parseInt(a.split('_')[1]);
      const bNum = parseInt(b.split('_')[1]);
      return aNum - bNum;
    })
    .map(key => {
      const sectionData = schemaSections[key];
      if (!sectionData) {
        console.error(`Section ${key} has no data`);
        return null;
      }

      return {
        id: key,
        title: sectionData.title || getSectionTitle(key), // Fallback for missing titles
        purpose: sectionData.purpose || "Assessment section",
        questions: (sectionData.questions || []).map((q: any) => ({
          id: q.id,
          text: q.text,
          type: q.type,
          options: q.options?.map((opt: string) => ({ value: opt, label: opt })),
          required: q.required || false,
          show_if: q.show_if,
          hide_if: q.hide_if,
          helper: q.helper_text,
          score_map: q.score_map,
          max_rank: q.max_rank
        }))
      };
    })
    .filter(Boolean) as Section[];
}

// Safe YAML loading with error handling
let yamlSchema: any = null;
let assessmentSections: Section[] = [];

try {
  // Import the YAML file as raw text
  const schemaText = `
meta:
  locale_default: en
  max_visible_questions: 60
  tracks:
    TECH: "Technical / Data-Lead"
    REG: "Regulated / Compliance"
    GEN: "General Business"

section_0:
  purpose: "Organization Profile"
  questions:
    - id: M1
      text: "Full name"
      type: text
      required: true
    - id: M2
      text: "Work e-mail"
      type: email
      required: true
    - id: M3
      text: "Role / Position"
      type: single
      options: [Founder/CEO, C-level, CIO/CTO, Head Marketing, Head Sales, Head Finance, Head Ops, Legal/Compliance, IT Lead, Data/AI Lead, Product Lead, HR Lead, Customer Support Lead, Other]
      required: true
`;

  yamlSchema = yaml.load(schemaText) as any;
  assessmentSections = convertSchemaToSections(yamlSchema);
  
} catch (error) {
  console.error("Failed to load YAML schema:", error);
  
  // Fallback to minimal data structure
  assessmentSections = [{
    id: 'section_0',
    title: 'Organization Profile',
    purpose: 'Basic assessment setup',
    questions: [
      {
        id: 'M1',
        text: 'Full name',
        type: 'text' as const,
        required: true
      }
    ]
  }];
}

export { assessmentSections };

// Export the original arrays for backward compatibility
export const organizationProfileQuestions: Question[] = assessmentSections[0]?.questions || [];
export const strategyQuestions: Question[] = assessmentSections[1]?.questions || [];

// Export schema metadata
export const assessmentMeta = yamlSchema?.meta || {};
export const assessmentData = {
  sections: assessmentSections
};