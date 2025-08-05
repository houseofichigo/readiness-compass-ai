import React from "react";
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
import i18n from "@/lib/i18n";
import { getPlaceholder } from "@/lib/placeholders";

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
  const lang = i18n.language.startsWith("fr") ? "fr" : "en";

  // Helper to find question by ID
  const findQuestion = (id: string) => questions.find((q) => q.id === id);

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

  // Pull out each field
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
      {/* Basic Information */}
      <Card className="p-6 border border-border/50">
        <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-border/30">
          {lang === "fr" ? "Informations de base" : "Basic Information"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Organization Name */}
          {orgName && (
            <div className="space-y-2">
              {renderLabel(orgName)}
              <Input
                type="text"
                value={responses[orgName.id] || ""}
                onChange={(e) => onChange(orgName.id, e.target.value)}
                placeholder={
                  lang === "fr"
                    ? "Entrez le nom de votre organisation"
                    : getPlaceholder("organizationName")
                }
                className="focus-visible:ring-2 focus-visible:ring-primary/20"
              />
              {renderHelper(orgName)}
            </div>
          )}

          {/* Full Name */}
          {fullName && (
            <div className="space-y-2">
              {renderLabel(fullName)}
              <Input
                type="text"
                value={responses[fullName.id] || ""}
                onChange={(e) => onChange(fullName.id, e.target.value)}
                placeholder={
                  lang === "fr"
                    ? "Entrez votre nom complet"
                    : getPlaceholder("fullName")
                }
                className="focus-visible:ring-2 focus-visible:ring-primary/20"
              />
              {renderHelper(fullName)}
            </div>
          )}

          {/* Business Email */}
          {email && (
            <div className="space-y-2">
              {renderLabel(email)}
              <Input
                type="email"
                value={responses[email.id] || ""}
                onChange={(e) => onChange(email.id, e.target.value)}
                placeholder={
                  lang === "fr"
                    ? "votre.nom@entreprise.com"
                    : getPlaceholder("businessEmail")
                }
                className="focus-visible:ring-2 focus-visible:ring-primary/20"
              />
              {renderHelper(email)}
            </div>
          )}

          {/* Primary Role */}
          {role && (
            <div className="space-y-2">
              {renderLabel(role)}
              <Select
                value={responses[role.id] || ""}
                onValueChange={(val) => onChange(role.id, val)}
              >
                <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-primary/20 bg-background border border-border">
                  <SelectValue
                    placeholder={
                      lang === "fr"
                        ? "Sélectionnez votre rôle principal..."
                        : getPlaceholder("primaryRole")
                    }
                  />
                </SelectTrigger>
                <SelectContent className="z-50 bg-background border border-border shadow-lg max-h-60">
                  {role.options?.map((opt) => {
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
              {renderHelper(role)}
            </div>
          )}

          {/* Industry */}
          {industry && (
            <div className="space-y-2">
              {renderLabel(industry)}
              <Select
                value={responses[industry.id] || ""}
                onValueChange={(val) => onChange(industry.id, val)}
              >
                <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-primary/20 bg-background border border-border">
                  <SelectValue
                    placeholder={
                      lang === "fr"
                        ? "Sélectionnez votre secteur..."
                        : getPlaceholder("industry")
                    }
                  />
                </SelectTrigger>
                <SelectContent className="z-50 bg-background border border-border shadow-lg max-h-60">
                  {industry.options?.map((opt) => {
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
              {renderHelper(industry)}
            </div>
          )}

          {/* Country */}
          {country && (
            <div className="space-y-2">
              {renderLabel(country)}
              <Select
                value={responses[country.id] || ""}
                onValueChange={(val) => onChange(country.id, val)}
              >
                <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-primary/20 bg-background border border-border">
                  <SelectValue
                    placeholder={
                      lang === "fr"
                        ? "Sélectionnez votre pays..."
                        : getPlaceholder("country")
                    }
                  />
                </SelectTrigger>
                <SelectContent className="z-50 bg-background border border-border shadow-lg max-h-60">
                  {country.options?.map((opt) => {
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
              {renderHelper(country)}
            </div>
          )}
        </div>
      </Card>

      {/* Organization Details */}
      <Card className="p-6 border border-border/50">
        <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-border/30">
          {lang === "fr" ? "Détails de l'organisation" : "Organization Details"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Size */}
          {companySize && (
            <div className="space-y-4">
              {renderLabel(companySize)}
              <RadioGroup
                value={responses[companySize.id] || ""}
                onValueChange={(val) => onChange(companySize.id, val)}
                className="space-y-3"
              >
                {companySize.options?.map((opt) => {
                  const val = typeof opt === "string" ? opt : opt.value;
                  const label = typeof opt === "string" ? opt : opt.label;
                  return (
                    <div key={val} className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={val}
                        id={`size-${val}`}
                        className="mt-0.5"
                      />
                      <Label
                        htmlFor={`size-${val}`}
                        className="font-normal cursor-pointer text-sm"
                      >
                        {label}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
              {renderHelper(companySize)}
            </div>
          )}

          {/* Annual Revenue */}
          {revenue && (
            <div className="space-y-4">
              {renderLabel(revenue)}
              <RadioGroup
                value={responses[revenue.id] || ""}
                onValueChange={(val) => onChange(revenue.id, val)}
                className="space-y-3"
              >
                {revenue.options?.map((opt) => {
                  const val = typeof opt === "string" ? opt : opt.value;
                  const label = typeof opt === "string" ? opt : opt.label;
                  return (
                    <div key={val} className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={val}
                        id={`revenue-${val}`}
                        className="mt-0.5"
                      />
                      <Label
                        htmlFor={`revenue-${val}`}
                        className="font-normal cursor-pointer text-sm"
                      >
                        {label}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
              {renderHelper(revenue)}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
