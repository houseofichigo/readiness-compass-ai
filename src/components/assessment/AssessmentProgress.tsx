import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface AssessmentProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  currentSection: string;
  completedSections: string[];
}

export function AssessmentProgress({ 
  currentQuestion, 
  totalQuestions, 
  currentSection,
  completedSections 
}: AssessmentProgressProps) {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <Card className="p-6 mb-6 bg-gradient-accent border-0 shadow-elegant">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI Readiness Assessment</h3>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion} of {totalQuestions} • {currentSection}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {Math.round(progressPercentage)}%
          </div>
          <p className="text-sm text-muted-foreground">Complete</p>
        </div>
      </div>
      
      <Progress 
        value={progressPercentage} 
        className="h-2 bg-secondary"
      />
      
      <div className="flex items-center gap-2 mt-4">
        {completedSections.map((section, index) => (
          <div
            key={section}
            className="h-2 w-8 rounded-full bg-primary"
          />
        ))}
        <div className="h-2 w-8 rounded-full bg-primary/50" />
        {Array.from({ length: Math.max(0, 8 - completedSections.length - 1) }).map((_, index) => (
          <div
            key={index}
            className="h-2 w-8 rounded-full bg-muted"
          />
        ))}
      </div>
    </Card>
  );
}