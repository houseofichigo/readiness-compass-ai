import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AssessmentProgress } from "./AssessmentProgress";
import { QuestionCard } from "./QuestionCard";
import { assessmentSections } from "@/data/assessmentQuestions";
import { AssessmentResponse, Track, OrganizationProfile } from "@/types/assessment";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface AssessmentFlowProps {
  onComplete: (responses: AssessmentResponse[], profile: OrganizationProfile, track: Track) => void;
}

export function AssessmentFlow({ onComplete }: AssessmentFlowProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [detectedTrack, setDetectedTrack] = useState<Track>("GEN");
  const { toast } = useToast();

  const currentSection = assessmentSections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const totalQuestions = assessmentSections.reduce((total, section) => total + section.questions.length, 0);
  const completedQuestions = Object.keys(responses).length;

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

  const handleAnswerChange = (value: any) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const isCurrentQuestionAnswered = () => {
    const answer = responses[currentQuestion.id];
    if (currentQuestion.required) {
      if (currentQuestion.type === "checkbox") {
        return answer === true;
      }
      return answer && answer !== "";
    }
    return true;
  };

  const goToNextQuestion = () => {
    if (!isCurrentQuestionAnswered()) {
      toast({
        title: "Answer required",
        description: "Please answer this question before continuing.",
        variant: "destructive"
      });
      return;
    }

    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < assessmentSections.length - 1) {
      setCompletedSections(prev => [...prev, currentSection.id]);
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Assessment complete
      handleAssessmentComplete();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(assessmentSections[currentSectionIndex - 1].questions.length - 1);
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

  if (!currentSection || !currentQuestion) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <AssessmentProgress
        currentQuestion={completedQuestions + 1}
        totalQuestions={totalQuestions}
        currentSection={currentSection.title}
        completedSections={completedSections}
      />

      <div className="mb-8">
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
              {currentSection.title}
            </span>
            <span>•</span>
            <span>Question {currentQuestionIndex + 1} of {currentSection.questions.length}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {currentSection.purpose}
          </p>
        </div>

        <QuestionCard
          question={currentQuestion}
          value={responses[currentQuestion.id]}
          onChange={handleAnswerChange}
        />
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={goToPreviousQuestion}
          disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
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
          onClick={goToNextQuestion}
          disabled={!isCurrentQuestionAnswered()}
          className="flex items-center gap-2 bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          {currentSectionIndex === assessmentSections.length - 1 && 
           currentQuestionIndex === currentSection.questions.length - 1 ? (
            "Complete Assessment"
          ) : (
            <>
              Next
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}