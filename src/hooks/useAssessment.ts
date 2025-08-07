// TEMPORARY STUB - Phase 1 Cleanup
// This file contains stub implementations to prevent TypeScript errors
// Will be replaced with full implementation in Phase 2

import { useState } from 'react';
import { toast } from "sonner";
import type { AssessmentValue, OrganizationProfile } from '@/types/assessment';
import { supabase } from '@/integrations/supabase/client';

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
      // 1) Create submission (anonymous)
      const params = new URLSearchParams(window.location.search);
      const { data: sub, error: subErr } = await supabase
        .from('submissions')
        .insert({
          completed: true,
          user_agent: navigator.userAgent,
          referrer_url: document.referrer || null,
          utm_source: params.get('utm_source'),
          utm_medium: params.get('utm_medium'),
          utm_campaign: params.get('utm_campaign'),
        })
        .select('id')
        .maybeSingle();

      if (subErr || !sub?.id) {
        setError(subErr?.message || 'Failed to create submission');
        toast.error('Failed to create submission');
        return null;
      }

      const submissionId = sub.id as string;

      // 2) Insert answers in bulk
      const answers = Object.entries(responses).map(([questionId, value]) => ({
        submission_id: submissionId,
        question_id: questionId,
        raw_response: value as any,
        chosen_value: typeof value === 'string' ? (value as string) : null,
      }));

      if (answers.length > 0) {
        const { error: ansErr } = await supabase.from('answers').insert(answers);
        if (ansErr) {
          setError(ansErr.message);
          toast.error('Failed to save answers');
          return null;
        }
      }

      toast.success('Assessment submitted');
      return submissionId;
    } catch (e: any) {
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