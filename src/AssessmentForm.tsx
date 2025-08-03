import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Save, CheckCircle, Circle } from "lucide-react";
import { QuestionCard } from "./components/assessment/QuestionCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";
import { validateSection } from "@/utils/validation";
import { isQuestionVisible, detectTrack } from "@/utils/questionVisibility";

interface AssessmentFormProps {
  schema: any;
}

export default function AssessmentForm({ schema }: AssessmentFormProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [responses, setResponses] = useLocalStorage<Record<string, any>>("assessment-responses", {});
  const [completedSections, setCompletedSections] = useLocalStorage<Set<number>>("completed-sections", new Set());
  const [detectedTrack, setDetectedTrack] = useState<string>("GEN");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Extract sections from schema
  const sections = Object.keys(schema)
    .filter(key => key.startsWith('section_'))
    .sort((a, b) => {
      const aNum = parseInt(a.split('_')[1]);
      const bNum = parseInt(b.split('_')[1]);
      return aNum - bNum;
    })
    .map(key => ({
      id: key,
      ...schema[key]
    }));

  const currentSection = sections[currentSectionIndex];

  // Get visible questions for current section
  const visibleQuestions = currentSection?.questions?.filter((question: any) => 
    isQuestionVisible(question, responses, detectedTrack, getTotalVisibleQuestions())
  ) || [];

  function getTotalVisibleQuestions(): number {
    return sections.reduce((total, section) => {
      return total + (section.questions?.filter((q: any) => 
        isQuestionVisible(q, responses, detectedTrack, 0)
      ).length || 0);
    }, 0);
  }

  // Track detection based on M3 and M9 responses
  useEffect(() => {
    if (responses.M3 || responses.M9) {
      const track = detectTrack(responses);
      setDetectedTrack(track);
    }
  }, [responses.M3, responses.M9]);

  // Auto-save responses
  useEffect(() => {
    if (Object.keys(responses).length > 0) {
      toast({
        title: "Progress saved",
        description: "Your responses are automatically saved.",
        duration: 2000,
      });
    }
  }, [responses, toast]);

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

  const saveProgress = () => {
    toast({
      title: "Progress saved",
      description: "You can resume this assessment later.",
    });
  };

  const isCurrentSectionComplete = () => {
    const visibleQuestionIds = visibleQuestions.map((q: any) => q.id);
    const validation = validateSection(visibleQuestions, responses, visibleQuestionIds);
    setValidationErrors(validation.errors);
    return validation.isValid;
  };

  const goToNextSection = () => {
    if (!isCurrentSectionComplete()) {
      toast({
        title: "Section incomplete",
        description: "Please answer all required questions before continuing.",
        variant: "destructive"
      });
      return;
    }

    if (currentSectionIndex < sections.length - 1) {
      setCompletedSections(prev => new Set([...prev, currentSectionIndex]));
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

  const handleAssessmentComplete = () => {
    toast({
      title: "Assessment Complete!",
      description: "Thank you for completing the AI Readiness Assessment.",
    });
    
    // Here you would typically send the data to your backend
    console.log("Assessment completed:", {
      responses,
      detectedTrack,
      completedSections: Array.from(completedSections)
    });
  };

  if (!currentSection) {
    return <div>Loading...</div>;
  }

  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === sections.length - 1;
  const sectionProgress = ((currentSectionIndex + 1) / sections.length) * 100;
  const answeredInSection = visibleQuestions.filter((q: any) => responses[q.id] !== undefined).length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Progress Overview */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-sm">
                Section {currentSectionIndex + 1} of {sections.length}
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

            {/* Section indicators */}
            <div className="flex gap-2 flex-wrap">
              {sections.map((section, index) => {
                const isCompleted = completedSections.has(index);
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
                      <Circle className="h-3 w-3" />
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

      {/* Current Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">{currentSection.title}</CardTitle>
          <p className="text-muted-foreground">{currentSection.purpose}</p>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Questions in this section</span>
            <span>{answeredInSection} / {visibleQuestions.length} answered</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {visibleQuestions.map((question: any) => (
            <div key={question.id} className="space-y-2">
              <QuestionCard
                question={question}
                value={responses[question.id]}
                onChange={(value) => handleAnswerChange(question.id, value)}
              />
              {validationErrors[question.id] && (
                <p className="text-sm text-destructive">
                  {validationErrors[question.id]}
                </p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          {!isFirstSection && (
            <Button
              variant="outline"
              onClick={goToPreviousSection}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
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
          
          {isLastSection ? (
            <Button
              onClick={() => {
                if (isCurrentSectionComplete()) {
                  handleAssessmentComplete();
                }
              }}
              disabled={!isCurrentSectionComplete()}
              className="flex items-center gap-2"
            >
              Complete Assessment
              <CheckCircle className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={goToNextSection}
              disabled={!isCurrentSectionComplete()}
              className="flex items-center gap-2"
            >
              Next Section
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}