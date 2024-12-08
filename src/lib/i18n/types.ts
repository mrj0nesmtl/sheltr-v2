import { en } from './locales/en';

// Define nested key paths for type-safe translations
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];

// Define icon names type
export type IconName = 
  | 'info' 
  | 'code'
  | 'users'
  | 'fileText'
  | 'coins'
  | 'activity'
  | 'shopping-bag'
  | 'blocks'
  | 'chevronDown'
  | 'globe'
  | 'loader';

// Define translation namespace structure
export interface TranslationNamespaces {
  common: typeof en.common;
  nav: typeof en.nav;
  hero: typeof en.hero;
  howItWorks: typeof en.howItWorks;
  solutions: typeof en.solutions;
  whitepaper: typeof en.whitepaper;
  impact: typeof en.impact;
  qrScanner: typeof en.qrScanner;
  auth: typeof en.auth;
  about: typeof en.about;
  transaction: typeof en.transaction;
  support: typeof en.support;
  podcast: typeof en.podcast;
  dashboard: typeof en.dashboard;
}

// Type for translation keys
export type TranslationKey = RecursiveKeyOf<typeof en>;

// Extend i18next types
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      en: typeof en;
      fr: typeof en; // Use same structure as English
    };
    returnNull: false;
    returnEmptyString: false;
    returnObjects: true;
    allowObjectInHTMLChildren: true;
    // Define key type
    key: TranslationKey;
  }
}

// Export type for component props that use translations
export interface WithTranslation {
  t: (key: TranslationKey, options?: any) => string;
  i18n: {
    language: string;
    changeLanguage: (lang: string) => Promise<void>;
  };
} 