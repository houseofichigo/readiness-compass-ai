import { Section, Question } from "@/types/assessment";
import yaml from 'js-yaml';
import schemaText from '../ai-readiness-assessment.yaml?raw';

// Parse assessment schema at build time
const schema: any = yaml.load(schemaText);

// Convert YAML schema to our TypeScript types
function convertYamlToSections(yamlSchema: any): Section[] {
  return yamlSchema.sections.map((section: any) => ({
    id: section.id,
    title: section.title,
    purpose: section.purpose,
    questions: section.questions.map((q: any) => ({
      id: q.id,
      text: q.text,
      type: q.type,
      options: q.options,
      required: q.required,
      show_if: q.show_if,
      helper: q.helper,
      max_rank: q.max_rank,
      weight: q.weight,
      score_map: q.score_map
    }))
  }));
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