import i18n from 'i18next';
import { en } from './locales/en';
import { fr } from './locales/fr';

i18n.init({
  resources: {
    en: { translation: en },
    fr: { translation: fr }
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n; 