// src/utils/scoring.ts

import { assessmentSections, assessmentMeta } from "@/data/assessmentQuestions";
import type { Question, WeightVector } from "@/types/assessment";

export interface ScoringResult {
  questionScores: Record<string, number>;
  totalScore: number;
  sectionScores: Record<string, number>;
  track: string;
}

interface QuestionIndexEntry {
  question: Question;
  section: keyof WeightVector;
}

const buildQuestionIndex = (): Record<string, QuestionIndexEntry> => {
  const index: Record<string, QuestionIndexEntry> = {};
  assessmentSections.forEach((section) => {
    const category = section.category;
    if (!category) return;
    section.questions.forEach((q) => {
      index[q.id] = { question: q, section: category };
    });
  });
  return index;
};

const QUESTION_INDEX = buildQuestionIndex();
const WEIGHT_VECTORS = (assessmentMeta.weight_vectors ?? {}) as Record<
  string,
  WeightVector
>;

export function scoreAnswers(
  values: Record<string, unknown>,
  track: string
): ScoringResult {
  const questionScores: Record<string, number> = {};
  const sectionTotals: Record<keyof WeightVector, number> = {
    strategy: 0,
    data: 0,
    tools: 0,
    automation: 0,
    people: 0,
    governance: 0,
  };
  const sectionCounts: Record<keyof WeightVector, number> = {
    strategy: 0,
    data: 0,
    tools: 0,
    automation: 0,
    people: 0,
    governance: 0,
  };

  for (const [id, { question, section }] of Object.entries(QUESTION_INDEX)) {
    const ans = values[id];
    const sc = scoreQuestion(question, ans);
    questionScores[id] = sc;
    sectionTotals[section] += sc;
    sectionCounts[section] += 1;
  }

  const sectionScores: Record<string, number> = {};
  (Object.keys(sectionTotals) as Array<keyof WeightVector>).forEach((sec) => {
    const cnt = sectionCounts[sec] || 0;
    sectionScores[sec] = cnt > 0 ? sectionTotals[sec] / cnt : 0;
  });

  const weights =
    WEIGHT_VECTORS[track as keyof typeof WEIGHT_VECTORS] ??
    WEIGHT_VECTORS.GEN;

  const totalScore = (Object.keys(sectionScores) as Array<
    keyof WeightVector
  >).reduce((sum, sec) => {
    const w = weights[sec] ?? 0;
    return sum + sectionScores[sec] * (w / 100);
  }, 0);

  return { questionScores, sectionScores, totalScore, track };
}

function scoreQuestion(question: Question, answer: unknown): number {
  if (answer === undefined || answer === null || answer === "") {
    return 50;
  }
  if (typeof answer === "string" && answer.toLowerCase().includes("don't know")) {
    return 0;
  }

  const { type, scoreMap, scorePer, cap, weight, options } = question;

  if (Array.isArray(answer)) {
    // ranked
    if (type === "rank" && weight) {
      const used = weight.slice(0, answer.length).reduce((a, b) => a + b, 0);
      const max = weight.reduce((a, b) => a + b, 0);
      return max ? (used / max) * 100 : 0;
    }
    // per-item
    if (scorePer !== undefined) {
      return Math.min(answer.length * scorePer, cap ?? 100);
    }
    // Choice-based scoring for arrays
    if (options) {
      const scores = (answer as string[]).map((val) => {
        const option = options.find((opt) => opt.value === val);
        if (option?.score !== undefined) {
          return option.score;
        }
        // Fallback to scoreMap
        const idx = options.findIndex((opt) => opt.value === val);
        return idx >= 0 && scoreMap?.[idx] != null ? scoreMap[idx] : 0;
      });
      return scores.length
        ? scores.reduce((a, b) => a + b, 0) / scores.length
        : 50;
    }
  }

  if (typeof answer === "boolean") {
    return answer ? 100 : 0;
  }

  // Single choice scoring - prioritize score from choice object
  if (options && typeof answer === "string") {
    const option = options.find((opt) => opt.value === answer);
    if (option?.score !== undefined) {
      return option.score;
    }
    // Fallback to scoreMap
    const idx = options.findIndex((opt) => opt.value === answer);
    if (idx >= 0 && scoreMap?.[idx] != null) {
      return scoreMap[idx];
    }
  }

  if (typeof answer === "number") {
    return Math.max(0, Math.min(100, answer));
  }

  return 50;
}
