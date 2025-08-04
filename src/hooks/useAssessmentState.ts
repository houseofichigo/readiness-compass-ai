import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Track, AssessmentResponse, OrganizationProfile } from '@/types/assessment';
import { detectTrack } from '@/utils/questionVisibility';

export function useAssessmentState() {
  const [responses, setResponses] = useLocalStorage<Record<string, any>>('assessment-responses', {});
  const [currentSectionIndex, setCurrentSectionIndex] = useLocalStorage<number>('assessment-section', 0);
  const [detectedTrack, setDetectedTrack] = useState<Track>('GEN');

  // Update track when responses change
  useEffect(() => {
    const track = detectTrack(responses) as Track;
    setDetectedTrack(track);
  }, [responses]);

  const updateResponse = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const clearSectionResponses = (sectionId: string, questionIds: string[]) => {
    setResponses(prev => {
      const updated = { ...prev };
      questionIds.forEach(id => {
        delete updated[id];
      });
      return updated;
    });
  };

  const goToSection = (sectionIndex: number) => {
    setCurrentSectionIndex(sectionIndex);
  };

  const resetAssessment = () => {
    setResponses({});
    setCurrentSectionIndex(0);
    setDetectedTrack('GEN');
  };

  const getAssessmentData = (): {
    responses: AssessmentResponse[];
    profile: OrganizationProfile;
    track: Track;
  } => {
    const allResponses: AssessmentResponse[] = Object.entries(responses).map(([questionId, value]) => ({
      questionId,
      value,
      sectionId: 'auto-detected' // This would be enhanced with proper section mapping
    }));

    const profile: OrganizationProfile = {
      M1: responses.M1 || "",
      M2: responses.M2 || "",
      M3: responses.M3 || "",
      M4: responses.M4 || "",
      M5: responses.M5 || "",
      M6: responses.M6 || "",
      M7: responses.M7 || "",
      M8: responses.M8 || "",
      M9: responses.M9 || "",
      M10: responses.M10 || false
    };

    return {
      responses: allResponses,
      profile,
      track: detectedTrack
    };
  };

  return {
    responses,
    currentSectionIndex,
    detectedTrack,
    updateResponse,
    clearSectionResponses,
    goToSection,
    resetAssessment,
    getAssessmentData
  };
}