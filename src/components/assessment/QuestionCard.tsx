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

        case "single":
        case "industry_dropdown":
        case "country_dropdown": {
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
          return (
            <MultiSelectQuestion
              options={question.options || []}
              value={value || []}
              onChange={onChange}
            />
          );

        case "multi_group": {
          const selected: string[] = value || [];
          const handleGroupChange = (optionValue: string, checked: boolean) => {
            const newValue = new Set(selected);
            if (checked) {
              newValue.add(optionValue);
            } else {
              newValue.delete(optionValue);
            }
            onChange(Array.from(newValue));
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

        case "matrix": {
          const rows = question.rows || [];
          const cols = question.columns || [];
          const matrixValue: Record<string, string> = value || {};

          const handleMatrixChange = (row: string, col: string) => {
            onChange({ ...matrixValue, [row]: col });
          };

          return (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="p-2 text-left"></th>
                    {cols.map((col) => (
                      <th key={col} className="p-2 text-center">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row}>
                      <td className="p-2 font-medium">{row}</td>
                      {cols.map((col) => (
                        <td key={col} className="p-2 text-center">
                          <input
                            type="radio"
                            name={row}
                            value={col}
                            checked={matrixValue[row] === col}
                            onChange={() => handleMatrixChange(row, col)}
                            className="h-4 w-4"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
