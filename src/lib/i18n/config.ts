import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { fr } from './locales/fr';

// Get user's preferred language from localStorage or browser
const getInitialLanguage = () => {
  const stored = localStorage.getItem('i18nextLng');
  if (stored) {
    return stored.split('-')[0]; // Clean up language code
  }
  return 'en'; // Default to English
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr }
    },
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr'],
    load: 'languageOnly', // Will strip region code
    interpolation: {
      escapeValue: false
    },
    debug: true // Enable debug mode temporarily
  });

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng);
  document.documentElement.lang = lng;
});

export default i18n; 