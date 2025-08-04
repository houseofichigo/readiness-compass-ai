import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
        return (
          <RadioGroup
            value={value}
            onValueChange={onChange}
            className="mt-4 space-y-3"
          >
            {question.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="font-normal cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "multi":
        return (
          <MultiSelectQuestion
            options={question.options || []}
            value={value || []}
            onChange={onChange}
          />
        );

      case "rank":
        return (
          <DragDropQuestionRank
            options={question.options || []}
            value={value || []}
            onChange={onChange}
            maxRank={question.max_rank || 3}
          />
        );

      case "industry_dropdown":
        return (
          <Select value={value || ""} onValueChange={onChange}>
            <SelectTrigger className="mt-2 bg-background border-input">
              <SelectValue placeholder="Select industry..." />
            </SelectTrigger>
            <SelectContent className="z-50 bg-background border border-border">
              <SelectItem value="Agriculture">Agriculture</SelectItem>
              <SelectItem value="Automotive">Automotive</SelectItem>
              <SelectItem value="Banking & Finance">Banking & Finance</SelectItem>
              <SelectItem value="Construction">Construction</SelectItem>
              <SelectItem value="Consulting">Consulting</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Energy & Utilities">Energy & Utilities</SelectItem>
              <SelectItem value="Entertainment & Media">Entertainment & Media</SelectItem>
              <SelectItem value="Fashion & Retail">Fashion & Retail</SelectItem>
              <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
              <SelectItem value="Government">Government</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Hospitality & Tourism">Hospitality & Tourism</SelectItem>
              <SelectItem value="Insurance">Insurance</SelectItem>
              <SelectItem value="Legal Services">Legal Services</SelectItem>
              <SelectItem value="Logistics & Transportation">Logistics & Transportation</SelectItem>
              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
              <SelectItem value="Non-profit">Non-profit</SelectItem>
              <SelectItem value="Pharmaceuticals">Pharmaceuticals</SelectItem>
              <SelectItem value="Real Estate">Real Estate</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Telecommunications">Telecommunications</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        );

      case "country_dropdown":
        return (
          <Select value={value || ""} onValueChange={onChange}>
            <SelectTrigger className="mt-2 bg-background border-input">
              <SelectValue placeholder="Select country..." />
            </SelectTrigger>
            <SelectContent className="z-50 bg-background border border-border max-h-48">
              <SelectItem value="Austria">Austria</SelectItem>
              <SelectItem value="Belgium">Belgium</SelectItem>
              <SelectItem value="Bulgaria">Bulgaria</SelectItem>
              <SelectItem value="Croatia">Croatia</SelectItem>
              <SelectItem value="Cyprus">Cyprus</SelectItem>
              <SelectItem value="Czech Republic">Czech Republic</SelectItem>
              <SelectItem value="Denmark">Denmark</SelectItem>
              <SelectItem value="Estonia">Estonia</SelectItem>
              <SelectItem value="Finland">Finland</SelectItem>
              <SelectItem value="France">France</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="Greece">Greece</SelectItem>
              <SelectItem value="Hungary">Hungary</SelectItem>
              <SelectItem value="Ireland">Ireland</SelectItem>
              <SelectItem value="Italy">Italy</SelectItem>
              <SelectItem value="Latvia">Latvia</SelectItem>
              <SelectItem value="Lithuania">Lithuania</SelectItem>
              <SelectItem value="Luxembourg">Luxembourg</SelectItem>
              <SelectItem value="Malta">Malta</SelectItem>
              <SelectItem value="Netherlands">Netherlands</SelectItem>
              <SelectItem value="Poland">Poland</SelectItem>
              <SelectItem value="Portugal">Portugal</SelectItem>
              <SelectItem value="Romania">Romania</SelectItem>
              <SelectItem value="Slovakia">Slovakia</SelectItem>
              <SelectItem value="Slovenia">Slovenia</SelectItem>
              <SelectItem value="Spain">Spain</SelectItem>
              <SelectItem value="Sweden">Sweden</SelectItem>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              <SelectItem value="United States">United States</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="p-6 shadow-elegant border-0 bg-card/50 backdrop-blur-sm">
      <div className="mb-4">
        {question.type !== "checkbox" && (
          <Label className="text-lg font-medium text-foreground mb-2 block">
            {question.text}
            {question.required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        
        {question.helper && (
          <p className="text-sm text-muted-foreground mb-3">
            {question.helper}
          </p>
        )}
      </div>

      {renderQuestionInput()}
    </Card>
  );
}