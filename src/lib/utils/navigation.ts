import { AUTH_ROLES } from '@/lib/types/auth';

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  roles?: AUTH_ROLES[];
}

export interface NavigationSection {
  items: NavigationItem[];
  roles?: AUTH_ROLES[];
}

export const getNavigationConfig = (t: (key: string) => string) => ({
  public: {
    items: [
      { label: t('nav.howItWorks'), href: '/how-it-works' },
      { label: t('nav.solutions'), href: '/solutions' },
      { label: t('nav.scanDonate'), href: '/scan-donate' },
      { label: t('nav.impact'), href: '/impact' }
    ]
  },
  user: {
    items: [
      { 
        label: t('nav.dashboard'), 
        href: '/protected/dashboard',
        roles: ['super_admin', 'admin', 'shelter_admin', 'donor']
      },
      { 
        label: t('nav.profile'), 
        href: '/protected/profile',
        roles: ['super_admin', 'admin', 'shelter_admin', 'donor', 'participant']
      },
      { 
        label: t('nav.settings'), 
        href: '/protected/settings',
        roles: ['super_admin', 'admin', 'shelter_admin', 'donor', 'participant']
      }
    ]
  }
}); 