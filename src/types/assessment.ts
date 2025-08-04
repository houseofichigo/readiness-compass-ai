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

/** Build a map from question ID → { question, its weight‐vector category } */
function buildQuestionIndex(): Record<string, QuestionIndexEntry> {
  const index: Record<string, QuestionIndexEntry> = {};
  for (const section of assessmentSections) {
    const category = SECTION_CATEGORY_MAP[section.title];
    if (!category) continue;
    for (const q of section.questions) {
      index[q.id] = { question: q, section: category };
    }
  }
  return index;
}

const QUESTION_INDEX = buildQuestionIndex();

/**
 * The YAML provides `weight_vectors` under assessmentMeta.
 * Fallback to an empty object if missing.
 */
const WEIGHT_VECTORS = (assessmentMeta.weight_vectors ?? {}) as Record<
  string,
  WeightVector
>;

/**
 * Score all answers, returning per‐question, per‐section, and total weighted score.
 */
export function scoreAnswers(
  values: Record<string, unknown>,
  track: string
): ScoringResult {
  const questionScores: Record<string, number> = {};
  // Totals & counts per weight‐vector dimension
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

  // Score each indexed question
  for (const [id, { question, section }] of Object.entries(QUESTION_INDEX)) {
    const ans = values[id];
    const score = scoreQuestion(question, ans);
    questionScores[id] = score;
    sectionTotals[section] += score;
    sectionCounts[section] += 1;
  }

  // Compute average score per section
  const sectionScores: Record<string, number> = {};
  for (const dim of Object.keys(sectionTotals) as Array<keyof WeightVector>) {
    const count = sectionCounts[dim];
    sectionScores[dim] = count > 0 ? sectionTotals[dim] / count : 0;
  }

  // Grab the vector for this track (fallback to GEN)
  const weights =
    WEIGHT_VECTORS[track as keyof typeof WEIGHT_VECTORS] ??
    WEIGHT_VECTORS.GEN;

  // Weighted total across dimensions
  const totalScore = (Object.keys(sectionScores) as Array<
    keyof WeightVector
  >).reduce((sum, dim) => sum + sectionScores[dim] * (weights[dim] / 100), 0);

  return {
    questionScores,
    sectionScores,
    totalScore,
    track,
  };
}

/**
 * Score a single answer according to its question definition.
 * - Unanswered → 50
 * - “Don’t know” text → 0
 * - Arrays (ranked, multi) → various strategies
 * - Boolean → 100 / 0
 * - Mapped selects → score_map
 * - Numeric → clamped to [0,100]
 * - Else → 50
 */
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

  // Multi‐value answers
  if (Array.isArray(answer)) {
    // “rank” type uses its own weight array
    if (type === "rank" && weight) {
      const used = weight.slice(0, answer.length).reduce((a, b) => a + b, 0);
      const max = weight.reduce((a, b) => a + b, 0);
      return max === 0 ? 0 : (used / max) * 100;
    }
    // per-selection scoring
    if (score_per !== undefined) {
      return Math.min(answer.length * score_per, cap ?? 100);
    }
    // map selections via score_map
    if (score_map && options) {
      const scores = (answer as string[]).map((val) => {
        const idx = options.findIndex((opt) => opt.value === val);
        return idx >= 0 && score_map[idx] != null ? score_map[idx] : 0;
      });
      return scores.length > 0
        ? scores.reduce((a, b) => a + b, 0) / scores.length
        : 50;
    }
  }

  // Boolean
  if (typeof answer === "boolean") {
    return answer ? 100 : 0;
  }

  // Single‐select mapping
  if (score_map && options && typeof answer === "string") {
    const idx = options.findIndex((opt) => opt.value === answer);
    if (idx >= 0 && score_map[idx] != null) {
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
