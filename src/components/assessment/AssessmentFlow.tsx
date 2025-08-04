import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { QuestionCard } from "./QuestionCard";
import { AssessmentProgressBar } from "./AssessmentProgressBar";
import { assessmentSections } from "@/data/assessmentQuestions";
import { AssessmentResponse, Track, OrganizationProfile } from "@/types/assessment";

interface AssessmentFlowProps {
  onComplete: (responses: AssessmentResponse[], profile: OrganizationProfile, track: Track) => void;
}

export function AssessmentFlow({ onComplete }: AssessmentFlowProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, unknown>>({});
  const [detectedTrack, setDetectedTrack] = useState<Track>("GEN");

  const regulatedIndustries = [
    "Finance & Insurance",
    "Health Care & Social Assistance",
    "Utilities (Electricity, Gas, Water & Waste)",
    "Transportation & Warehousing",
    "Manufacturing",
    "Information & Communication Technology",
    "Professional, Scientific & Technical Services",
    "Administrative & Support & Waste Management Services",
    "Accommodation & Food Services",
  ];

  const currentSection = assessmentSections[currentSectionIndex];
  
  if (!currentSection) {
    return <div>Loading sections...</div>;
  }

  // Show ALL questions for the current section on ONE page
  const visibleQuestions = currentSection.questions || [];

  const handleAnswerChange = (questionId: string, value: unknown) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));

    // Enhanced track detection based on YAML logic
    if (questionId === "M3" || questionId === "M4_industry") {
      const role = (questionId === "M3" ? value : responses.M3) as string;
      const industry = (questionId === "M4_industry" ? value : responses.M4_industry) as string;

      if (["Data / AI Lead", "IT Lead", "CIO / CTO"].includes(role)) {
        setDetectedTrack("TECH");
      } else if (
        role === "Legal / Compliance Lead" ||
        regulatedIndustries.includes(industry)
      ) {
        setDetectedTrack("REG");
      } else {
        setDetectedTrack("GEN");
      }
    }
  };

  // Check if persona questions are completed to show track info
  const personaCompleted = responses.M3 && responses.M4_industry;
  const completedSections = currentSectionIndex; // sections fully completed
  
  const goToNextSection = () => {
    if (currentSectionIndex < assessmentSections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      // Complete assessment
      const allResponses: AssessmentResponse[] = Object.entries(responses).map(([questionId, value]) => ({
        questionId,
        value,
        sectionId: findSectionForQuestion(questionId)
      }));

      const profile: OrganizationProfile = {
        M0: responses.M0 || "",
        M1: responses.M1 || "",
        M2: responses.M2 || "",
        M3: responses.M3 || "",
        M3_other: responses.M3_other || "",
        M4_industry: responses.M4_industry || "",
        M4_sub: responses.M4_sub || "",
        M5_country: responses.M5_country || "",
        M6_size: responses.M6_size || "",
        M7_revenue: responses.M7_revenue || "",
        M8_consent: responses.M8_consent || false,
      };

      onComplete(allResponses, profile, detectedTrack);
    }
  };

  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const findSectionForQuestion = (questionId: string): string => {
    for (const section of assessmentSections) {
      if (section.questions.some(q => q.id === questionId)) {
        return section.id;
      }
    }
    return 'unknown';
  };

  const answeredInSection = visibleQuestions.filter(q => responses[q.id] !== undefined).length;

  return (
    <div className="min-h-screen bg-gradient-accent p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Progress Header */}
        <div className="mb-6">
          <AssessmentProgressBar
            currentSectionIndex={currentSectionIndex}
            totalSections={assessmentSections.length}
            completedSections={completedSections}
            detectedTrack={detectedTrack}
            showTrackInfo={personaCompleted}
          />
        </div>

        {/* Current Section - ALL QUESTIONS ON ONE PAGE */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">{currentSection.title}</CardTitle>
            <p className="text-muted-foreground">{currentSection.purpose}</p>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Questions in this section</span>
              <span>{answeredInSection} / {visibleQuestions.length} answered</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Render ALL questions for the current section */}
            {visibleQuestions.map((question, questionIndex) => (
              <div key={question.id} className="space-y-2">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1 text-xs">
                    {questionIndex + 1}
                  </Badge>
                  <div className="flex-1">
                    <QuestionCard
                      question={question}
                      value={responses[question.id]}
                      onChange={(value) => handleAnswerChange(question.id, value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <div>
            {currentSectionIndex > 0 && (
              <Button
                variant="outline"
                onClick={goToPreviousSection}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
            )}
          </div>

          <Button
            onClick={goToNextSection}
            className="flex items-center gap-2"
          >
            {currentSectionIndex === assessmentSections.length - 1 ? "Complete" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}