/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question } from "@/types/assessment";
import { DragDropQuestionRank } from "./DragDropQuestionRank";
import { MultiSelectQuestion } from "./MultiSelectQuestion";
import { MatrixQuestion } from "./MatrixQuestion";
import { ProgressiveMultiGroupQuestion } from "./ProgressiveMultiGroupQuestion";
import { getLocalizedQuestion } from "@/utils/assessmentUtils";

interface QuestionCardProps {
  question: Question;
  value?: any;
  onChange: (value: any) => void;
  detectedTrack?: string;
}

export function QuestionCard({
  question,
  value,
  onChange,
  detectedTrack = 'GEN'
}: QuestionCardProps) {
  const { i18n, t } = useTranslation();
  const localizedQuestion = getLocalizedQuestion(question, i18n.language);
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => setInputValue(value || ""), [value]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    onChange(newValue);
  };

  const renderQuestionInput = () => {
    switch (localizedQuestion.type) {
      case "text":
      case "email":
        return (
          <Input
            type={localizedQuestion.type}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={t('form.enterText')}
            className="mt-2"
            required={localizedQuestion.required}
          />
        );

      case "checkbox":
        return (
          <Checkbox
            checked={!!value}
            onCheckedChange={(checked) => onChange(checked)}
            className="mt-2"
          />
        );

      case "single":
      case "dropdown":
      case "industry_dropdown": {
        // Handles radio groups as well as dropdowns (industry_dropdown & country_dropdown)
        const flatOptions: Array<
          string | { value: string; label: string }
        > = localizedQuestion.options || localizedQuestion.groups?.flatMap((g) => g.options) || [];

        // Use dropdown for: explicit dropdown types, questions with many options (>8), or specific questions like M3 (Primary role)
        const shouldUseDropdown = 
          localizedQuestion.type === "dropdown" || 
          localizedQuestion.type === "industry_dropdown" ||
          flatOptions.length > 8 ||
          localizedQuestion.id === "M3"; // Primary role question

        if (shouldUseDropdown) {
          // Render as <Select> for dropdowns
          return (
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger className="mt-4 bg-background border border-border">
                <SelectValue placeholder={t('form.pleaseSelect')} />
              </SelectTrigger>
              <SelectContent className="z-50 bg-background border border-border shadow-lg">
                {flatOptions.map((opt) => {
                  const val = typeof opt === "string" ? opt : opt.value;
                  const label = typeof opt === "string" ? opt : opt.label;
                  return (
                    <SelectItem 
                      key={val} 
                      value={val}
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                    >
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          );
        }

        // Otherwise render as radio buttons
        return (
          <RadioGroup
            value={value || ""}
            onValueChange={onChange}
            className="mt-4 space-y-3"
          >
            {localizedQuestion.groups?.length
              ? localizedQuestion.groups.map((group) => (
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
              : flatOptions.map((opt) => {
                  const val = typeof opt === "string" ? opt : opt.value;
                  const label = typeof opt === "string" ? opt : opt.label;
                  return (
                    <div key={val} className="flex items-center space-x-2">
                      <RadioGroupItem value={val} id={val} />
                      <Label htmlFor={val} className="font-normal cursor-pointer">
                        {label}
                      </Label>
                    </div>
                  );
                })}
          </RadioGroup>
        );
      }

      case "multi":
        return (
          <MultiSelectQuestion
            options={localizedQuestion.options || []}
            value={value || []}
            onChange={onChange}
          />
        );

      case "multi_group": {
        // Grouped checkboxes with progressive disclosure
        // Filter groups based on track and other conditions
        const { groups = [] } = localizedQuestion;
        
        return (
          <ProgressiveMultiGroupQuestion
            groups={groups}
            value={value || []}
            onChange={onChange}
            detectedTrack={detectedTrack}
          />
        );
      }

      case "rank": {
        const rankOpts = localizedQuestion.options || localizedQuestion.groups?.flatMap((g) => g.options) || [];
        return (
          <DragDropQuestionRank
            options={rankOpts}
            value={value || []}
            onChange={onChange}
            maxRank={localizedQuestion.maxRank || 3}
          />
        );
      }

      case "matrix":
        return (
          <MatrixQuestion
            rows={localizedQuestion.rows?.map(r => typeof r === 'string' ? { value: r, label: r } : r) || []}
            columns={localizedQuestion.columns?.map(c => typeof c === 'string' ? { value: c, label: c } : c) || []}
            value={value || {}}
            onChange={onChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card className="mb-6 p-4">
      <Label className="font-semibold">{localizedQuestion.text}</Label>
      {localizedQuestion.helper && (
        <p className="mt-2 mb-4 text-sm text-muted-foreground">
          {localizedQuestion.helper}
        </p>
      )}
      {renderQuestionInput()}
    </Card>
  );
}
