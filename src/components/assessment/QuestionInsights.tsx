import { QuestionOption } from "@/types/assessment";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface QuestionInsightsProps {
  selectedOption?: QuestionOption;
  className?: string;
}

export function QuestionInsights({ selectedOption, className }: QuestionInsightsProps) {
  if (!selectedOption || (!selectedOption.reasoning && !selectedOption.model_input_context)) {
    return null;
  }

  return (
    <Card className={`mt-4 border-muted ${className}`}>
      <CardContent className="pt-4">
        {selectedOption.score !== undefined && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">Score:</span>
            <Badge variant="secondary">{selectedOption.score}/5</Badge>
          </div>
        )}
        {selectedOption.reasoning && (
          <div className="mb-3">
            <h4 className="text-sm font-medium text-foreground mb-1">Reasoning</h4>
            <p className="text-sm text-muted-foreground">{selectedOption.reasoning}</p>
          </div>
        )}
        {selectedOption.model_input_context && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Context</h4>
            <p className="text-sm text-muted-foreground italic">{selectedOption.model_input_context}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}