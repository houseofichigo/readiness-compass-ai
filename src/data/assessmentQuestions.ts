import { Section, Question } from "@/types/assessment";
import yaml from 'js-yaml';
import schemaText from '../ai-readiness-assessment.yaml?raw';

// Parse the YAML schema at build time
const yamlSchema = yaml.load(schemaText) as any;

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
        title: sectionData.title || getSectionTitle(key),
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

export const assessmentSections: Section[] = convertSchemaToSections(yamlSchema);

// Export the original arrays for backward compatibility
export const organizationProfileQuestions: Question[] = assessmentSections[0]?.questions || [];
export const strategyQuestions: Question[] = assessmentSections[1]?.questions || [];

// Export schema metadata
export const assessmentMeta = yamlSchema?.meta || {};
export const assessmentData = {
  sections: assessmentSections
};