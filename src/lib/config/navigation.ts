import { UserRole } from '@/auth/types/auth.types';

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  roles?: UserRole[];
}

export const getMainNavItems = (t: (key: string) => string) => [
  { label: t('nav.howItWorks'), href: '/how-it-works' },
  { label: t('nav.solutions'), href: '/solutions' },
  { label: t('nav.scanDonate'), href: '/scan-donate' },
  { label: t('nav.impact'), href: '/impact' }
];

export const getUserNavItems = (t: (key: string) => string) => [
  { 
    label: t('nav.dashboard'), 
    href: '/dashboard',
    icon: 'layout-dashboard',
    roles: ['super_admin', 'admin', 'shelter_admin', 'donor']
  },
  { 
    label: t('nav.profile'), 
    href: '/profile',
    icon: 'user',
    roles: ['super_admin', 'admin', 'shelter_admin', 'donor', 'participant']
  },
  { 
    label: t('nav.settings'), 
    href: '/settings',
    icon: 'settings',
    roles: ['super_admin', 'admin', 'shelter_admin', 'donor', 'participant']
  }
]; 