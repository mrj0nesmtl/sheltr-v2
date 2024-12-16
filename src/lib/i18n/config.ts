import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { fr } from './locales/fr';

// Initialize i18next once
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        fr: { translation: fr }
      },
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      },
      debug: process.env.NODE_ENV === 'development'
    });
}

export default i18n; 