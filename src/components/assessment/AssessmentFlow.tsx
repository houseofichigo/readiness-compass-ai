import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "./QuestionCard";
import { ProgressCounter } from "./ProgressCounter";
import { assessmentSections } from "@/data/assessmentQuestions";
import { AssessmentResponse, Track, OrganizationProfile } from "@/types/assessment";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
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
  const [completedSections, setCompletedSections] = useLocalStorage<string[]>(
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
  
  // Calculate visible questions with 60-question cap
  const allVisibleQuestions = assessmentSections.flatMap(section => 
    section.questions.filter(q => isQuestionVisible(q, responses, detectedTrack, 0))
  );
  const totalVisibleQuestions = Math.min(allVisibleQuestions.length, 60);
  
  // Apply cap by hiding D2 and P6 if needed
  const visibleQuestions = currentSection.questions.filter(q => 
    isQuestionVisible(q, responses, detectedTrack, totalVisibleQuestions)
  );
  
  const answeredQuestions = Object.keys(responses).filter(key => 
    responses[key] !== undefined && responses[key] !== ''
  ).length;

  // Detect track based on organization profile
  useEffect(() => {
    if (responses.M3 && responses.M9) {
      let track: Track = "GEN";
      
      // Technical track detection
      if (["Data/AI Lead", "IT Lead", "CTO/Tech Lead"].includes(responses.M3)) {
        track = "TECH";
      }
      // Regulated track detection
      else if (responses.M9 === "Yes" || responses.M9 === "Not sure" || responses.M3 === "Legal/Compliance") {
        track = "REG";
      }
      
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
      
      // Auto-deselect "None" in multi-selects
      if (Array.isArray(value) && value.includes('None') && value.length > 1) {
        updated[questionId] = value.filter(v => v !== 'None');
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
    const visibleQuestionIds = visibleQuestions.map(q => q.id);
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

    if (currentSectionIndex < assessmentSections.length - 1) {
      setCompletedSections(prev => [...prev, currentSection.id]);
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
    const assessmentResponses: AssessmentResponse[] = Object.entries(responses).map(([questionId, value]) => ({
      questionId,
      value,
      score: 0 // TODO: Calculate actual scores
    }));

    const profile: OrganizationProfile = {
      M1: responses.M1,
      M2: responses.M2,
      M3: responses.M3,
      M3_other: responses.M3_other,
      M4: responses.M4,
      M4_other: responses.M4_other,
      M5: responses.M5,
      M6: responses.M6,
      M7: responses.M7,
      M8: responses.M8,
      M9: responses.M9,
      M10: responses.M10
    };

    onComplete(assessmentResponses, profile, detectedTrack);
  };

  if (!currentSection) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProgressCounter
        currentSection={currentSectionIndex}
        totalSections={assessmentSections.length}
        answeredQuestions={answeredQuestions}
        totalQuestions={totalVisibleQuestions}
        completedSections={completedSections}
        sectionTitles={assessmentSections.map(s => s.title)}
      />

      <div className="mb-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
              {currentSection.title}
            </span>
            <span>•</span>
            <span>Section {currentSectionIndex + 1} of {assessmentSections.length}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {currentSection.purpose}
          </p>
        </div>

        <div className="space-y-6">
          {visibleQuestions.map((question) => (
            <div key={question.id}>
              <QuestionCard
                question={question}
                value={responses[question.id]}
                onChange={(value) => handleAnswerChange(question.id, value)}
              />
              {validationErrors[question.id] && (
                <p className="text-sm text-destructive mt-1">
                  {validationErrors[question.id]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <Button
          variant="outline"
          onClick={goToPreviousSection}
          disabled={currentSectionIndex === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <Button
          variant="outline"
          onClick={saveProgress}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Progress
        </Button>

        <div className="text-sm text-muted-foreground">
          {detectedTrack !== "GEN" && (
            <div className="flex items-center gap-2">
              <span>Track detected:</span>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
                {detectedTrack === "TECH" ? "Technical" : "Regulated"}
              </span>
            </div>
          )}
        </div>

        <Button
          onClick={goToNextSection}
          disabled={validationErrors && Object.keys(validationErrors).length > 0}
          className="flex items-center gap-2 bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          {currentSectionIndex === assessmentSections.length - 1 ? (
            "Complete Assessment"
          ) : (
            <>
              Next Section
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}