import { Section, Question } from "@/types/assessment";
import yaml from 'js-yaml';
import schemaText from '../ai-readiness-assessment.yaml?raw';

// Parse assessment schema at build time
const schema: any = yaml.load(schemaText);

// Convert YAML schema to our TypeScript types
function convertYamlToSections(yamlSchema: any): Section[] {
  const sections: Section[] = [];
  
  // Convert numbered sections (section_0, section_1, etc.)
  Object.keys(yamlSchema).forEach(key => {
    if (key.startsWith('section_')) {
      const sectionData = yamlSchema[key];
      const sectionNumber = parseInt(key.split('_')[1]);
      
      sections.push({
        id: key,
        title: getSectionTitle(sectionNumber),
        purpose: sectionData.purpose,
        questions: sectionData.questions.map((q: any) => ({
          id: q.id,
          text: q.text || q.label,
          type: q.type,
          options: Array.isArray(q.options) ? q.options.map((opt: any) => 
            typeof opt === 'string' ? { value: opt, label: opt } : opt
          ) : undefined,
          required: q.required,
          show_if: q.show_if,
          hide_if: q.hide_if,
          helper: q.helper,
          max_rank: q.max_rank,
          weight: q.weight,
          score_map: q.score_map,
          score_per: q.score_per,
          cap: q.cap,
          max_select: q.max_select,
          label: q.label,
          tooltip_each: q.tooltip_each
        }))
      });
    }
  });
  
  // Sort sections by number
  sections.sort((a, b) => {
    const aNum = parseInt(a.id.split('_')[1]);
    const bNum = parseInt(b.id.split('_')[1]);
    return aNum - bNum;
  });
  
  return sections;
}

function getSectionTitle(sectionNumber: number): string {
  const titles = [
    "Organization Profile",
    "Strategy & Use-Case Readiness", 
    "Financial Commitment & Compliance",
    "Data Foundation & Governance",
    "Tool Stack & Integration",
    "Automation & AI Agents",
    "Team Capability & Learning",
    "Governance, Risk & Ethics",
    "Implementation & Planning"
  ];
  return titles[sectionNumber] || `Section ${sectionNumber + 1}`;
}

export const assessmentSections: Section[] = convertYamlToSections(schema);

// Export the original arrays for backward compatibility
export const organizationProfileQuestions: Question[] = assessmentSections[0]?.questions || [];
export const strategyQuestions: Question[] = assessmentSections[1]?.questions || [];

// Export schema metadata
export const assessmentMeta = schema.meta;
export const assessmentConfig = {
  ui: schema.ui,
  validation: schema.validation,
  scoring: schema.scoring,
  reporting: schema.reporting,
  version: schema.version
};