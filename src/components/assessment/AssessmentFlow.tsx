import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionGrid } from "./QuestionGrid";
import { ProgressHeader } from "./ProgressHeader";
import { StickyFooter } from "./StickyFooter";
import { assessmentSections } from "@/data/assessmentQuestions";
import { AssessmentResponse, Track, OrganizationProfile } from "@/types/assessment";
import { useAssessmentState } from "@/hooks/useAssessmentState";
import { isQuestionVisible } from "@/utils/questionVisibility";

interface AssessmentFlowProps {
  onComplete: (responses: AssessmentResponse[], profile: OrganizationProfile, track: Track) => void;
}

export function AssessmentFlow({ onComplete }: AssessmentFlowProps) {
  const {
    responses,
    currentSectionIndex,
    detectedTrack,
    updateResponse,
    goToSection,
    getAssessmentData
  } = useAssessmentState();
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasScrolledToNew, setHasScrolledToNew] = useState(false);

  const currentSection = assessmentSections[currentSectionIndex];
  
  if (!currentSection) {
    return <div>Loading sections...</div>;
  }

  // Filter visible questions based on conditions and track
  const visibleQuestions = currentSection.questions.filter(question => 
    isQuestionVisible(question, responses, detectedTrack, currentSection.questions.length)
  );

  const handleAnswerChange = (questionId: string, value: any) => {
    const previousVisibleCount = visibleQuestions.length;
    updateResponse(questionId, value);
    
    // Check if new questions became visible and scroll to them
    setTimeout(() => {
      const newVisibleQuestions = currentSection.questions.filter(question => 
        isQuestionVisible(question, { ...responses, [questionId]: value }, detectedTrack, currentSection.questions.length)
      );
      
      if (newVisibleQuestions.length > previousVisibleCount && !hasScrolledToNew) {
        const firstNewQuestion = newVisibleQuestions[previousVisibleCount];
        if (firstNewQuestion) {
          const element = document.getElementById(`question-${firstNewQuestion.id}`);
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHasScrolledToNew(true);
          setTimeout(() => setHasScrolledToNew(false), 1000);
        }
      }
    }, 100);
  };

  // Check if persona questions (M3, M9) are completed to show track info
  const personaCompleted = responses.M3 && responses.M9;
  
  const goToNextSection = () => {
    if (currentSectionIndex < assessmentSections.length - 1) {
      goToSection(currentSectionIndex + 1);
    } else {
      // Complete assessment
      const { responses: allResponses, profile, track } = getAssessmentData();
      onComplete(allResponses, profile, track);
    }
  };

  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      goToSection(currentSectionIndex - 1);
    }
  };

  const answeredInSection = visibleQuestions.filter(q => responses[q.id] !== undefined).length;
  const canGoNext = answeredInSection === visibleQuestions.length;

  return (
    <div className="min-h-screen bg-gradient-accent pb-20">
      {/* Sticky Progress Header */}
      <ProgressHeader
        currentSectionIndex={currentSectionIndex}
        totalSections={assessmentSections.length}
        answeredInSection={answeredInSection}
        totalInSection={visibleQuestions.length}
        sectionTitle={currentSection.title}
        detectedTrack={detectedTrack}
        showTrackInfo={personaCompleted}
      />

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-6" ref={scrollRef}>
        <Card className="mb-6 shadow-lg">
          <CardHeader className="pb-4">
            <p className="text-muted-foreground text-lg">{currentSection.purpose}</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Enhanced Question Grid */}
            <div id="questions-container">
              {visibleQuestions.map((question, questionIndex) => (
                <div 
                  key={question.id} 
                  id={`question-${question.id}`}
                  className="mb-8 last:mb-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium mt-1 shrink-0">
                      {questionIndex + 1}
                    </div>
                    <div className="flex-1">
                      <QuestionGrid
                        questions={[question]}
                        responses={responses}
                        onAnswerChange={handleAnswerChange}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Footer */}
      <StickyFooter
        onPrevious={currentSectionIndex > 0 ? goToPreviousSection : undefined}
        onNext={goToNextSection}
        canGoNext={canGoNext}
        isLastSection={currentSectionIndex === assessmentSections.length - 1}
        showPrevious={currentSectionIndex > 0}
      />
    </div>
  );
}