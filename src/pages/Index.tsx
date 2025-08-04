import { useState } from "react";
import { AssessmentWelcome } from "@/components/assessment/AssessmentWelcome";
import { AssessmentFlow } from "@/components/assessment/AssessmentFlow";
import { AssessmentResults } from "@/components/assessment/AssessmentResults";
import {
  AssessmentData,
  AssessmentResponse,
  OrganizationProfile,
  Track
} from "@/types/assessment";
import { assessmentSections } from "@/data/schema";

type AppState = "welcome" | "assessment" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("welcome");
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(
    null
  );

  const handleStartAssessment = () => {
    setAppState("assessment");
  };

  const handleAssessmentComplete = (
    responses: AssessmentResponse[],
    profile: OrganizationProfile,
    track: Track
  ) => {
    const data: AssessmentData = {
      id: `${Date.now()}`,
      sections: assessmentSections,
      profile,
      track,
      responses: {},
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
          responses={Object.values(assessmentData.responses || {})}
          profile={assessmentData.profile}
          track={assessmentData.track}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;