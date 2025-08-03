import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle } from "lucide-react";

interface ProgressCounterProps {
  currentSection: number;
  totalSections: number;
  answeredQuestions: number;
  totalQuestions: number;
  completedSections: string[];
  sectionTitles: string[];
}

export function ProgressCounter({
  currentSection,
  totalSections,
  answeredQuestions,
  totalQuestions,
  completedSections,
  sectionTitles
}: ProgressCounterProps) {
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Section {currentSection + 1} of {totalSections}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {answeredQuestions} / {totalQuestions} answered
          </span>
        </div>
        <div className="text-sm font-medium text-primary">
          {Math.round(progressPercentage)}% complete
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-secondary/20 rounded-full h-2 mb-4">
        <div 
          className="bg-gradient-primary h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Section indicators */}
      <div className="flex gap-2 flex-wrap">
        {sectionTitles.map((title, index) => {
          const isCompleted = completedSections.includes(`section_${index}`);
          const isCurrent = index === currentSection;
          
          return (
            <div 
              key={index}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-colors ${
                isCompleted 
                  ? 'bg-primary/10 text-primary' 
                  : isCurrent
                    ? 'bg-secondary/20 text-foreground'
                    : 'bg-muted/20 text-muted-foreground'
              }`}
            >
              {isCompleted ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <Circle className="h-3 w-3" />
              )}
              <span className="hidden sm:inline">{title}</span>
              <span className="sm:hidden">{index + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}