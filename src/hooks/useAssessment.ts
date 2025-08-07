import { useState } from 'react';
import { toast } from "sonner";
import type { AssessmentValue, OrganizationProfile } from '@/types/assessment';
import { supabase } from '@/integrations/supabase/client';
import { assessmentSections, assessmentAddOns } from '@/data/assessmentQuestions';
import { safeUuidV4 } from '@/utils/uuid';

export function useAssessment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveAssessment = async (
    responses: Record<string, AssessmentValue>,
    profile: OrganizationProfile,
    assessmentId: string = 'ai_readiness_v2'
  ): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Robust, valid UUID v4 for submission id across browsers
      const submissionId = safeUuidV4();
      console.log('[saveAssessment] Generated submissionId:', submissionId);

      // Track UTM params from URL
      const params = new URLSearchParams(window.location.search);

      console.log('[saveAssessment] Inserting submission...');
      const { error: subErr } = await supabase
        .from('submissions')
        .insert({
          id: submissionId,
          completed: true,
          user_agent: navigator.userAgent,
          referrer_url: document.referrer || null,
          utm_source: params.get('utm_source'),
          utm_medium: params.get('utm_medium'),
          utm_campaign: params.get('utm_campaign'),
        });

      if (subErr) {
        console.error('[saveAssessment] Submission insert failed:', subErr);
        setError(subErr.message || 'Failed to create submission');
        toast.error('Failed to create submission');
        return null;
      }

      // Build set of valid question IDs to avoid FK violations
      const sectionQuestionIds = assessmentSections.flatMap(s => (s.questions || []).map(q => q.id));
      const addOnIds = (assessmentAddOns || []).map(q => q.id);
      const validIds = new Set<string>([...sectionQuestionIds, ...addOnIds]);

      const answers = Object.entries(responses)
        .filter(([questionId]) => validIds.has(questionId))
        .map(([questionId, value]) => ({
          submission_id: submissionId,
          question_id: questionId,
          raw_response: value ?? null,
          chosen_value: typeof value === 'string' ? (value as string) : null,
        }));

      console.log('[saveAssessment] Prepared answers count:', answers.length);

      if (answers.length > 0) {
        console.log('[saveAssessment] Inserting answers batch...');
        const { error: ansErr } = await supabase
          .from('answers')
          .insert(answers);

        if (ansErr) {
          console.error('[saveAssessment] Answers insert failed:', ansErr, { firstAnswer: answers[0] });
          setError(ansErr.message);
          toast.error('Failed to save answers');
          return null;
        }
      } else {
        console.warn('[saveAssessment] No valid answers to insert (all filtered or empty).');
      }

      toast.success('Assessment submitted');
      console.log('[saveAssessment] Completed OK for submission:', submissionId);
      return submissionId;
    } catch (e: any) {
      console.error('[saveAssessment] Unexpected error:', e);
      setError(e?.message || 'Unexpected error');
      toast.error('Unexpected error submitting assessment');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const loadAssessment = async (submissionId: string) => {
    return null;
  };

  const getRecentAssessments = async (limit: number = 10) => {
    return [];
  };

  return {
    saveAssessment,
    loadAssessment,
    getRecentAssessments,
    isLoading,
    error,
  };
}
