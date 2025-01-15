import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEn from './locales/en/common.json';
import commonFr from './locales/fr/common.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof commonEn;
    };
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: commonEn
      },
      fr: {
        common: commonFr
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    },
    debug: false,
    saveMissing: false,
    silent: true
  });

// Suppress i18next console warnings in development
if (process.env.NODE_ENV === 'development') {
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    if (!args[0]?.includes('i18next::translator')) {
      originalConsoleWarn.apply(console, args);
    }
  };
}

export default i18n;
