import { Section, Question } from "@/types/assessment";
import { schema } from "./schema";

// Convert schema sections to our TypeScript types
function convertSchemaToSections(schemaSections: any): Section[] {
  return Object.keys(schemaSections).map(key => {
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
        score_map: q.score_map
      }))
    };
  });
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

export const assessmentSections: Section[] = convertSchemaToSections(schema.sections);

// Export the original arrays for backward compatibility
export const organizationProfileQuestions: Question[] = assessmentSections[0]?.questions || [];
export const strategyQuestions: Question[] = assessmentSections[1]?.questions || [];

// Export schema metadata
export const assessmentMeta = schema.meta;
export const assessmentData = {
  sections: assessmentSections
};