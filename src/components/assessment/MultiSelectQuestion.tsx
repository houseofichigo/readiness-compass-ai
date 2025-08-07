import { QuestionChoice } from "@/types/assessment";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface MultiSelectQuestionProps {
  choices: QuestionChoice[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function MultiSelectQuestion({ 
  choices, 
  value, 
  onChange 
}: MultiSelectQuestionProps) {
  const handleOptionChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      // Add option if not already present
      if (!value.includes(optionValue)) {
        onChange([...value, optionValue]);
      }
    } else {
      // Remove option
      onChange(value.filter(v => v !== optionValue));
    }
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="text-sm text-muted-foreground mb-3">
        Select all that apply
      </div>
      
      {choices.map((choice) => (
        <div key={choice.value} className="flex items-center space-x-2">
          <Checkbox
            id={choice.value}
            checked={value.includes(choice.value)}
            onCheckedChange={(checked) => 
              handleOptionChange(choice.value, checked as boolean)
            }
          />
          <Label 
            htmlFor={choice.value} 
            className="font-normal cursor-pointer text-sm"
          >
            {choice.label}
          </Label>
        </div>
      ))}
      
      {value.length > 0 && (
        <div className="mt-4 p-3 bg-accent/50 rounded-lg">
          <div className="text-sm font-medium mb-1">Selected:</div>
          <div className="text-sm text-muted-foreground">
            {value.map(item => {
              const choice = choices.find(opt => opt.value === item);
              return choice?.label;
            }).join(", ")}
          </div>
        </div>
      )}
    </div>
  );
}