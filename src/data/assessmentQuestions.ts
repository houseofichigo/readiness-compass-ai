import { Section, Question } from "@/types/assessment";
import yaml from 'js-yaml';
import schemaText from '../ai-readiness-assessment.yaml?raw';

// Parse the YAML schema at build time
const yamlSchema = yaml.load(schemaText) as any;

// Convert schema sections to our TypeScript types
function convertSchemaToSections(schemaSections: any): Section[] {
  return Object.keys(schemaSections)
    .filter(key => key.startsWith('section_'))
    .sort((a, b) => {
      const aNum = parseInt(a.split('_')[1]);
      const bNum = parseInt(b.split('_')[1]);
      return aNum - bNum;
    })
    .map(key => {
      const sectionData = schemaSections[key];
      return {
        id: key,
        title: sectionData.title,
        purpose: sectionData.purpose,
        questions: sectionData.questions.map((q: any) => ({
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
    });
}

export const assessmentSections: Section[] = convertSchemaToSections(yamlSchema);

// Export the original arrays for backward compatibility
export const organizationProfileQuestions: Question[] = assessmentSections[0]?.questions || [];
export const strategyQuestions: Question[] = assessmentSections[1]?.questions || [];

// Export schema metadata
export const assessmentMeta = yamlSchema.meta || {};
export const assessmentData = {
  sections: assessmentSections
};