import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Question, AssessmentValue } from "@/types/assessment";
import { CheckCircle, Building2, Users, MapPin, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrganizationProfileFormProps {
  questions: Question[];
  responses: Record<string, AssessmentValue>;
  onChange: (questionId: string, value: AssessmentValue) => void;
}

interface QuestionFieldProps {
  question: Question;
  value?: AssessmentValue;
  onChange: (value: AssessmentValue) => void;
  isCompleted: boolean;
}

function QuestionField({ question, value, onChange, isCompleted }: QuestionFieldProps) {
  const [inputValue, setInputValue] = useState(value || "");
  
  useEffect(() => setInputValue(value || ""), [value]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    onChange(newValue);
  };

  const getQuestionIcon = (questionId: string) => {
    if (questionId === "M0") return Building2;
    if (questionId === "M6_size") return Users;
    if (questionId === "M5_country") return MapPin;
    if (questionId === "M3" || questionId === "M4_industry") return Briefcase;
    return Building2;
  };

  const Icon = getQuestionIcon(question.id);

  const renderInput = () => {
    switch (question.type) {
      case "text":
      case "email":
        return (
          <div className="relative">
            <Input
              type={question.type}
              value={inputValue as string}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={`Enter ${question.text.toLowerCase()}`}
              className={cn(
                "pl-10 transition-all duration-200 hover:border-primary/50 focus:border-primary",
                isCompleted && "border-green-500/50"
              )}
              required={question.required}
            />
            <Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            {isCompleted && (
              <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
            )}
          </div>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
            <Checkbox
              checked={!!value}
              onCheckedChange={(checked) => onChange(checked)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label className="cursor-pointer flex-1">
              {question.text}
            </Label>
          </div>
        );

      case "single":
      case "dropdown":
      case "industry_dropdown": {
        const flatOptions = question.options || question.groups?.flatMap((g) => g.options) || [];
        const shouldUseDropdown = 
          question.type === "dropdown" || 
          question.type === "industry_dropdown" ||
          flatOptions.length > 8 ||
          question.id === "M3";

        if (shouldUseDropdown) {
          return (
            <div className="relative">
              <Select value={value as string} onValueChange={onChange}>
                <SelectTrigger className={cn(
                  "pl-10 transition-all duration-200 hover:border-primary/50 focus:border-primary",
                  isCompleted && "border-green-500/50"
                )}>
                  <SelectValue placeholder="Select an option..." />
                </SelectTrigger>
                <SelectContent>
                  {flatOptions.map((opt) => {
                    const val = typeof opt === "string" ? opt : opt.value;
                    const label = typeof opt === "string" ? opt : opt.label;
                    return (
                      <SelectItem key={val} value={val}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              {isCompleted && (
                <CheckCircle className="absolute right-9 top-3 h-4 w-4 text-green-500 pointer-events-none" />
              )}
            </div>
          );
        }

        return (
          <RadioGroup
            value={value as string}
            onValueChange={onChange}
            className="space-y-2"
          >
            {question.groups?.length
              ? question.groups.map((group) => (
                  <div key={group.label} className="space-y-2">
                    <Label className="text-sm font-medium text-primary">
                      {group.label}
                    </Label>
                    {group.options.map((opt) => (
                      <div
                        key={opt.value}
                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent/50 transition-colors"
                      >
                        <RadioGroupItem value={opt.value} id={opt.value} />
                        <Label htmlFor={opt.value} className="cursor-pointer flex-1">
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
                    <div
                      key={val}
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent/50 transition-colors"
                    >
                      <RadioGroupItem value={val} id={val} />
                      <Label htmlFor={val} className="cursor-pointer flex-1">
                        {label}
                      </Label>
                    </div>
                  );
                })}
          </RadioGroup>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium flex items-center gap-2">
          {question.text}
          {question.required && (
            <Badge variant="secondary" className="text-xs px-2 py-0">
              Required
            </Badge>
          )}
        </Label>
        {isCompleted && !question.required && (
          <CheckCircle className="h-4 w-4 text-green-500" />
        )}
      </div>
      
      {renderInput()}
      
      {question.helper && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {question.helper}
        </p>
      )}
    </div>
  );
}

export function OrganizationProfileForm({ questions, responses, onChange }: OrganizationProfileFormProps) {
  // Calculate completion status for each question
  const getCompletionStatus = (question: Question) => {
    const value = responses[question.id];
    if (question.type === "checkbox") {
      return value === true;
    }
    return value !== undefined && value !== null && value !== "";
  };

  // Group questions for better layout
  const primaryQuestions = questions.filter(q => 
    ["M0", "M3", "M4_industry"].includes(q.id)
  );
  const secondaryQuestions = questions.filter(q => 
    ["M1", "M2", "M5_country", "M6_size"].includes(q.id)
  );
  const remainingQuestions = questions.filter(q => 
    !primaryQuestions.includes(q) && !secondaryQuestions.includes(q)
  );

  const totalQuestions = questions.length;
  const completedQuestions = questions.filter(getCompletionStatus).length;
  const completionPercentage = Math.round((completedQuestions / totalQuestions) * 100);

  return (
    <Card className="p-8 space-y-8">
      {/* Header with completion status */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Respondent Profile</h2>
              <p className="text-muted-foreground">
                Tell us about your organization to personalize your assessment
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{completionPercentage}%</div>
            <div className="text-sm text-muted-foreground">Complete</div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Primary Information */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Organization Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {primaryQuestions.map((question) => (
              <QuestionField
                key={question.id}
                question={question}
                value={responses[question.id]}
                onChange={(value) => onChange(question.id, value)}
                isCompleted={getCompletionStatus(question)}
              />
            ))}
          </div>
        </div>

        {/* Secondary Information */}
        {secondaryQuestions.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {secondaryQuestions.map((question) => (
                <QuestionField
                  key={question.id}
                  question={question}
                  value={responses[question.id]}
                  onChange={(value) => onChange(question.id, value)}
                  isCompleted={getCompletionStatus(question)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Remaining Questions */}
        {remainingQuestions.length > 0 && (
          <div className="space-y-6">
            {remainingQuestions.map((question) => (
              <QuestionField
                key={question.id}
                question={question}
                value={responses[question.id]}
                onChange={(value) => onChange(question.id, value)}
                isCompleted={getCompletionStatus(question)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Completion indicator */}
      {completedQuestions === totalQuestions && (
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium text-green-900 dark:text-green-100">
              Profile Complete!
            </p>
            <p className="text-sm text-green-700 dark:text-green-300">
              You can now proceed to the next section of the assessment.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}