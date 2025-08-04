import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Save, CheckCircle } from "lucide-react";
import { QuestionCard } from "./QuestionCard";
import { assessmentSections } from "@/data/assessmentQuestions";
import { AssessmentResponse, Track, OrganizationProfile } from "@/types/assessment";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { isQuestionVisible, detectTrack } from "@/utils/questionVisibility";
import { validateSection } from "@/utils/validation";
import { scoreAnswers } from "@/utils/scoring";

interface AssessmentFlowProps {
  onComplete: (responses: AssessmentResponse[], profile: OrganizationProfile, track: Track) => void;
}

export function AssessmentFlow({ onComplete }: AssessmentFlowProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [responses, setResponses] = useLocalStorage<Record<string, any>>(
    'ai-assessment-responses', 
    {}
  );
  const [completedSections, setCompletedSections] = useLocalStorage<number[]>(
    'ai-assessment-completed', 
    []
  );
  const [detectedTrack, setDetectedTrack] = useState<Track>("GEN");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const currentSection = assessmentSections[currentSectionIndex];
  
  // Safety check for no sections loaded
  if (!assessmentSections || assessmentSections.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Loading Assessment...</h2>
          <p className="text-muted-foreground">Please wait while we load the assessment questions.</p>
        </div>
      </div>
    );
  }

  // Get ALL visible questions for current section (no question cap per section)
  const visibleQuestions = currentSection?.questions?.filter((question: any) => 
    isQuestionVisible(question, responses, detectedTrack, 999) // High number to show all questions
  ) || [];

  // Track detection based on M3 and M9 responses
  useEffect(() => {
    if (responses.M3 || responses.M9) {
      const track = detectTrack(responses) as Track;
      setDetectedTrack(track);
    }
  }, [responses.M3, responses.M9]);

  // Auto-save responses (limited to prevent infinite loops)
  useEffect(() => {
    const hasResponses = Object.keys(responses).length > 0;
    if (hasResponses) {
      const timeoutId = setTimeout(() => {
        toast({
          title: "Progress saved",
          description: "Your responses are automatically saved.",
          duration: 2000,
        });
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [Object.keys(responses).length]);

  const handleAnswerChange = (questionId: string, value: any) => {
    setResponses(prev => {
      const updated = { ...prev, [questionId]: value };
      
      // Auto-deselect "None" in multi-selects when other options are selected
      if (Array.isArray(value) && value.includes('None') && value.length > 1) {
        updated[questionId] = value.filter((v: any) => v !== 'None');
      }
      
      return updated;
    });
    
    // Clear validation error for this field
    if (validationErrors[questionId]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[questionId];
        return updated;
      });
    }
  };

  const validateCurrentSection = () => {
    const visibleQuestionIds = visibleQuestions.map((q: any) => q.id);
    const validation = validateSection(visibleQuestions, responses, visibleQuestionIds);
    setValidationErrors(validation.errors);
    return validation.isValid;
  };

  const goToNextSection = () => {
    if (!validateCurrentSection()) {
      toast({
        title: "Section incomplete",
        description: "Please answer all required questions before continuing.",
        variant: "destructive"
      });
      return;
    }

    if (currentSectionIndex < assessmentSections.length - 1) {
      setCompletedSections(prev => [...prev.filter(i => i !== currentSectionIndex), currentSectionIndex]);
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      // Assessment complete
      handleAssessmentComplete();
    }
  };

  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const saveProgress = () => {
    toast({
      title: "Progress saved",
      description: "You can resume this assessment later.",
    });
  };

  const handleAssessmentComplete = () => {
    // Gather all responses for the profile
    const allResponses: AssessmentResponse[] = Object.entries(responses).map(([questionId, answer]) => ({
      questionId,
      value: answer,
      sectionId: findSectionForQuestion(questionId)
    }));

    // Create organization profile from M-series responses
    const profile: OrganizationProfile = {
      M1: responses.M1 || "",
      M2: responses.M2 || "",
      M3: responses.M3 || "",
      M3_other: responses.M3_other,
      M4: responses.M4 || "",
      M4_other: responses.M4_other,
      M5: responses.M5 || "",
      M6: responses.M6 || "",
      M7: responses.M7 || "",
      M8: responses.M8 || "",
      M9: responses.M9 || "",
      M10: responses.M10 || false
    };

    onComplete(allResponses, profile, detectedTrack);
  };

  const findSectionForQuestion = (questionId: string): string => {
    for (const section of assessmentSections) {
      if (section.questions.some(q => q.id === questionId)) {
        return section.id;
      }
    }
    return 'unknown';
  };

  if (!currentSection) {
    return <div>Loading...</div>;
  }

  const sectionProgress = ((currentSectionIndex + 1) / assessmentSections.length) * 100;
  const answeredInSection = visibleQuestions.filter((q: any) => responses[q.id] !== undefined).length;

  return (
    <div className="min-h-screen bg-gradient-accent p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Progress Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-sm">
                  Section {currentSectionIndex + 1} of {assessmentSections.length}
                </Badge>
                {detectedTrack !== "GEN" && (
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {detectedTrack === "TECH" ? "Technical Track" : 
                     detectedTrack === "REG" ? "Regulated Track" : "General Track"}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{Math.round(sectionProgress)}%</span>
                </div>
                <Progress value={sectionProgress} className="h-2" />
              </div>

              {/* Section Navigation Pills */}
              <div className="flex gap-2 flex-wrap">
                {assessmentSections.map((section, index) => {
                  const isCompleted = completedSections.includes(index);
                  const isCurrent = index === currentSectionIndex;
                  
                  return (
                    <div 
                      key={section.id}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                        isCompleted 
                          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                          : isCurrent
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'bg-muted hover:bg-muted/80'
                      }`}
                      onClick={() => {
                        if (isCompleted || index <= currentSectionIndex) {
                          setCurrentSectionIndex(index);
                        }
                      }}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <div className="h-3 w-3 rounded-full border-2 border-current" />
                      )}
                      <span className="hidden sm:inline truncate">{section.title}</span>
                      <span className="sm:hidden">{index + 1}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

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
            {/* Render ALL visible questions for the current section */}
            {visibleQuestions.map((question: any, questionIndex: number) => (
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
                    {validationErrors[question.id] && (
                      <p className="text-sm text-destructive mt-2">
                        {validationErrors[question.id]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            {currentSectionIndex > 0 && (
              <Button
                variant="outline"
                onClick={goToPreviousSection}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous Section
              </Button>
            )}
          </div>

          <div className="flex gap-2 sm:ml-auto">
            <Button
              variant="outline"
              onClick={saveProgress}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Progress
            </Button>
            
            <Button
              onClick={goToNextSection}
              disabled={Object.keys(validationErrors).length > 0}
              className="flex items-center gap-2 bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              {currentSectionIndex === assessmentSections.length - 1 ? (
                "Complete Assessment"
              ) : (
                "Next Section"
              )}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}