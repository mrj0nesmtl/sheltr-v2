import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { fr } from './locales/fr/fr';
import { en } from './locales/en/en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      fr: {
        translation: fr
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    debug: true,
    returnNull: false,
    returnEmptyString: false,
    returnObjects: true
  });

// Add debug listener
i18n.on('initialized', (options) => {
  console.log('i18n initialized with options:', options);
  console.log('Available translations:', i18n.store.data);
});

i18n.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng);
  console.log('Current translations:', i18n.store.data[lng]);
});

export default i18n;
