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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Question, AssessmentValue } from "@/types/assessment";
import { 
  CheckCircle, 
  Building2, 
  Users, 
  MapPin, 
  Briefcase, 
  Info, 
  Target, 
  Shield,
  ChevronDown,
  Clock,
  Sparkles
} from "lucide-react";
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
  index: number;
}

function QuestionField({ question, value, onChange, isCompleted, index }: QuestionFieldProps) {
  const [inputValue, setInputValue] = useState(value || "");
  const [isFocused, setIsFocused] = useState(false);
  
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
          <div className="relative group">
            <Input
              type={question.type}
              value={inputValue as string}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={`Enter ${question.text.toLowerCase()}`}
              className={cn(
                "pl-12 pr-12 h-12 text-base transition-all duration-300",
                "border-2 border-border/50 hover:border-primary/50",
                "focus:border-primary focus:ring-2 focus:ring-primary/20",
                "group-hover:shadow-lg group-hover:shadow-primary/10",
                isCompleted && "border-green-500/70 bg-green-50/50 dark:bg-green-950/20",
                isFocused && "scale-[1.02] shadow-lg shadow-primary/20"
              )}
              required={question.required}
            />
            <Icon className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-all duration-300",
              isFocused ? "text-primary scale-110" : "text-muted-foreground",
              isCompleted && "text-green-500"
            )} />
            {isCompleted && (
              <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500 animate-scale-in" />
            )}
          </div>
        );

      case "checkbox":
        return (
          <div className={cn(
            "flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer group",
            "hover:border-primary/50 hover:bg-accent/50 hover:shadow-md",
            isCompleted && "border-green-500/50 bg-green-50/50 dark:bg-green-950/20"
          )}>
            <Checkbox
              checked={!!value}
              onCheckedChange={(checked) => onChange(checked)}
              className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label className="cursor-pointer flex-1 text-base">
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
            <div className="relative group">
              <Select value={value as string} onValueChange={onChange}>
                <SelectTrigger className={cn(
                  "pl-12 pr-4 h-12 text-base border-2 border-border/50 transition-all duration-300",
                  "hover:border-primary/50 focus:border-primary group-hover:shadow-lg group-hover:shadow-primary/10",
                  isCompleted && "border-green-500/70 bg-green-50/50 dark:bg-green-950/20"
                )}>
                  <SelectValue placeholder="Select an option..." />
                </SelectTrigger>
                <SelectContent className="z-50 bg-background border-2 border-border shadow-2xl animate-scale-in">
                  {flatOptions.map((opt) => {
                    const val = typeof opt === "string" ? opt : opt.value;
                    const label = typeof opt === "string" ? opt : opt.label;
                    return (
                      <SelectItem 
                        key={val} 
                        value={val}
                        className="cursor-pointer hover:bg-accent hover:text-accent-foreground py-3"
                      >
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Icon className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-all duration-300 pointer-events-none",
                "text-muted-foreground",
                isCompleted && "text-green-500"
              )} />
              {isCompleted && (
                <CheckCircle className="absolute right-12 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500 pointer-events-none animate-scale-in" />
              )}
            </div>
          );
        }

        return (
          <RadioGroup
            value={value as string}
            onValueChange={onChange}
            className="space-y-3"
          >
            {question.groups?.length
              ? question.groups.map((group) => (
                  <div key={group.label} className="space-y-3">
                    <Label className="text-base font-semibold text-primary">
                      {group.label}
                    </Label>
                    {group.options.map((opt) => (
                      <div
                        key={opt.value}
                        className={cn(
                          "flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200",
                          "hover:bg-accent/50 hover:border-primary/50 cursor-pointer"
                        )}
                      >
                        <RadioGroupItem value={opt.value} id={opt.value} className="h-5 w-5" />
                        <Label htmlFor={opt.value} className="cursor-pointer flex-1 text-base">
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
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200",
                        "hover:bg-accent/50 hover:border-primary/50 cursor-pointer"
                      )}
                    >
                      <RadioGroupItem value={val} id={val} className="h-5 w-5" />
                      <Label htmlFor={val} className="cursor-pointer flex-1 text-base">
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
    <div 
      className={cn(
        "space-y-4 animate-fade-in opacity-0",
        "animate-delay-" + (index * 100)
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards'
      }}
    >
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold flex items-center gap-3">
          <span className={cn(
            "flex items-center gap-2 transition-all duration-300",
            isCompleted && "text-green-600"
          )}>
            {question.text}
            {isCompleted && <Sparkles className="h-4 w-4 text-green-500 animate-pulse" />}
          </span>
          {question.required && (
            <Badge variant="secondary" className="text-xs px-2 py-1 animate-pulse">
              Required
            </Badge>
          )}
        </Label>
      </div>
      
      {renderInput()}
      
      {question.helper && (
        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Info className="h-4 w-4" />
            <span>More info</span>
            <ChevronDown className="h-3 w-3" />
          </CollapsibleTrigger>
          <CollapsibleContent className="animate-accordion-down">
            <div className="mt-2 p-3 bg-muted/50 rounded-lg border-l-4 border-primary/30">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {question.helper}
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}

// Circular Progress Ring Component
function CircularProgress({ percentage, size = 120 }: { percentage: number; size?: number }) {
  const radius = (size - 8) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <div className="relative">
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-muted-foreground/20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          className="text-primary transition-all duration-1000 ease-out"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{percentage}%</div>
          <div className="text-xs text-muted-foreground">Complete</div>
        </div>
      </div>
    </div>
  );
}

export function OrganizationProfileForm({ questions, responses, onChange }: OrganizationProfileFormProps) {
  const [expandedSection, setExpandedSection] = useState<string>("organization");
  
  // Calculate completion status
  const getCompletionStatus = (question: Question) => {
    const value = responses[question.id];
    if (question.type === "checkbox") {
      return value === true;
    }
    return value !== undefined && value !== null && value !== "";
  };

  // Group questions
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
  
  const primaryCompleted = primaryQuestions.filter(getCompletionStatus).length;
  const secondaryCompleted = secondaryQuestions.filter(getCompletionStatus).length;

  // Estimate time remaining
  const avgTimePerQuestion = 1; // minutes
  const remainingTime = (totalQuestions - completedQuestions) * avgTimePerQuestion;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Animated Header */}
      <div className="text-center space-y-6 animate-fade-in">
        <div className="flex items-center justify-center gap-8">
          <CircularProgress percentage={completionPercentage} />
          <div className="text-left space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Respondent Profile
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your organization to personalize your assessment
            </p>
            {remainingTime > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>~{remainingTime} min remaining</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Organization Details Section */}
      <Card className="p-8 space-y-8 border-2 hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <Collapsible open={expandedSection === "organization"} onOpenChange={(open) => setExpandedSection(open ? "organization" : "")}>
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300",
                  primaryCompleted === primaryQuestions.length 
                    ? "bg-green-100 dark:bg-green-950" 
                    : "bg-primary/10"
                )}>
                  <Building2 className={cn(
                    "h-6 w-6 transition-colors",
                    primaryCompleted === primaryQuestions.length ? "text-green-600" : "text-primary"
                  )} />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold">Organization Details</h3>
                  <p className="text-sm text-muted-foreground">
                    {primaryCompleted}/{primaryQuestions.length} completed
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {primaryCompleted === primaryQuestions.length && (
                  <CheckCircle className="h-6 w-6 text-green-500 animate-scale-in" />
                )}
                <ChevronDown className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  expandedSection === "organization" && "rotate-180"
                )} />
              </div>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="animate-accordion-down">
            <div className="pt-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {primaryQuestions.map((question, index) => (
                  <QuestionField
                    key={question.id}
                    question={question}
                    value={responses[question.id]}
                    onChange={(value) => onChange(question.id, value)}
                    isCompleted={getCompletionStatus(question)}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Additional Information Section */}
      {secondaryQuestions.length > 0 && (
        <Card className="p-8 space-y-8 border-2 hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Collapsible open={expandedSection === "additional"} onOpenChange={(open) => setExpandedSection(open ? "additional" : "")}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300",
                    secondaryCompleted === secondaryQuestions.length 
                      ? "bg-green-100 dark:bg-green-950" 
                      : "bg-primary/10"
                  )}>
                    <Users className={cn(
                      "h-6 w-6 transition-colors",
                      secondaryCompleted === secondaryQuestions.length ? "text-green-600" : "text-primary"
                    )} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold">Additional Information</h3>
                    <p className="text-sm text-muted-foreground">
                      {secondaryCompleted}/{secondaryQuestions.length} completed
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {secondaryCompleted === secondaryQuestions.length && (
                    <CheckCircle className="h-6 w-6 text-green-500 animate-scale-in" />
                  )}
                  <ChevronDown className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    expandedSection === "additional" && "rotate-180"
                  )} />
                </div>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="animate-accordion-down">
              <div className="pt-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {secondaryQuestions.map((question, index) => (
                    <QuestionField
                      key={question.id}
                      question={question}
                      value={responses[question.id]}
                      onChange={(value) => onChange(question.id, value)}
                      isCompleted={getCompletionStatus(question)}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      )}

      {/* Remaining Questions */}
      {remainingQuestions.length > 0 && (
        <Card className="p-8 space-y-8 border-2 hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="space-y-8">
            {remainingQuestions.map((question, index) => (
              <QuestionField
                key={question.id}
                question={question}
                value={responses[question.id]}
                onChange={(value) => onChange(question.id, value)}
                isCompleted={getCompletionStatus(question)}
                index={index}
              />
            ))}
          </div>
        </Card>
      )}

      {/* Contextual Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '800ms' }}>
        {/* Why We Ask */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10 border-blue-200 dark:border-blue-800">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">Why We Ask</h4>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Your organization details help us tailor AI readiness recommendations specific to your industry, size, and role.
            </p>
          </div>
        </Card>

        {/* Data Privacy */}
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10 border-green-200 dark:border-green-800">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <h4 className="font-semibold text-green-900 dark:text-green-100">Secure & Private</h4>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              Your data is encrypted, never shared, and used only to personalize your assessment experience.
            </p>
          </div>
        </Card>
      </div>

      {/* Completion Celebration */}
      {completedQuestions === totalQuestions && (
        <Card className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800 animate-scale-in">
          <div className="flex items-center gap-6">
            <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600 animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
                Profile Complete! 🎉
              </h3>
              <p className="text-green-700 dark:text-green-300">
                Excellent! You're all set to continue with your personalized AI readiness assessment.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}