import { QuestionChoice } from "@/types/assessment";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface DragDropQuestionRankProps {
  choices: QuestionChoice[];
  value: string[];
  onChange: (value: string[]) => void;
  maxRank: number;
}

export function DragDropQuestionRank({ 
  choices, 
  value, 
  onChange, 
  maxRank 
}: DragDropQuestionRankProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, optionValue: string) => {
    setDraggedItem(optionValue);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const newValue = [...value];
    const draggedIndex = newValue.indexOf(draggedItem);
    
    if (draggedIndex > -1) {
      newValue.splice(draggedIndex, 1);
    }
    
    newValue.splice(targetIndex, 0, draggedItem);
    onChange(newValue.slice(0, maxRank));
    setDraggedItem(null);
  };

  const handleOptionClick = (optionValue: string) => {
    const newValue = [...value];
    const existingIndex = newValue.indexOf(optionValue);
    
    if (existingIndex > -1) {
      newValue.splice(existingIndex, 1);
    } else if (newValue.length < maxRank) {
      newValue.push(optionValue);
    }
    
    onChange(newValue);
  };

  const getRankPosition = (optionValue: string) => {
    const index = value.indexOf(optionValue);
    return index > -1 ? index + 1 : null;
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="text-sm text-muted-foreground">
        Click or drag to rank your top {maxRank} choices (1 = highest priority)
      </div>
      
      <div className="grid gap-3">
        {choices.map((choice) => (
          <Card
            key={`choice-${choice.value}`}
            className={`p-4 cursor-pointer transition-all duration-200 ${
              getRankPosition(choice.value) !== null 
                ? "bg-primary/10 border-primary shadow-md" 
                : "hover:bg-muted/50 hover:border-border"
            }`}
            draggable={getRankPosition(choice.value) !== null}
            onDragStart={(e) => getRankPosition(choice.value) !== null && handleDragStart(e, choice.value)}
            onDragOver={getRankPosition(choice.value) !== null ? handleDragOver : undefined}
            onDrop={(e) => getRankPosition(choice.value) !== null && handleDrop(e, value.length)}
            onClick={() => handleOptionClick(choice.value)}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{choice.label}</span>
              {getRankPosition(choice.value) !== null && (
                <Badge variant="default" className="bg-primary">
                  #{getRankPosition(choice.value)}
                </Badge>
              )}
            </div>
          </Card>
        ))}
      </div>
      
      {value.length > 0 && (
        <div className="mt-6 p-4 bg-accent/50 rounded-lg">
          <h4 className="font-medium mb-2">Your Rankings:</h4>
          <div className="space-y-1">
            {value.map((item, index) => {
              const choice = choices.find(opt => opt.value === item);
              return (
                <div key={`ranking-${item}`} className="flex items-center gap-2">
                  <Badge variant="outline">#{index + 1}</Badge>
                  <span>{choice?.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}