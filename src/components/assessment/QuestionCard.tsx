/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question } from "@/types/assessment";
import { DragDropQuestionRank } from "./DragDropQuestionRank";
import { MultiSelectQuestion } from "./MultiSelectQuestion";
import { MatrixQuestion } from "./MatrixQuestion";

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

      case "single": {
        // Also used for industry_dropdown & country_dropdown
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
      }

      case "multi":
        return (
          <MultiSelectQuestion
            options={question.options || []}
            value={value || []}
            onChange={onChange}
          />
        );

      case "multi_group": {
        // Grouped checkboxes
        const selected: string[] = value || [];
        const handleGroupChange = (optValue: string, checked: boolean) => {
          const set = new Set(selected);
          if (checked) {
            set.add(optValue);
          } else {
            set.delete(optValue);
          }
          onChange(Array.from(set));
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
      }

      case "matrix":
        return (
          <MatrixQuestion
            rows={Array.isArray(question.rows) ? question.rows.map(r => typeof r === 'string' ? { value: r, label: r } : r) : []}
            columns={Array.isArray(question.columns) ? question.columns.map(c => typeof c === 'string' ? { value: c, label: c } : c) : []}
            value={value || {}}
            onChange={onChange}
          />
        );

      case "rank": {
        const rankOpts =
          question.options ||
          question.groups?.flatMap((g) => g.options) ||
          [];
        return (
          <DragDropQuestionRank
            options={rankOpts}
            value={value || []}
            onChange={onChange}
            maxRank={question.maxRank || 3}
          />
        );
      }

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
