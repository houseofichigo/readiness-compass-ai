import { Alert } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ConsentBannerProps {
  id: string;
  text: string;
  required?: boolean;
  accepted: boolean;
  onChange: (accepted: boolean) => void;
}

export function ConsentBanner({ id, text, required, accepted, onChange }: ConsentBannerProps) {
  return (
    <Alert className="flex items-start gap-2">
      <Checkbox id={id} checked={accepted} onCheckedChange={(checked) => onChange(checked === true)} />
      <Label htmlFor={id} className="text-sm font-normal leading-5">
        {text}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
    </Alert>
  );
}
