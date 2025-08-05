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
  const navigate = useNavigate();
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
    console.log("📋 INDEX - Saving assessment with", Object.keys(responses).length, "responses");
    
    if (Object.keys(responses).length === 0) {
      console.error("🚨 CRITICAL: No responses data to save!");
      throw new Error("No responses data to save");
    }
    
    // Save to database first
    const savedSubmissionId = await saveAssessment(responses, profile);
    
    if (savedSubmissionId) {
      console.log("✅ Assessment saved successfully, navigating to thank-you page");
      setSubmissionId(savedSubmissionId);
      
      // Navigate to thank you page using React Router
      navigate(`/thank-you?submissionId=${savedSubmissionId}`, { 
        state: { submissionId: savedSubmissionId } 
      });
      
    } else {
      console.error("❌ Failed to save assessment - no submission ID returned");
      throw new Error("Failed to save assessment to database");
    }
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