/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
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
import i18n from "@/lib/i18n";
import { DragDropQuestionRank } from "./DragDropQuestionRank";
import { MultiSelectQuestion } from "./MultiSelectQuestion";
import { MatrixQuestion } from "./MatrixQuestion";
import { ProgressiveMultiGroupQuestion } from "./ProgressiveMultiGroupQuestion";
import { getPlaceholder } from "@/lib/placeholders";

interface QuestionCardProps {
  question: Question;
  value?: any;
  onChange: (value: any) => void;
}

export function QuestionCard({
  question,
  value,
  onChange,
}: QuestionCardProps) {
  const [inputValue, setInputValue] = useState(value || "");
  const lang = i18n.language.startsWith("fr") ? "fr" : "en";

  useEffect(() => setInputValue(value || ""), [value]);

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
            placeholder={`${getPlaceholder("enterYour")} ${question.text.toLowerCase()}`}
            className="mt-2"
            required={question.required}
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
        const flatOptions =
          question.options ||
          question.groups?.flatMap((g) => g.options) ||
          [];

        const shouldUseDropdown =
          question.type === "dropdown" ||
          question.type === "industry_dropdown" ||
          flatOptions.length > 8 ||
          question.id === "M3";

        if (shouldUseDropdown) {
          return (
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger className="mt-4 bg-background border border-border">
                <SelectValue placeholder={getPlaceholder("selectOption")} />
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

        return (
          <RadioGroup
            value={value || ""}
            onValueChange={onChange}
            className="mt-4 space-y-3"
          >
            {(question.groups?.length
              ? question.groups.flatMap((group) =>
                  group.options.map((opt) => ({
                    groupLabel: group.label,
                    value: typeof opt === "string" ? opt : opt.value,
                    label: typeof opt === "string" ? opt : opt.label,
                  }))
                )
              : flatOptions.map((opt) => ({
                  value: typeof opt === "string" ? opt : opt.value,
                  label: typeof opt === "string" ? opt : opt.label,
                }))
            ).map(({ groupLabel, value: val, label }) => (
              <div key={val} className="flex items-center space-x-2">
                <RadioGroupItem value={val} id={val} />
                <Label htmlFor={val} className="font-normal cursor-pointer">
                  {label}
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

      case "multi_group":
        return (
          <ProgressiveMultiGroupQuestion
            groups={question.groups || []}
            value={value || []}
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

      case "matrix":
        return (
          <MatrixQuestion
            rows={
              question.rows?.map((r) =>
                typeof r === "string" ? { value: r, label: r } : r
              ) || []
            }
            columns={
              question.columns?.map((c) =>
                typeof c === "string" ? { value: c, label: c } : c
              ) || []
            }
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
      <Label className="font-semibold">{question.text}</Label>
      {question.helper && (
        <p className="mt-2 mb-4 text-sm text-muted-foreground">
          {question.helper}
        </p>
      )}
      {renderQuestionInput()}
    </Card>
  );
}
