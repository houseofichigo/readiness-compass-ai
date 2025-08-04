import { useState } from "react";
import { AssessmentWelcome } from "@/components/assessment/AssessmentWelcome";
import { AssessmentFlow } from "@/components/assessment/AssessmentFlow";
import { AssessmentResults } from "@/components/assessment/AssessmentResults";
import { AssessmentResponse, OrganizationProfile, Track } from "@/types/assessment";

type AppState = "welcome" | "assessment" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("welcome");
  const [assessmentData, setAssessmentData] = useState<{
    responses: AssessmentResponse[];
    profile: OrganizationProfile;
    track: Track;
  } | null>(null);

  const handleStartAssessment = () => {
    setAppState("assessment");
  };

  const handleAssessmentComplete = (
    responses: AssessmentResponse[], 
    profile: OrganizationProfile, 
    track: Track
  ) => {
    setAssessmentData({ responses, profile, track });
    setAppState("results");
  };

  const handleRestart = () => {
    setAssessmentData(null);
    setAppState("welcome");
  };

  return (
    <div className="min-h-screen bg-gradient-accent">
      {appState === "welcome" && (
        <AssessmentWelcome onStart={handleStartAssessment} />
      )}
      
      {appState === "assessment" && (
        <AssessmentFlow onComplete={handleAssessmentComplete} />
      )}
      
      {appState === "results" && assessmentData && (
        <AssessmentResults
          responses={assessmentData.responses}
          profile={assessmentData.profile}
          track={assessmentData.track}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;