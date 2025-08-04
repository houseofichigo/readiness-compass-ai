import React from 'react';
import { Question } from "@/types/assessment";
import { QuestionCard } from "./QuestionCard";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface QuestionWithTooltipProps {
  question: Question;
  value?: any;
  onChange: (value: any) => void;
  questionNumber: number;
}

export function QuestionWithTooltip({ 
  question, 
  value, 
  onChange, 
  questionNumber 
}: QuestionWithTooltipProps) {
  const hasTooltip = question.helper || question.tooltip_each;

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mt-1 shrink-0">
          {questionNumber}
        </div>
        <div className="flex-1">
          <div className="flex items-start gap-2 mb-2">
            <div className="flex-1">
              {hasTooltip ? (
                <TooltipProvider>
                  <div className="flex items-start gap-2">
                    <span className="text-lg font-medium text-foreground">
                      {question.text}
                      {question.required && <span className="text-destructive ml-1">*</span>}
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="mt-1 p-1 hover:bg-muted rounded-full transition-colors">
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p className="text-sm">{question.helper}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              ) : (
                <span className="text-lg font-medium text-foreground">
                  {question.text}
                  {question.required && <span className="text-destructive ml-1">*</span>}
                </span>
              )}
            </div>
          </div>
          <QuestionCard
            question={question}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}