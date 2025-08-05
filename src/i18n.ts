import en from './locales/en.json';
import fr from './locales/fr.json';

type Lang = 'en' | 'fr';
type Translation = Record<string, string | Translation>;
const resources: Record<Lang, Translation> = {
  en: en as Translation,
  fr: fr as Translation
};
let currentLang: Lang = 'en';

export function setLanguage(lang: Lang) {
  if (resources[lang]) {
    currentLang = lang;
  }
}

export function t(key: string): string {
  const segments = key.split('.');
  let result: unknown = resources[currentLang];
  for (const seg of segments) {
    if (typeof result === 'object' && result !== null && seg in result) {
      result = (result as Translation)[seg];
    } else {
      return key;
    }
  }
  return typeof result === 'string' ? result : key;
}
