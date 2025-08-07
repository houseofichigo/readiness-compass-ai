import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question } from "@/types/assessment";
import { getLocalizedQuestion } from "@/utils/assessmentUtils";

interface OrganizationProfileFormProps {
  questions: Question[];
  responses: Record<string, any>;
  onChange: (questionId: string, value: any) => void;
}

export function OrganizationProfileForm({
  questions,
  responses,
  onChange,
}: OrganizationProfileFormProps) {
  const { t, i18n } = useTranslation();
  
  // Helper to find question by ID and localize it with fallback
  const findQuestion = (id: string) => {
    const question = questions.find(q => q.id === id);
    if (!question) return undefined;
    
    try {
      return getLocalizedQuestion(question, i18n.language);
    } catch (error) {
      console.warn(`Error localizing question ${id}:`, error);
      return question; // Fallback to original question
    }
  };

  // Helper to render field label with required asterisk
  const renderLabel = (question: Question) => (
    <Label className="text-sm font-medium">
      {question.text}
      {question.required && <span className="text-red-500 ml-1">*</span>}
    </Label>
  );

  // Helper to render helper text
  const renderHelper = (question: Question) => 
    question.helper && (
      <p className="text-xs text-muted-foreground mt-1">{question.helper}</p>
    );

  // Get questions
  const orgName = findQuestion("M0");
  const fullName = findQuestion("M1");
  const email = findQuestion("M2");
  const role = findQuestion("M3");
  const industry = findQuestion("M4_industry");
  const country = findQuestion("M5_country");
  const companySize = findQuestion("M6_size");
  const revenue = findQuestion("M7_revenue");

  return (
    <div className="space-y-8">
      {/* Basic Information Section */}
      <Card className="p-6 border border-border/50">
        <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-border/30">
          {t("form.basicInformation")}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Row 1: Organization name | Full name */}
          <div className="space-y-2">
            {orgName && (
              <>
                {renderLabel(orgName)}
                <Input
                  type="text"
                  value={responses[orgName.id] || ""}
                  onChange={(e) => onChange(orgName.id, e.target.value)}
                  placeholder={t("form.enterOrgName")}
                  className="focus-visible:ring-2 focus-visible:ring-primary/20"
                />
                {renderHelper(orgName)}
              </>
            )}
          </div>
          
          <div className="space-y-2">
            {fullName && (
              <>
                {renderLabel(fullName)}
                <Input
                  type="text"
                  value={responses[fullName.id] || ""}
                  onChange={(e) => onChange(fullName.id, e.target.value)}
                  placeholder={t("form.enterFullName")}
                  className="focus-visible:ring-2 focus-visible:ring-primary/20"
                />
                {renderHelper(fullName)}
              </>
            )}
          </div>

          {/* Row 2: Business email | Primary role */}
          <div className="space-y-2">
            {email && (
              <>
                {renderLabel(email)}
                <Input
                  type="email"
                  value={responses[email.id] || ""}
                  onChange={(e) => onChange(email.id, e.target.value)}
                  placeholder={t("form.enterEmail")}
                  className="focus-visible:ring-2 focus-visible:ring-primary/20"
                />
                {renderHelper(email)}
              </>
            )}
          </div>
          
          <div className="space-y-2">
            {role && role.options ? (
              <>
                {renderLabel(role)}
                <Select 
                  value={responses[role.id] || ""} 
                  onValueChange={(value) => onChange(role.id, value)}
                >
                  <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-primary/20 bg-background border border-border">
                    <SelectValue placeholder={t("form.selectRole")} />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-background border border-border shadow-lg max-h-60">
                    {role.options.map((opt, index) => {
                      if (!opt) return null;
                      const val = typeof opt === "string" ? opt : (opt?.value || `option-${index}`);
                      const label = typeof opt === "string" ? opt : (opt?.label || val);
                      if (!val) return null;
                      return (
                        <SelectItem 
                          key={`role-${index}`} 
                          value={String(val)}
                          className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                        >
                          {label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {renderHelper(role)}
              </>
            ) : (
              <div className="text-muted-foreground">Role options not available</div>
            )}
          </div>

          {/* Row 3: Industry & sub-sector | Country */}
          <div className="space-y-2">
            {industry && industry.options ? (
              <>
                {renderLabel(industry)}
                <Select 
                  value={responses[industry.id] || ""} 
                  onValueChange={(value) => onChange(industry.id, value)}
                >
                  <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-primary/20 bg-background border border-border">
                    <SelectValue placeholder={t("form.selectIndustry")} />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-background border border-border shadow-lg max-h-60">
                    {industry.options.map((opt, index) => {
                      if (!opt) return null;
                      const val = typeof opt === "string" ? opt : (opt?.value || `option-${index}`);
                      const label = typeof opt === "string" ? opt : (opt?.label || val);
                      if (!val) return null;
                      return (
                        <SelectItem 
                          key={`industry-${index}`} 
                          value={String(val)}
                          className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                        >
                          {label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {renderHelper(industry)}
              </>
            ) : (
              <div className="text-muted-foreground">Industry options not available</div>
            )}
          </div>
          
          <div className="space-y-2">
            {country && country.options ? (
              <>
                {renderLabel(country)}
                <Select 
                  value={responses[country.id] || ""} 
                  onValueChange={(value) => onChange(country.id, value)}
                >
                  <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-primary/20 bg-background border border-border">
                    <SelectValue placeholder={t("form.selectCountry")} />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-background border border-border shadow-lg max-h-60">
                    {country.options.map((opt, index) => {
                      if (!opt) return null;
                      const val = typeof opt === "string" ? opt : (opt?.value || `option-${index}`);
                      const label = typeof opt === "string" ? opt : (opt?.label || val);
                      if (!val) return null;
                      return (
                        <SelectItem 
                          key={`country-${index}`} 
                          value={String(val)}
                          className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                        >
                          {label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {renderHelper(country)}
              </>
            ) : (
              <div className="text-muted-foreground">Country options not available</div>
            )}
          </div>
        </div>
      </Card>

      {/* Organization Details Section */}
      <Card className="p-6 border border-border/50">
        <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-border/30">
          {t("form.organizationDetails")}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Row 1: Company size | Annual revenue */}
          <div className="space-y-4">
            {companySize && companySize.options ? (
              <>
                {renderLabel(companySize)}
                <RadioGroup
                  value={responses[companySize.id] || ""}
                  onValueChange={(value) => onChange(companySize.id, value)}
                  className="space-y-3"
                >
                  {companySize.options.map((opt, index) => {
                    // Handle both string and object options safely
                    const val = typeof opt === "string" ? opt : (opt?.value || `option-${index}`);
                    const label = typeof opt === "string" ? opt : (opt?.label || val);
                    
                    // Create safe ID by removing special characters
                    const safeId = `size-${index}-${String(val).replace(/[^a-zA-Z0-9]/g, '-')}`;
                    
                    return (
                      <div key={`size-${index}`} className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value={String(val)} 
                          id={safeId}
                          className="mt-0.5" 
                        />
                        <Label
                          htmlFor={safeId}
                          className="font-normal cursor-pointer text-sm"
                        >
                          {label}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
                {renderHelper(companySize)}
              </>
            ) : (
              <div className="text-muted-foreground">Company size options not available</div>
            )}
          </div>
          
          <div className="space-y-4">
            {revenue && revenue.options ? (
              <>
                {renderLabel(revenue)}
                <RadioGroup
                  value={responses[revenue.id] || ""}
                  onValueChange={(value) => onChange(revenue.id, value)}
                  className="space-y-3"
                >
                  {revenue.options.map((opt, index) => {
                    // Handle both string and object options safely
                    const val = typeof opt === "string" ? opt : (opt?.value || `option-${index}`);
                    const label = typeof opt === "string" ? opt : (opt?.label || val);
                    
                    // Create safe ID by removing special characters
                    const safeId = `revenue-${index}-${String(val).replace(/[^a-zA-Z0-9]/g, '-')}`;
                    
                    return (
                      <div key={`revenue-${index}`} className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value={String(val)} 
                          id={safeId}
                          className="mt-0.5" 
                        />
                        <Label
                          htmlFor={safeId}
                          className="font-normal cursor-pointer text-sm"
                        >
                          {label}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
                {renderHelper(revenue)}
              </>
            ) : (
              <div className="text-muted-foreground">Annual revenue options not available</div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}