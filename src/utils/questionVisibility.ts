import { Question } from '@/types/assessment';

export function isQuestionVisible(
  question: Question, 
  responses: Record<string, any>,
  detectedTrack: string,
  totalVisibleQuestions: number
): boolean {
  // Handle question cap (hide D2 and P6 if over 60 questions)
  if (totalVisibleQuestions >= 60) {
    if (question.id === 'D2' || question.id === 'P6') {
      return false;
    }
  }

  // Handle track-specific visibility
  if (question.show_if) {
    return evaluateCondition(question.show_if, responses, detectedTrack);
  }

  if (question.hide_if) {
    return !evaluateCondition(question.hide_if, responses, detectedTrack);
  }

  return true;
}

function evaluateCondition(
  condition: Record<string, any>, 
  responses: Record<string, any>,
  detectedTrack: string
): boolean {
  for (const [key, value] of Object.entries(condition)) {
    if (key === 'track') {
      if (typeof value === 'string') {
        return detectedTrack === value;
      }
      if (Array.isArray(value)) {
        return value.includes(detectedTrack);
      }
      if (typeof value === 'object' && value.in) {
        return value.in.includes(detectedTrack);
      }
    }

    const responseValue = responses[key];
    
    if (typeof value === 'string') {
      if (value.startsWith('not_in ')) {
        const excludeValues = value.replace('not_in ', '').split(',').map(v => v.trim());
        return !excludeValues.includes(responseValue);
      }
      if (value.startsWith('in ')) {
        const includeValues = value.replace('in ', '').split(',').map(v => v.trim());
        return includeValues.includes(responseValue);
      }
      return responseValue === value;
    }

    if (Array.isArray(value)) {
      return value.includes(responseValue);
    }

    if (typeof value === 'object') {
      if (value.not) {
        return responseValue !== value.not;
      }
      if (value.in) {
        return value.in.includes(responseValue);
      }
      if (value.not_in) {
        return !value.not_in.includes(responseValue);
      }
    }
  }

  return true;
}

export function detectTrack(responses: Record<string, any>): string {
  const role = responses.M3;
  const regulated = responses.M9;

  // Technical track detection
  if (['Data/AI Lead', 'IT Lead', 'CTO/Tech Lead'].includes(role)) {
    return 'TECH';
  }

  // Regulated track detection
  if (regulated === 'Yes' || regulated === 'Not sure' || role === 'Legal/Compliance') {
    return 'REG';
  }

  // Default to General Business
  return 'GEN';
}