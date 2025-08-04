// src/utils/scoring.ts

import { assessmentSections, assessmentMeta } from "@/data/assessmentQuestions";
import type { Question, WeightVector } from "@/types/assessment";

export interface ScoringResult {
  questionScores: Record<string, number>;
  totalScore: number;
  sectionScores: Record<string, number>;
  track: string;
}

/** Map section titles to the categories used in weight vectors */
const SECTION_CATEGORY_MAP: Record<string, keyof WeightVector> = {
  "Strategy & Use-Case Readiness": "Strategy",
  "Data Foundation & Security": "Data",
  "Tool Stack & Integration": "Tools",
  "Automation & AI Agents": "Automation",
  "Team Capability & Culture": "People",
  "Governance, Risk & Ethics": "Governance",
};

interface QuestionIndexEntry {
  question: Question;
  section: keyof WeightVector;
}

const buildQuestionIndex = (): Record<string, QuestionIndexEntry> => {
  const index: Record<string, QuestionIndexEntry> = {};
  assessmentSections.forEach((section) => {
    const category = SECTION_CATEGORY_MAP[section.title];
    if (!category) return;
    section.questions.forEach((q) => {
      index[q.id] = { question: q, section: category };
    });
  });
  return index;
};

const QUESTION_INDEX = buildQuestionIndex();

// YAML provides a `weight_vectors` map under `assessmentMeta`
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
    Strategy: 0,
    Data: 0,
    Tools: 0,
    Automation: 0,
    People: 0,
    Governance: 0,
  };
  const sectionCounts: Record<keyof WeightVector, number> = {
    Strategy: 0,
    Data: 0,
    Tools: 0,
    Automation: 0,
    People: 0,
    Governance: 0,
  };

  for (const [id, { question, section }] of Object.entries(QUESTION_INDEX)) {
    const answer = values[id];
    const score = scoreQuestion(question, answer);
    questionScores[id] = score;
    sectionTotals[section] += score;
    sectionCounts[section] += 1;
  }

  // Compute average per section
  const sectionScores: Record<string, number> = {};
  (Object.keys(sectionTotals) as Array<keyof WeightVector>).forEach(
    (section) => {
      const count = sectionCounts[section] || 0;
      sectionScores[section] = count > 0 ? sectionTotals[section] / count : 0;
    }
  );

  // Apply track-specific weights
  const weights =
    WEIGHT_VECTORS[track as keyof typeof WEIGHT_VECTORS] ??
    WEIGHT_VECTORS.GEN;

  // Compute weighted total
  const totalScore = (Object.keys(sectionScores) as Array<
    keyof WeightVector
  >).reduce((sum, section) => {
    const w = weights[section] ?? 0;
    return sum + sectionScores[section] * (w / 100);
  }, 0);

  return {
    questionScores,
    totalScore,
    sectionScores,
    track,
  };
}

function scoreQuestion(question: Question, answer: unknown): number {
  if (answer === undefined || answer === null || answer === "") {
    return 50;
  }

  if (
    typeof answer === "string" &&
    answer.toLowerCase().includes("don't know")
  ) {
    return 0;
  }

  const { type, score_map, score_per, cap, weight, options } = question;

  // Arrays (multi, rank, etc.)
  if (Array.isArray(answer)) {
    // Ranked
    if (type === "rank" && weight) {
      const used = weight.slice(0, answer.length).reduce((a, b) => a + b, 0);
      const max = weight.reduce((a, b) => a + b, 0);
      return max === 0 ? 0 : (used / max) * 100;
    }
    // Per-item
    if (score_per !== undefined) {
      const raw = answer.length * score_per;
      return Math.min(raw, cap ?? 100);
    }
    // Mapped options
    if (score_map && options) {
      const scores = (answer as string[]).map((val) => {
        const idx = options.findIndex((opt) => opt.value === val);
        return idx >= 0 && score_map[idx] !== undefined ? score_map[idx] : 0;
      });
      return scores.length
        ? scores.reduce((a, b) => a + b, 0) / scores.length
        : 50;
    }
  }

  // Boolean
  if (typeof answer === "boolean") {
    return answer ? 100 : 0;
  }

  // Single select mapped
  if (score_map && options) {
    const idx = options.findIndex((opt) => opt.value === answer);
    if (idx >= 0 && score_map[idx] !== undefined) {
      return score_map[idx];
    }
  }

  // Numeric
  if (typeof answer === "number") {
    return Math.max(0, Math.min(100, answer));
  }

  // Fallback neutral
  return 50;
}
