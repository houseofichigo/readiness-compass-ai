/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Question } from "@/types/assessment";
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
        // also used for industry_dropdown & country_dropdown
        const flatOptions =
          question.options ||
          question.groups?.flatMap((g) => g.options) ||
          [];
        return (
          <RadioGroup
            value={value}
            onValueChange={onChange}
            className="mt-4 space-y-3"
          >
            {question.groups?.length
              ? question.groups.map((group) => (
                  <div key={group.label} className="space-y-2">
                    <Label className="text-sm font-medium">{group.label}</Label>
                    {group.options.map((opt) => (
                      <div key={opt.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt.value} id={opt.value} />
                        <Label htmlFor={opt.value} className="font-normal cursor-pointer">
                          {opt.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                ))
              : flatOptions.map((opt) => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={opt.value} />
                    <Label htmlFor={opt.value} className="font-normal cursor-pointer">
                      {opt.label}
                    </Label>
                  </div>
                ))}
          </RadioGroup>
        );

      case "multi":
        // plain multiselect
        return (
          <MultiSelectQuestion
            options={question.options || []}
            value={value || []}
            onChange={onChange}
          />
        );

      case "multi_group":
        // grouped checkboxes
        const selected: string[] = value || [];
        const handleGroupChange = (optionValue: string, checked: boolean) => {
          const newSet = new Set(selected);
          if (checked) newSet.add(optionValue);
          else newSet.delete(optionValue);
          onChange(Array.from(newSet));
        };
        return (
          <div className="mt-4 space-y-6">
            {question.groups?.map((group) => (
              <div key={group.label} className="space-y-2">
                <Label className="text-sm font-medium">{group.label}</Label>
                {group.options.map((opt) => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${group.label}-${opt.value}`}
                      checked={selected.includes(opt.value)}
                      onCheckedChange={(checked) =>
                        handleGroupChange(opt.value, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`${group.label}-${opt.value}`}
                      className="font-normal cursor-pointer text-sm"
                    >
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );

      case "rank":
        const rankOptions =
          question.options ||
          question.groups?.flatMap((g) => g.options) ||
          [];
        return (
          <DragDropQuestionRank
            options={rankOptions}
            value={value || []}
            onChange={onChange}
            maxRank={question.max_rank || 3}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card className="mb-6 p-4">
      <Label className="font-semibold">{question.text}</Label>
      {renderQuestionInput()}
      {question.helper && (
        <p className="mt-2 text-sm text-muted-foreground">{question.helper}</p>
      )}
      <div className="mt-4">
        <Button onClick={() => onChange(value)}>Save</Button>
      </div>
    </Card>
  );
}
