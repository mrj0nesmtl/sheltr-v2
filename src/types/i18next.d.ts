import { en } from '../locales/en/en';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      'en-US': typeof en;
      'fr': typeof en;
    };
    defaultNS: undefined;
  }
}
