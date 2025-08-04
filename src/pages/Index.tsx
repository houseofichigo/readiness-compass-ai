import { useState } from "react";
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

  const handleAssessmentComplete = async (
    responses: Record<string, AssessmentValue>,
    profile: OrganizationProfile
  ) => {
    console.log("📝 Starting to save assessment to database...");
    console.log("Profile data:", profile);
    console.log("Response count:", Object.keys(responses).length);
    
    // Save to database first
    const savedSubmissionId = await saveAssessment(responses, profile);
    
    if (savedSubmissionId) {
      console.log("✅ Assessment saved with ID:", savedSubmissionId);
      setSubmissionId(savedSubmissionId);
    } else {
      console.error("❌ Failed to save assessment");
      throw new Error("Failed to save assessment to database");
    }

    // Create local data for immediate display
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

    setAssessmentData(data);
    setAppState("results");
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