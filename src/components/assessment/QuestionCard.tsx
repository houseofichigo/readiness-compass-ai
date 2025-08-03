import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question } from "@/types/assessment";
import { useState } from "react";
import { DragDropQuestionRank } from "./DragDropQuestionRank";
import { MultiSelectQuestion } from "./MultiSelectQuestion";

interface QuestionCardProps {
  question: Question;
  value?: any;
  onChange: (value: any) => void;
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const [inputValue, setInputValue] = useState(value || "");

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    onChange(newValue);
  };

  const renderQuestionInput = () => {
    switch (question.type) {
      case "text":
      case "email":
        return (
          <Input
            type={question.type}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={`Enter your ${question.text.toLowerCase()}`}
            className="mt-2"
            required={question.required}
          />
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id={question.id}
              checked={value || false}
              onCheckedChange={onChange}
            />
            <Label htmlFor={question.id} className="text-sm leading-relaxed">
              {question.text}
            </Label>
          </div>
        );

      case "single":
        return (
          <RadioGroup
            value={value}
            onValueChange={onChange}
            className="mt-4 space-y-3"
          >
            {question.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="font-normal cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "multi":
        return (
          <MultiSelectQuestion
            options={question.options || []}
            value={value || []}
            onChange={onChange}
          />
        );

      case "rank":
        return (
          <DragDropQuestionRank
            options={question.options || []}
            value={value || []}
            onChange={onChange}
            maxRank={question.max_rank || 3}
          />
        );

      case "industry_dropdown":
        return (
          <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md"
            required={question.required}
          >
            <option value="">Select industry...</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Technology">Technology</option>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
          </select>
        );

      case "country_dropdown":
        return (
          <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md"
            required={question.required}
          >
            <option value="">Select country...</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Italy">Italy</option>
            <option value="Spain">Spain</option>
            <option value="Netherlands">Netherlands</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="p-6 shadow-elegant border-0 bg-card/50 backdrop-blur-sm">
      <div className="mb-4">
        {question.type !== "checkbox" && (
          <Label className="text-lg font-medium text-foreground mb-2 block">
            {question.text}
            {question.required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        
        {question.helper && (
          <p className="text-sm text-muted-foreground mb-3">
            {question.helper}
          </p>
        )}
      </div>

      {renderQuestionInput()}
    </Card>
  );
}