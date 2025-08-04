import React from 'react';
import { Question } from "@/types/assessment";
import { QuestionCard } from "./QuestionCard";
import { cn } from "@/lib/utils";

interface QuestionGridProps {
  questions: Question[];
  responses: Record<string, any>;
  onAnswerChange: (questionId: string, value: any) => void;
}

export function QuestionGrid({ questions, responses, onAnswerChange }: QuestionGridProps) {
  // Determine if two consecutive questions can be grouped side-by-side
  const canGroupQuestions = (q1: Question, q2: Question) => {
    // Don't group if either has show_if/hide_if conditions (interdependent)
    if (q1.show_if || q1.hide_if || q2.show_if || q2.hide_if) return false;
    
    // Don't group complex question types
    const complexTypes = ['rank', 'multi'];
    if (complexTypes.includes(q1.type) || complexTypes.includes(q2.type)) return false;
    
    // Don't group if either has many options
    if ((q1.options && q1.options.length > 4) || (q2.options && q2.options.length > 4)) return false;
    
    return true;
  };

  const groupedQuestions: (Question | Question[])[] = [];
  let i = 0;
  
  while (i < questions.length) {
    const current = questions[i];
    const next = questions[i + 1];
    
    if (next && canGroupQuestions(current, next)) {
      groupedQuestions.push([current, next]);
      i += 2;
    } else {
      groupedQuestions.push(current);
      i += 1;
    }
  }

  return (
    <div className="space-y-6">
      {groupedQuestions.map((group, groupIndex) => {
        if (Array.isArray(group)) {
          // Two-column group
          return (
            <div 
              key={`group-${groupIndex}`}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {group.map((question, questionIndex) => (
                <div key={question.id} className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mt-1 shrink-0">
                      {questions.indexOf(question) + 1}
                    </div>
                    <div className="flex-1">
                      <QuestionCard
                        question={question}
                        value={responses[question.id]}
                        onChange={(value) => onAnswerChange(question.id, value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        } else {
          // Single question
          const question = group;
          return (
            <div key={question.id} className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mt-1 shrink-0">
                  {questions.indexOf(question) + 1}
                </div>
                <div className="flex-1">
                  <QuestionCard
                    question={question}
                    value={responses[question.id]}
                    onChange={(value) => onAnswerChange(question.id, value)}
                  />
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}