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
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">AI Readiness Assessment v2.0</h1>
        <p className="text-lg text-muted-foreground mb-8">Testing the application setup</p>
        <button 
          onClick={() => setAppState("assessment")}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg"
        >
          Test Button
        </button>
        <div className="mt-4 text-sm">
          Current state: {appState}
        </div>
      </div>
      
      {appState === "welcome" && (
        <div className="p-4 border rounded">Welcome component would load here</div>
      )}
      
      {appState === "assessment" && (
        <div className="p-4 border rounded">Assessment component would load here</div>
      )}
      
      {appState === "results" && assessmentData && (
        <div className="p-4 border rounded">Results component would load here</div>
      )}
    </div>
  );
};

export default Index;
