import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AssessmentWelcome } from "@/components/assessment/AssessmentWelcome";
import { AssessmentFlow } from "@/components/assessment/AssessmentFlow";
import { AssessmentResults } from "@/components/assessment/AssessmentResults";
import {
  AssessmentData,
  AssessmentResponse,
  AssessmentValue,
  OrganizationProfile,
  Track
} from "@/types/assessment";
import { assessmentSections } from "@/data/assessmentQuestions";
import { useAssessment } from "@/hooks/useAssessment";

type AppState = "welcome" | "assessment" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("assessment");
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(
    null
  );
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const { saveAssessment, isLoading } = useAssessment();
  const navigate = useNavigate();

  const handleAssessmentComplete = async (
    responses: Record<string, AssessmentValue>,
    profile: OrganizationProfile
  ) => {
    // Save to database first
    const savedSubmissionId = await saveAssessment(responses, profile);
    
    if (savedSubmissionId) {
      setSubmissionId(savedSubmissionId);
    }

    // Create assessment data for navigation
    const data: AssessmentData = {
      id: savedSubmissionId || `${Date.now()}`,
      sections: assessmentSections,
      profile,
      track: profile.track || 'GEN',
      responses: Object.entries(responses).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: { questionId: key, value, sectionId: 'unknown' }
      }), {}),
      completedSections: [],
      totalScore: 0,
      sectionScores: {},
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Navigate to thank you page with assessment data
    navigate('/thank-you', { 
      state: { 
        assessmentData: data 
      } 
    });
  };

  const handleRestart = () => {
    setAssessmentData(null);
    setAppState("assessment");
  };

  return (
    <div className="min-h-screen bg-gradient-accent">
      {appState === "assessment" && (
        <AssessmentFlow onComplete={handleAssessmentComplete} />
      )}
      
      {appState === "results" && assessmentData && (
        <AssessmentResults
          responses={Object.values(assessmentData.responses || {})}
          profile={assessmentData.profile}
          track={assessmentData.track}
          submissionId={submissionId}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;