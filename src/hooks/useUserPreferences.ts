import { useState, useEffect } from 'react';

interface UserPreferences {
  language: string;
  theme?: string;
}

const PREFERENCES_KEY = 'user-preferences';

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : { language: 'en' };
    } catch {
      return { language: 'en' };
    }
  });

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);
    
    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(newPreferences));
    } catch (error) {
      console.warn('Failed to save user preferences:', error);
    }
  };

  return {
    preferences,
    updatePreferences,
  };
}