import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  
  // Use translated text if available, fallback to original text
  const displayText = i18n.language === 'fr' && text.includes('By proceeding, you agree to process') 
    ? t("assessment.consent.dataProcessing")
    : text;
    
  return (
    <Alert className="flex items-start gap-2">
      <Checkbox id={id} checked={accepted} onCheckedChange={(checked) => onChange(checked === true)} />
      <Label htmlFor={id} className="text-sm font-normal leading-5">
        {displayText}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
    </Alert>
  );
}
