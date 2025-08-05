import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2',
        className
      )}
    >
      <Globe className="w-4 h-4" />
      <Select value={i18n.language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="border-none bg-transparent shadow-none min-w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">🇺🇸 English</SelectItem>
          <SelectItem value="fr">🇫🇷 Français</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}