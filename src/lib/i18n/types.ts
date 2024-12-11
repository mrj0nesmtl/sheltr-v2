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

export type UserRole = 
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

export interface QRCodeSection {
  title: string;
  subtitle: string;
  shareText: string;
  downloadText: string;
}

export interface DashboardSection {
  title: string;
  subtitle: string;
  welcome: string;
  stats: DashboardStats;
  qrCode?: QRCodeSection;
}

export interface DashboardTranslations {
  title: string;
  lastLogin: string;
  never: string;
  loading: string;
  roles: {
    participant: DashboardSection;
    admin: DashboardSection;
    donor: DashboardSection;
  };
}

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
    donor_menu: {
      title: string;
      donationHistory: string;
      donationHistoryDesc: string;
      personalImpact: string;
      personalImpactDesc: string;
    };
    scanDonate: string;
    signUp: string;
    login: string;
    profile: string;
    dashboard: string;
    signOut: string;
    about: string;
    menu: string;
    blog: string;
    blockchain: {
      title: string;
      desc: string;
      menu: {
        whitepaper: string;
        whitepaperDesc: string;
        token: string;
        tokenDesc: string;
        transactions: string;
        transactionsDesc: string;
        depot: string;
        depotDesc: string;
      };
    };
    participant_menu: {
      title: string;
      availableServices: string;
      availableServicesDesc: string;
      serviceHistory: string;
      serviceHistoryDesc: string;
    };
    language: string;
    closeMenu: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    resources: string;
    connect: string;
    links: {
      howItWorks: string;
      solutions: string;
      scanDonate: string;
      blog: string;
      privacy: string;
      terms: string;
    };
    social: {
      linkedin: string;
      youtube: string;
      tiktok: string;
      website: string;
      substack: string;
    };
    podcast: {
      latest: string;
      listen: string;
      listenOn: string;
      duration: string;
      showName: string;
      description: string;
    };
    copyright: string;
    rights: string;
    language: string;
  };
  dashboard: DashboardTranslations;
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
  howItWorks: {
    title: string;
    subtitle: string;
    steps: {
      scan: { title: string; description: string; };
      allocation: { title: string; description: string; };
      processing: { title: string; description: string; };
      housing: { title: string; description: string; };
    };
    transparency: {
      title: string;
      blockchain: { title: string; description: string; };
      contracts: { title: string; description: string; };
      tracking: { title: string; description: string; };
    };
    cta: { title: string; description: string; };
  };
  solutions: {
    title: string;
    subtitle: string;
    sections: {
      shelters: { title: string; features: string[]; };
      residents: { title: string; features: string[]; };
      tracking: { title: string; features: string[]; };
    };
    partnership: {
      title: string;
      technology: { title: string; features: string[]; };
      support: { title: string; features: string[]; };
      engagement: { title: string; features: string[]; };
    };
    cta: { title: string; description: string; };
  };
  whitepaper: {
    title: string;
    sections: {
      overview: { title: string; content: string; };
      vision: { title: string; content: string; };
      blockchain: {
        title: string;
        sections: {
          smartContracts: string;
          tokenomics: string;
          verification: string;
        };
      };
    };
  };
  impact: {
    title: string;
    subtitle: string;
    metrics: {
      monthlyGrowth: string;
      successRates: string;
      communityImpact: string;
      participantsHoused: string;
      citiesAndTowns: string;
      donationIncrease: string;
      categories: {
        housingPlacement: string;
        jobPlacement: string;
        financialStability: string;
        healthcareAccess: string;
      };
      livesImpacted: string;
    };
    cta: { title: string; description: string; getStarted: string; };
  };
  qrScanner: {
    title: string;
    instructions: string;
    scannerActive: string;
    retryButton: string;
    errors: {
      cameraPermission: string;
      noCamera: string;
      cameraInUse: string;
      initialization: string;
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
      errors: {
        invalidCredentials: string;
        serverError: string;
      };
    };
  };
  about: {
    title: string;
    intro: {
      title: string;
      content: string;
    };
    readme: {
      title: string;
      content: string;
    };
    techstack: {
      title: string;
      content: string;
    };
    whitepaper: {
      title: string;
      content: string;
    };
  };
  transaction: {
    status: {
      completed: string;
      pending: string;
      failed: string;
    };
  };
  support: {
    needHelp: string;
    description: string;
    callUs: string;
    callDescription: string;
    chatWithUs: string;
    chatDescription: string;
    startChat: string;
  };
  admin: {
    shelter: {
      title: string;
      subtitle: string;
      welcome: string;
      donors: {
        title: string;
        export: string;
        name: string;
        totalDonated: string;
        lastDonation: string;
        frequency: string;
        status: string;
      };
      participants: {
        title: string;
        add: string;
        name: string;
        status: string;
        joinDate: string;
        totalReceived: string;
        qrCode: string;
        loginToken: string;
        viewDetails: string;
        statuses: {
          active: string;
          inactive: string;
          pending: string;
        };
      };
    };
  };
} 