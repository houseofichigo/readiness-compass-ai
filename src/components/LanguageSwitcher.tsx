import { useState } from 'react'
import { Globe } from 'lucide-react'

import i18n from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const [language, setLanguage] = useState(i18n.language)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value
    i18n.changeLanguage(newLang)
    setLanguage(newLang)
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2',
        className
      )}
    >
      <Globe className="w-4 h-4" />
      <select
        value={language}
        onChange={handleChange}
        className="bg-transparent border-none outline-none text-sm"
      >
        <option value="en">🇺🇸 English</option>
        <option value="es">🇪🇸 Spanish</option>
        <option value="fr">🇫🇷 French</option>
        <option value="de">🇩🇪 German</option>
      </select>
    </div>
  )
}
