import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { fr } from './locales/fr';
import type { TranslationKey } from './types';

// Initialize i18next
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    resources: {
      en: { translation: en },
      fr: { translation: fr }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export type { TranslationKey };
export default i18n;