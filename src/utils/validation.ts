import { Question } from '@/types/assessment';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateSection(
  questions: Question[],
  responses: Record<string, unknown>,
  visibleQuestionIds: string[]
): ValidationResult {
  const errors: Record<string, string> = {};
  
  questions.forEach(question => {
    // Only validate visible questions
    if (!visibleQuestionIds.includes(question.id)) {
      return;
    }

    const answer = responses[question.id];
    
    // Required field validation
    if (question.required) {
      if (question.type === 'checkbox') {
        if (!answer) {
          errors[question.id] = 'This field is required';
        }
      } else if (!answer || answer === '' || (Array.isArray(answer) && answer.length === 0)) {
        errors[question.id] = 'This field is required';
      }
    }

    // "Other" field validation
    if (question.options) {
      const hasOtherSelected = Array.isArray(answer) 
        ? answer.includes('Other')
        : answer === 'Other';
        
      if (hasOtherSelected) {
        const otherFieldId = `${question.id}_other`;
        const otherValue = responses[otherFieldId];
        if (!otherValue || String(otherValue).trim() === '') {
          errors[otherFieldId] = 'Please specify "Other"';
        }
      }
    }

    // Multi-select with "None" validation
    if (question.type === 'multi' && Array.isArray(answer)) {
      if (answer.includes('None') && answer.length > 1) {
        errors[question.id] = 'Cannot select "None" with other options';
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}