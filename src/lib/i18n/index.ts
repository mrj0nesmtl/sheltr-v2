import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en } from './locales/en';
import { fr } from './locales/fr';
import type { TranslationKey } from './types';

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr }
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false
    },

    // Detect from browser
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export type { TranslationKey };
export default i18n;