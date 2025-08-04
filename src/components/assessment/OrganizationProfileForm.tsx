import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { assessmentSections } from "@/data/assessmentQuestions";
import { AssessmentValue } from "@/types/assessment";

interface OrganizationProfileFormProps {
  responses: Record<string, AssessmentValue>;
  onChange: (questionId: string, value: AssessmentValue) => void;
}

export function OrganizationProfileForm({
  responses,
  onChange,
}: OrganizationProfileFormProps) {
  // Get the organization profile section
  const profileSection = assessmentSections.find(s => s.id === "section_0");
  
  if (!profileSection) {
    return <div>Profile section not found</div>;
  }

  // Get specific questions by ID
  const getQuestion = (id: string) => 
    profileSection.questions.find(q => q.id === id);

  const emailQuestion = getQuestion("M2");
  const nameQuestion = getQuestion("M1");
  const roleQuestion = getQuestion("M3");
  const companyQuestion = getQuestion("M0");
  const industryQuestion = getQuestion("M4_industry");
  const countryQuestion = getQuestion("M5_country");

  const handleInputChange = (questionId: string, value: string) => {
    onChange(questionId, value);
  };

  return (
    <Card className="p-8 bg-background border border-border shadow-sm">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Respondent Profile</h1>
          <p className="text-muted-foreground text-lg">
            Basic information about you and your organization
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Work Email Address */}
          <div className="space-y-2">
            <Label htmlFor="work-email" className="text-sm font-medium text-foreground">
              Work Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="work-email"
              type="email"
              placeholder="your.email@company.com"
              value={responses.M2 as string || ""}
              onChange={(e) => handleInputChange("M2", e.target.value)}
              className="h-12 text-base bg-background border border-input focus:border-ring focus:ring-1 focus:ring-ring"
              required
            />
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="full-name" className="text-sm font-medium text-foreground">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="full-name"
              type="text"
              placeholder="John Smith"
              value={responses.M1 as string || ""}
              onChange={(e) => handleInputChange("M1", e.target.value)}
              className="h-12 text-base bg-background border border-input focus:border-ring focus:ring-1 focus:ring-ring"
              required
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium text-foreground">
              Role <span className="text-destructive">*</span>
            </Label>
            <Select 
              value={responses.M3 as string || ""} 
              onValueChange={(value) => handleInputChange("M3", value)}
            >
              <SelectTrigger className="h-12 text-base bg-background border border-input focus:border-ring focus:ring-1 focus:ring-ring">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-background border border-border shadow-lg max-h-60">
                {roleQuestion?.options?.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="company-name" className="text-sm font-medium text-foreground">
              Company Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="company-name"
              type="text"
              placeholder="Acme Corporation"
              value={responses.M0 as string || ""}
              onChange={(e) => handleInputChange("M0", e.target.value)}
              className="h-12 text-base bg-background border border-input focus:border-ring focus:ring-1 focus:ring-ring"
              required
            />
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <Label htmlFor="industry" className="text-sm font-medium text-foreground">
              Industry <span className="text-destructive">*</span>
            </Label>
            <Select 
              value={responses.M4_industry as string || ""} 
              onValueChange={(value) => handleInputChange("M4_industry", value)}
            >
              <SelectTrigger className="h-12 text-base bg-background border border-input focus:border-ring focus:ring-1 focus:ring-ring">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-background border border-border shadow-lg max-h-60">
                {industryQuestion?.options?.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium text-foreground">
              Country <span className="text-destructive">*</span>
            </Label>
            <Select 
              value={responses.M5_country as string || ""} 
              onValueChange={(value) => handleInputChange("M5_country", value)}
            >
              <SelectTrigger className="h-12 text-base bg-background border border-input focus:border-ring focus:ring-1 focus:ring-ring">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-background border border-border shadow-lg max-h-60">
                {countryQuestion?.options?.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
}