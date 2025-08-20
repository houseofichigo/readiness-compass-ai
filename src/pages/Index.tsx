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
    console.log('[Index] handleAssessmentComplete called with:', {
      responseCount: Object.keys(responses).length,
      orgName: profile?.M0?.substring(0, 20) + '...',
      track: profile?.track
    });
    
    if (Object.keys(responses).length === 0) {
      Logger.error("🚨 CRITICAL: No responses data to save!");
      throw new Error("No responses data to save");
    }
    
    if (!profile?.M0 || profile.M0.trim().length < 2) {
      Logger.error("🚨 CRITICAL: Invalid organization name!");
      throw new Error("Organization name is required and must be at least 2 characters long");
    }
    
    try {
      // Save to database first
      console.log('[Index] Calling saveAssessment...');
      const savedSubmissionId = await saveAssessment(responses, profile);
      
      if (savedSubmissionId) {
        console.log('[Index] Assessment saved successfully, navigating to thank you page');
        setSubmissionId(savedSubmissionId);
        
        // Navigate to thank you page using React Router
        try {
          navigate(`/thank-you?submissionId=${savedSubmissionId}`, { 
            state: { submissionId: savedSubmissionId } 
          });
          console.log('[Index] Navigation completed successfully');
        } catch (navError) {
          console.error('[Index] Navigation error:', navError);
          throw new Error(`Navigation failed: ${navError}`);
        }
        
      } else {
        Logger.error("❌ Failed to save assessment - no submission ID returned");
        throw new Error("Failed to save assessment to database - no submission ID returned");
      }
    } catch (error: any) {
      Logger.error("❌ Assessment completion failed:", error);
      // Re-throw with more context
      throw new Error(error?.message || "Failed to save assessment to database");
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