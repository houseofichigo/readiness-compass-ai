import { assessmentMeta } from "@/data/assessmentQuestions";
import { Question } from "@/types/assessment";

interface EvalContext {
  responses: Record<string, unknown>;
  track?: string;
  computed?: Record<string, unknown>;
}

export function isQuestionVisible(
  question: Question,
  responses: Record<string, unknown>,
  detectedTrack: string,
  totalVisibleQuestions: number,
  computed: Record<string, unknown> = {}
): boolean {
  if (totalVisibleQuestions >= 60) {
    if (question.id === "D2" || question.id === "P6") {
      return false;
    }
  }

  const context: EvalContext = {
    responses,
    track: detectedTrack,
    computed
  };

  if (question.show_if) {
    return evaluateCondition(question.show_if, context);
  }

  if (question.hide_if) {
    return !evaluateCondition(question.hide_if, context);
  }

  return true;
}

function evaluateCondition(condition: unknown, ctx: EvalContext): boolean {
  if (!condition) return true;

  if (Array.isArray(condition)) {
    return condition.every((c) => evaluateCondition(c, ctx));
  }

  if (typeof condition !== "object") {
    return Boolean(condition);
  }

  const condObj = condition as Record<string, unknown>;

  if ("any_of" in condObj) {
    return (condObj.any_of as unknown[]).some((c) => evaluateCondition(c, ctx));
  }

  if ("all_of" in condObj) {
    return (condObj.all_of as unknown[]).every((c) => evaluateCondition(c, ctx));
  }
  return Object.entries(condObj).every(([field, rule]) => {
    if (field === "track") {
      return matchValue(ctx.track, rule);
    }

    if (field === "computed") {
      const compRules = rule as Record<string, unknown>;
      return Object.entries(compRules).every(([key, val]) =>
        matchValue(ctx.computed?.[key], val)
      );
    }

    if (field.startsWith("computed.")) {
      const key = field.slice("computed.".length);
      return matchValue(ctx.computed?.[key], rule);
    }

    const responseValue = ctx.responses[field];
    return matchValue(responseValue, rule);
  });
}

function matchValue(source: unknown, rule: unknown): boolean {
  if (rule === undefined) return true;

  if (rule && typeof rule === "object" && !Array.isArray(rule)) {
    const objRule = rule as Record<string, unknown>;
    if ("in" in objRule) {
      const list = objRule.in as unknown[];
      if (Array.isArray(source)) {
        return source.some((v) => list.includes(v));
      }
      return list.includes(source);
    }
    if ("not_in" in objRule) {
      const list = objRule.not_in as unknown[];
      if (Array.isArray(source)) {
        return !source.some((v) => list.includes(v));
      }
      return !list.includes(source);
    }
    if ("subset_of" in objRule) {
      const list = objRule.subset_of as unknown[];
      if (Array.isArray(source)) {
        return source.every((v) => list.includes(v));
      }
      return list.includes(source);
    }
    if ("not" in objRule) {
      const notVal = objRule.not as unknown;
      if (Array.isArray(source)) {
        const arr = Array.isArray(notVal) ? notVal : [notVal];
        return !source.some((v) => arr.includes(v));
      }
      if (Array.isArray(notVal)) {
        return !notVal.includes(source);
      }
      return source !== notVal;
    }
    return Object.entries(objRule).every(([k, v]) =>
      matchValue((source as Record<string, unknown> | undefined)?.[k], v)
    );
  }

  if (Array.isArray(rule)) {
    const arrRule = rule as unknown[];
    if (Array.isArray(source)) {
      return source.some((v) => arrRule.includes(v));
    }
    return arrRule.includes(source);
  }

  return source === rule;
}

export function detectTrack(
  responses: Record<string, unknown>,
  computed: Record<string, unknown> = {}
): string {
  const precedence =
    ((assessmentMeta as Record<string, unknown>)?.track_detection as Record<
      string,
      unknown
    > | undefined)?.precedence as Array<Record<string, unknown>> | undefined ?? [];

  for (const rule of precedence) {
    const {
      track,
      if: cond,
      ...rest
    } = rule as { track?: string; if?: unknown; [key: string]: unknown };
    const condition = cond ?? rest;
    if (track && evaluateCondition(condition, { responses, computed })) {
      return track;
    }
  }

  const tracks = (assessmentMeta as Record<string, unknown>)?.tracks;
  if (tracks && typeof tracks === "object") {
    const fallback = Object.keys(tracks)[0];
    if (fallback) return fallback;
  }
  return "GEN";
}

