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

export interface Translations {
  common: {
    tagline: string;
    cta: {
      becomeDonor: string;
      partnerWithUs: string;
      donateNow: string;
      learnMore: string;
      getStarted: string;
      partnerNow: string;
    };
    signOut: string;
    loading: string;
    actions: {
      edit: string;
      delete: string;
      save: string;
      cancel: string;
    };
    refresh: string;
  };
  nav: {
    solutions_menu: {
      title: string;
      howItWorks: string;
      howItWorksDesc: string;
      solutions: string;
      solutionsDesc: string;
      impact: string;
      impactDesc: string;
      signUp: string;
    };
    company_menu: {
      title: string;
      about: string;
      aboutDesc: string;
      blog: string;
      blogDesc: string;
      whitepaper: string;
      whitepaperDesc: string;
    };
    platform_menu: {
      title: string;
      dashboard: string;
      dashboardDesc: string;
      userManagement: string;
      userManagementDesc: string;
      systemSettings: string;
      systemSettingsDesc: string;
      shelterDashboard: string;
      shelterDashboardDesc: string;
      residentManagement: string;
      residentManagementDesc: string;
    };
    footer: {
      about: string;
      contact: string;
      privacy: string;
      terms: string;
      copyright: string;
      tagline: string;
      quickLinks: string;
      resources: string;
      connect: string;
      links: {
        howItWorks: string;
        solutions: string;
        scanDonate: string;
        about: string;
        blog: string;
        whitepaper: string;
        privacy: string;
        terms: string;
      };
      social: {
        linkedin: string;
        youtube: string;
        tiktok: string;
        website: string;
        substack: string;
        spotify: string;
      };
      podcast: {
        latest: string;
        listen: string;
        listenOn: string;
        duration: string;
        showName: string;
        description: string;
      };
    };
  };
  hero: {
    title: string;
    subtitle: string;
    backgroundAlt: string;
    cta: {
      scan: string;
      learnMore: string;
      title: string;
      description: string;
    };
    features: {
      impact: { title: string; description: string; };
      allocation: { title: string; description: string; };
      housing: { title: string; description: string; };
      qr: { title: string; description: string; };
      security: { title: string; description: string; };
      tracking: { title: string; description: string; };
    };
  };
  auth: {
    login: {
      title: string;
      email: string;
      password: string;
      signIn: string;
      signingIn: string;
      noAccount: string;
      signUp: string;
    };
  };
  dashboard: {
    title: string;
    lastLogin: string;
    never: string;
    loading: string;
    stats: {
      totalDonated: string;
      totalDonations: string;
      activeServices: string;
      beneficiariesHelped: string;
      totalReceived: string;
      housingFund: string;
    };
    roles: {
      admin: {
        superAdmin: {
          title: string;
          subtitle: string;
        };
      };
      participant: DashboardSection;
      donor: DashboardSection;
    };
  };
  metrics: {
    titles: {
      monthlyGrowth: string;
      successRates: string;
      communityImpact: string;
      participantsHoused: string;
    };
  };
  podcast: {
    latest: string;
    listen: string;
    listenOn: string;
    duration: string;
    showName: string;
    description: string;
    preview: string;
  };
}

// Type for translation keys
export type TranslationKey = RecursiveKeyOf<typeof en>;

// Extend i18next types
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      en: typeof en;
      fr: typeof en;
    };
    returnNull: false;
    returnEmptyString: false;
    returnObjects: true;
    allowObjectInHTMLChildren: true;
    key: TranslationKey;
  }
}

export interface WithTranslation {
  t: (key: TranslationKey, options?: any) => string;
  i18n: {
    language: string;
    changeLanguage: (lang: string) => Promise<void>;
  };
}

export type AUTH_ROLES = 
  | 'super_admin'
  | 'admin'
  | 'shelter_admin'
  | 'donor'
  | 'participant';

export interface DashboardStats {
  totalDonations: string;
  totalDonated: string;
  totalParticipants?: string;
  activeParticipants?: string;
  totalTransactions?: string;
  participantGrowth?: string;
  averageDonation?: string;
  monthlyTrends?: string;
  serviceDistribution?: string;
  recentActivity?: string;
  impactScore?: string;
  donationCount?: string;
  beneficiariesHelped?: string;
  monthlyDonation?: string;
  yearlyContribution?: string;
  totalReceived?: string;
  housingFund?: string;
  activeServices?: string;
  nextAppointment?: string;
  programProgress?: string;
}

export interface DashboardSection {
  title: string;
  subtitle: string;
  welcome: string;
  stats: DashboardStats;
  qrCode?: QRCodeSection;
}

export interface QRCodeSection {
  title: string;
  subtitle: string;
  shareText: string;
  downloadText: string;
}