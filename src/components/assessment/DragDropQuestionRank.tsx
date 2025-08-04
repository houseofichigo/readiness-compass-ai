import { QuestionOption } from "@/types/assessment";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface DragDropQuestionRankProps {
  options: QuestionOption[];
  value: string[];
  onChange: (value: string[]) => void;
  maxRank: number;
}

export function DragDropQuestionRank({ 
  options, 
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
        {options.map((option, index) => {
          const rank = getRankPosition(option.value);
          const isSelected = rank !== null;
          
          return (
            <Card
              key={option.value}
              className={`p-4 cursor-pointer transition-all duration-200 touch-manipulation ${
                isSelected 
                  ? "bg-primary/10 border-primary shadow-md" 
                  : "hover:bg-muted/50 hover:border-border"
              }`}
              draggable={isSelected}
              onDragStart={(e) => handleDragStart(e, option.value)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onClick={() => handleOptionClick(option.value)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOptionClick(option.value);
                }
              }}
              aria-label={`${option.label}${rank ? ` (ranked ${rank})` : ' (unranked)'}`}
              style={{ minHeight: '44px' }} // Touch target size
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm md:text-base">{option.label}</span>
                <div className="flex items-center gap-2">
                  {isSelected && (
                    <>
                      <Badge variant="default" className="bg-primary">
                        #{rank}
                      </Badge>
                      <div 
                        className="w-6 h-6 bg-muted rounded flex items-center justify-center cursor-grab active:cursor-grabbing md:w-8 md:h-8"
                        role="img"
                        aria-label="Drag handle"
                        style={{ minWidth: '44px', minHeight: '44px' }} // Touch target
                      >
                        <span className="text-xs md:text-sm">⋮⋮</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      {value.length > 0 && (
        <div className="mt-6 p-4 bg-accent/50 rounded-lg">
          <h4 className="font-medium mb-2">Your Rankings:</h4>
          <div className="space-y-1">
            {value.map((item, index) => {
              const option = options.find(opt => opt.value === item);
              return (
                <div key={item} className="flex items-center gap-2">
                  <Badge variant="outline">#{index + 1}</Badge>
                  <span className="text-sm md:text-base">{option?.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}