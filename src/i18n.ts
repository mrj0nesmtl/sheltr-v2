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
    debug: true
  });

export default i18n;
