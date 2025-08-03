import { QuestionOption } from "@/types/assessment";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface MultiSelectQuestionProps {
  options: QuestionOption[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function MultiSelectQuestion({ 
  options, 
  value, 
  onChange 
}: MultiSelectQuestionProps) {
  const handleOptionChange = (optionValue: string, checked: boolean) => {
    const newValue = [...value];
    
    if (checked) {
      if (!newValue.includes(optionValue)) {
        newValue.push(optionValue);
      }
    } else {
      const index = newValue.indexOf(optionValue);
      if (index > -1) {
        newValue.splice(index, 1);
      }
    }
    
    onChange(newValue);
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="text-sm text-muted-foreground mb-3">
        Select all that apply
      </div>
      
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox
            id={option.value}
            checked={value.includes(option.value)}
            onCheckedChange={(checked) => 
              handleOptionChange(option.value, checked as boolean)
            }
          />
          <Label 
            htmlFor={option.value} 
            className="font-normal cursor-pointer text-sm"
          >
            {option.label}
          </Label>
        </div>
      ))}
      
      {value.length > 0 && (
        <div className="mt-4 p-3 bg-accent/50 rounded-lg">
          <div className="text-sm font-medium mb-1">Selected:</div>
          <div className="text-sm text-muted-foreground">
            {value.map(item => {
              const option = options.find(opt => opt.value === item);
              return option?.label;
            }).join(", ")}
          </div>
        </div>
      )}
    </div>
  );
}