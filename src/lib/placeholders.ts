import i18n from '@/lib/i18n'

const PLACEHOLDERS = {
  en: {
    adminEmail: 'admin@company.com',
    organizationName: 'Enter your organization name',
    fullName: 'Enter your full name',
    businessEmail: 'your.name@company.com',
    primaryRole: 'Select your primary role...',
    industry: 'Select your industry...',
    country: 'Select your country...',
    selectOption: 'Select an option...',
    searchTools: 'Search tools or categories...',
    searchSubmissions: 'Search submissions...',
    enterYour: 'Enter your',
  },
  fr: {
    adminEmail: 'admin@entreprise.com',
    organizationName: "Entrez le nom de votre organisation",
    fullName: 'Entrez votre nom complet',
    businessEmail: 'votre.nom@entreprise.com',
    primaryRole: 'Sélectionnez votre rôle principal...',
    industry: 'Sélectionnez votre secteur...',
    country: 'Sélectionnez votre pays...',
    selectOption: 'Sélectionnez une option...',
    searchTools: 'Recherchez des outils ou des catégories...',
    searchSubmissions: 'Recherchez des soumissions...',
    enterYour: 'Entrez votre',
  },
} as const

export type PlaceholderKey = keyof typeof PLACEHOLDERS.en

export function getPlaceholder(key: PlaceholderKey): string {
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'
  return PLACEHOLDERS[lang][key] || PLACEHOLDERS.en[key]
}
