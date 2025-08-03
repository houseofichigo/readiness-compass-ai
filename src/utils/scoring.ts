import { assessmentMeta } from '@/data/assessmentQuestions';

export interface ScoringResult {
  questionScores: Record<string, number>;
  totalScore: number;
  sectionScores: Record<string, number>;
  track: string;
}

export function scoreAnswers(values: Record<string, any>, track: string): ScoringResult {
  const questionScores: Record<string, number> = {};
  const sectionScores: Record<string, number> = {};
  
  // Score individual questions
  Object.entries(values).forEach(([questionId, answer]) => {
    const score = scoreQuestion(questionId, answer);
    questionScores[questionId] = score;
  });

  // Calculate section scores
  const sections = ['Strategy', 'Data', 'Tools', 'Automation', 'People', 'Governance'];
  sections.forEach(section => {
    const sectionQuestions = getSectionQuestions(section);
    const sectionTotal = sectionQuestions.reduce((sum, qId) => {
      return sum + (questionScores[qId] ?? 50); // Default 50 for hidden questions
    }, 0);
    sectionScores[section] = sectionTotal / sectionQuestions.length;
  });

  // Apply track-specific weights
  const weights = assessmentMeta.weight_vectors[track as keyof typeof assessmentMeta.weight_vectors];
  const totalScore = sections.reduce((sum, section) => {
    return sum + (sectionScores[section] * (weights[section as keyof typeof weights] / 100));
  }, 0);

  return {
    questionScores,
    totalScore,
    sectionScores,
    track
  };
}

function scoreQuestion(questionId: string, answer: any): number {
  // Handle different scoring methods based on question type
  if (answer === undefined || answer === null || answer === '') {
    return 50; // Neutral score for unanswered
  }

  // Handle "Don't know" responses with confidence penalty
  if (typeof answer === 'string' && answer.toLowerCase().includes("don't know")) {
    return 0;
  }

  // For now, return a basic score - this will be enhanced with actual question metadata
  if (typeof answer === 'boolean') {
    return answer ? 100 : 0;
  }

  if (Array.isArray(answer)) {
    // Multi-select scoring
    return Math.min(answer.length * 20, 100);
  }

  // Single choice - would need question metadata for proper scoring
  return 50;
}

function getSectionQuestions(section: string): string[] {
  // Map section names to question IDs - this would be derived from schema
  const sectionMap: Record<string, string[]> = {
    Strategy: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12'],
    Data: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11'],
    Tools: ['4A', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'],
    Automation: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12'],
    People: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10'],
    Governance: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10']
  };
  
  return sectionMap[section] || [];
}