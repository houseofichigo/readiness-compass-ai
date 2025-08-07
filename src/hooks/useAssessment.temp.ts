// TEMPORARY STUB - Phase 1 Cleanup
// This file contains stub implementations to prevent TypeScript errors
// Will be replaced with full implementation in Phase 2

import { useState } from 'react';
import { toast } from "sonner";
import type { AssessmentValue, OrganizationProfile } from '@/types/assessment';

export function useAssessment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveAssessment = async (
    responses: Record<string, AssessmentValue>,
    profile: OrganizationProfile,
    assessmentId: string = 'ai_readiness_v2'
  ): Promise<string | null> => {
    console.warn('Database is empty - saveAssessment will be implemented in Phase 2');
    toast.error('Assessment saving temporarily disabled during database rebuild');
    return null;
  };

  const loadAssessment = async (submissionId: string) => {
    console.warn('Database is empty - loadAssessment will be implemented in Phase 2');
    toast.error('Assessment loading temporarily disabled during database rebuild');
    return null;
  };

  const getRecentAssessments = async (limit: number = 10) => {
    console.warn('Database is empty - getRecentAssessments will be implemented in Phase 2');
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