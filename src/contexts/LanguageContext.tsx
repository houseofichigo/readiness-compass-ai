// src/contexts/LanguageContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, LanguageContextType } from '@/types/language';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageStorage] = useLocalStorage<Language>('app-language', 'en');

  const setLanguage = (lang: Language) => {
    setLanguageStorage(lang);
  };

  // Translation function with French support
  const t = (key: string, fallback?: string): string => {
    if (language === 'en') {
      return fallback || key;
    }
    
    // French translation logic
    try {
      const { frenchTranslations } = require('@/data/assessmentQuestions');
      const keyParts = key.split('.');
      let value = frenchTranslations;
      
      for (const part of keyParts) {
        value = value?.[part];
        if (!value) break;
      }
      
      return (typeof value === 'string' ? value : fallback) || key;
    } catch {
      return fallback || key;
    }
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}