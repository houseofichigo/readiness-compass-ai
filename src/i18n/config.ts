// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../../public/locales/en/translation.json';
import frTranslation from '../../public/locales/fr/translation.json';

// any ad-hoc overrides (or interim additions) go here:
const overrides = {
  en: {
    assessment: {
      results: {
        track: {
          TECH: 'Technical Track',
          REG:  'Regulated Track',
          GEN:  'General Business Track',
        },
        // …etc
      }
    }
  },
  fr: {
    assessment: {
      results: {
        track: {
          TECH: 'Parcours technique',
          REG:  'Parcours réglementé',
          GEN:  'Parcours général pour les entreprises',
        },
        // …etc
      }
    }
  }
};

const resources = {
  en: {
    translation: {
      ...enTranslation,
      ...overrides.en,
    }
  },
  fr: {
    translation: {
      ...frTranslation,
      ...overrides.fr,
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',            // default language
    fallbackLng: 'en',    // fallback
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
