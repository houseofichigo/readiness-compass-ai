// src/types/language.ts

export type Language = 'en' | 'fr';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

export interface LocalizedContent {
  [key: string]: string | LocalizedContent;
}