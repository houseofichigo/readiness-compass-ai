// src/utils/verifyStructure.ts

import { assessmentSections } from "@/data/assessmentQuestions";

export function verifyYamlStructure() {
  console.log("=== YAML Structure Verification ===");
  
  // Check first section
  const firstSection = assessmentSections[0];
  console.log("First section:", firstSection.id, firstSection.title);
  console.log("Section has pillar_score:", firstSection.pillar_score);
  
  // Check a question with new structure
  const roleQuestion = firstSection.questions.find(q => q.id === 'M3');
  if (roleQuestion && roleQuestion.options) {
    console.log("Role question found:", roleQuestion.text);
    console.log("Options count:", roleQuestion.options.length);
    
    const firstOption = roleQuestion.options[0];
    console.log("First option structure:", {
      label: firstOption.label,
      score: firstOption.score,
      reasoning: firstOption.reasoning,
      model_input_context: firstOption.model_input_context
    });
    
    const hasAllFields = firstOption.score !== undefined && 
                        firstOption.reasoning !== undefined && 
                        firstOption.model_input_context !== undefined;
    console.log("✅ All new fields present:", hasAllFields);
  }
  
  // Check country question for score_map_by_bucket
  const countryQuestion = firstSection.questions.find(q => q.id === 'M5_country');
  if (countryQuestion) {
    console.log("Country question scoreMapByBucket:", !!countryQuestion.scoreMapByBucket);
  }
  
  console.log("=== Verification Complete ===");
}

// Auto-run verification in development
if (import.meta.env.DEV && typeof window !== 'undefined') {
  setTimeout(verifyYamlStructure, 1000);
}