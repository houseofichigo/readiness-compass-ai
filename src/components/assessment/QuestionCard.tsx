import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
      case "number":
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
                    <Label className="text-sm font-medium">
                      {group.label}
                    </Label>
                    {group.options.map((opt) => (
                      <div
                        key={opt.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem value={opt.value} id={opt.value} />
                        <Label
                          htmlFor={opt.value}
                          className="font-normal cursor-pointer"
                        >
                          {opt.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                ))
              : flatOptions.map((opt) => (
                  <div
                    key={opt.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value={opt.value} id={opt.value} />
                    <Label
                      htmlFor={opt.value}
                      className="font-normal cursor-pointer"
                    >
                      {opt.label}
                    </Label>
                  </div>
                ))}
          </RadioGroup>
        );
      }

      case "multi":
        if (question.groups?.length) {
          return (
            <div className="mt-4 space-y-6">
              {question.groups.map((group) => (
                <div key={group.label} className="space-y-2">
                  <Label className="text-sm font-medium">{group.label}</Label>
                  <MultiSelectQuestion
                    options={group.options}
                    value={value || []}
                    onChange={onChange}
                    hideSelectAllLabel
                    hideSelected
                  />
                </div>
              ))}
            </div>
          );
        }
        return (
          <MultiSelectQuestion
            options={question.options || []}
            value={value || []}
            onChange={onChange}
          />
        );

      case "rank": {
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
      }

      case "industry_dropdown":
        return (
          <Select value={value || ""} onValueChange={onChange}>
            <SelectTrigger className="mt-2 bg-background border-input">
              <SelectValue placeholder="Select industry..." />
            </SelectTrigger>
            <SelectContent className="z-50 bg-background border border-border">
              {/*
                Replace with dynamic list or keep static options as needed:
              */}
              <SelectItem value="Agriculture">Agriculture</SelectItem>
              <SelectItem value="Automotive">Automotive</SelectItem>
              <SelectItem value="Banking & Finance">
                Banking & Finance
              </SelectItem>
              <SelectItem value="Construction">Construction</SelectItem>
              <SelectItem value="Consulting">Consulting</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Energy & Utilities">
                Energy & Utilities
              </SelectItem>
              <SelectItem value="Entertainment & Media">
                Entertainment & Media
              </SelectItem>
              <SelectItem value="Fashion & Retail">Fashion & Retail</SelectItem>
              <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
              <SelectItem value="Government">Government</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
            </SelectContent>
          </Select>
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
        <p className="mt-2 text-sm text-muted-foreground">
          {question.helper}
        </p>
      )}
      <div className="mt-4">
        <Button onClick={() => onChange(value)}>Save</Button>
      </div>
    </Card>
  );
}
