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
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [detectedTrack, setDetectedTrack] = useState<Track>("GEN");

  const currentSection = assessmentSections[currentSectionIndex];
  
  if (!currentSection) {
    return <div>Loading sections...</div>;
  }

  // Show ALL questions for the current section on ONE page
  const visibleQuestions = currentSection.questions || [];

  const handleAnswerChange = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
    
    // Enhanced track detection based on YAML logic
    if (questionId === 'M3') {
      // TECH track: Data/AI Lead, IT Lead, CIO/CTO
      if (['Data/AI Lead', 'IT Lead', 'CIO/CTO'].includes(value)) {
        setDetectedTrack('TECH');
      } else if (value === 'Legal/Compliance') {
        setDetectedTrack('REG');
      } else {
        // Default to GEN unless regulated industry is detected
        if (responses.M9 !== 'Yes' && responses.M9 !== 'Not sure') {
          setDetectedTrack('GEN');
        }
      }
    }
    
    // REG track: Regulated industry or Legal/Compliance role
    if (questionId === 'M9') {
      if (['Yes', 'Not sure'].includes(value)) {
        setDetectedTrack('REG');
      } else if (responses.M3 !== 'Legal/Compliance' && !['Data/AI Lead', 'IT Lead', 'CIO/CTO'].includes(responses.M3)) {
        setDetectedTrack('GEN');
      }
    }
  };

  // Check if persona questions (M3, M9) are completed to show track info
  const personaCompleted = responses.M3 && responses.M9;
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
        M4: responses.M4 || "",
        M5: responses.M5 || "",
        M6: responses.M6 || "",
        M7: responses.M7 || "",
        M8: responses.M8 || "",
        M9: responses.M9 || "",
        M10: responses.M10 || false
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
            {currentSection.consent_banner && (
              <div className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
                {currentSection.consent_banner.text}
              </div>
            )}
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