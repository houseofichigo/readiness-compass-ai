// Enhanced validation utilities for assessment responses

import { Question, AssessmentValue } from "@/types/assessment";

/** Validate individual question response */
export function validateQuestionResponse(
  question: Question,
  value: AssessmentValue
): { valid: boolean; error?: string } {
  // Required field validation
  if (question.required) {
    if (value === null || value === undefined || value === "") {
      return { valid: false, error: "This field is required" };
    }
    
    if (Array.isArray(value) && value.length === 0) {
      return { valid: false, error: "Please select at least one option" };
    }
  }
  
  // Type-specific validation
  switch (question.type) {
    case "email":
      if (value && typeof value === "string") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return { valid: false, error: "Please enter a valid email address" };
        }
        
        // Check for personal email domains
        const personalDomains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];
        const domain = value.split("@")[1]?.toLowerCase();
        if (personalDomains.includes(domain)) {
          return { valid: false, error: "Please use your business email address" };
        }
      }
      break;
      
    case "rank":
      if (Array.isArray(value)) {
        const maxRank = question.maxRank || question.options?.length || 5;
        if (value.length > maxRank) {
          return { valid: false, error: `Please select at most ${maxRank} items` };
        }
      }
      break;
      
    case "multi":
    case "multi_group":
      if (Array.isArray(value) && question.maxSelect && value.length > question.maxSelect) {
        return { valid: false, error: `Please select at most ${question.maxSelect} options` };
      }
      break;
      
    case "matrix":
      if (question.required && question.rows && typeof value === "object" && value !== null && !Array.isArray(value)) {
        const matrixValue = value as Record<string, string>;
        const requiredRows = question.rows.filter(row => 
          typeof row === "object" && "required" in row ? row.required : true
        );
        
        for (const row of requiredRows) {
          const rowKey = typeof row === "string" ? row : row.value;
          if (!matrixValue?.[rowKey]) {
            return { valid: false, error: "Please complete all required rows" };
          }
        }
      }
      break;
  }
  
  return { valid: true };
}

/** Validate all responses in a section */
export function validateSectionResponses(
  questions: Question[],
  responses: Record<string, AssessmentValue>
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  for (const question of questions) {
    const result = validateQuestionResponse(question, responses[question.id]);
    if (!result.valid) {
      errors[question.id] = result.error || "Invalid response";
    }
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

/** Check if assessment is complete */
export function isAssessmentComplete(
  allQuestions: Question[],
  responses: Record<string, AssessmentValue>
): boolean {
  const requiredQuestions = allQuestions.filter(q => q.required);
  
  for (const question of requiredQuestions) {
    const value = responses[question.id];
    const validation = validateQuestionResponse(question, value);
    if (!validation.valid) {
      return false;
    }
  }
  
  return true;
}

/** Get completion percentage */
export function getCompletionPercentage(
  allQuestions: Question[],
  responses: Record<string, AssessmentValue>
): number {
  if (allQuestions.length === 0) return 0;
  
  const answeredQuestions = allQuestions.filter(q => {
    const value = responses[q.id];
    return value !== null && value !== undefined && value !== "";
  });
  
  return Math.round((answeredQuestions.length / allQuestions.length) * 100);
}