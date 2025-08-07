import { useState, useEffect } from "react";
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
import { Logger } from "@/utils/logger";
import { healthCheck } from "@/utils/healthCheck";
import { SEO } from "@/components/SEO";

type AppState = "welcome" | "assessment" | "results";

const Index = () => {
  const navigate = useNavigate();
  const [appState, setAppState] = useState<AppState>("assessment");
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(
    null
  );
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const { saveAssessment } = useAssessment();

  // Production health check on mount
  useEffect(() => {
    if (import.meta.env.PROD) {
      healthCheck.checkServices().then(result => {
        if (result.status !== 'healthy') {
          // Health issues handled silently in production
        }
      });
    }
  }, []);

  const handleAssessmentComplete = async (
    responses: Record<string, AssessmentValue>,
    profile: OrganizationProfile
  ) => {
    
    if (Object.keys(responses).length === 0) {
      Logger.error("🚨 CRITICAL: No responses data to save!");
      throw new Error("No responses data to save");
    }
    
    // Save to database first
    const savedSubmissionId = await saveAssessment(responses, profile);
    
    if (savedSubmissionId) {
      
      setSubmissionId(savedSubmissionId);
      
      // Navigate to thank you page using React Router
      navigate(`/thank-you?submissionId=${savedSubmissionId}`, { 
        state: { submissionId: savedSubmissionId } 
      });
      
    } else {
      Logger.error("❌ Failed to save assessment - no submission ID returned");
      throw new Error("Failed to save assessment to database");
    }
  };

  const handleRestart = () => {
    setAssessmentData(null);
    setAppState("assessment");
  };

  return (
    <>
      <SEO
        title="AI Readiness Assessment | House of Ichigo"
        description="Assess your organization's AI readiness across strategy, data, tools, automation, people, and governance."
        canonical="https://www.ai.houseofichigo.com/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'AI Readiness Assessment',
          url: 'https://www.ai.houseofichigo.com/',
          description: "Assess your organization's AI readiness across strategy, data, tools, automation, people, and governance."
        }}
      />
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
    </>
  );
};

export default Index;