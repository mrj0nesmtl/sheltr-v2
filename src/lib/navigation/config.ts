import { 
  Info,
  HelpCircle,
  BarChart3,
  Building2,
  Shield,
  Home,
  User,
  Heart,
  QrCode,
  Trophy
} from 'lucide-react';
import type { UserRole } from '@/types/auth';

export interface NavigationItem {
  path: string;
  label: string;
  icon?: any;
  requiresAuth?: boolean;
  roles?: UserRole[];
  children?: NavigationItem[];
}

// Public navigation
export const mainNavigation: NavigationItem[] = [
  {
    path: '/about',
    label: 'nav.about',
    icon: Info,
    requiresAuth: false
  },
  {
    path: '/how-it-works',
    label: 'nav.howItWorks',
    icon: HelpCircle,
    requiresAuth: false
  },
  {
    path: '/scan-donate',
    label: 'nav.scanDonate',
    icon: QrCode,
    requiresAuth: false
  },
  {
    path: '/impact',
    label: 'nav.impact',
    icon: BarChart3,
    requiresAuth: false
  }
];

// Role-based dashboard navigation
export const dashboardNavigation = {
  super_admin: [
    {
      path: '/admin',
      label: 'nav.dashboard',
      icon: Shield,
    }
  ],
  
  shelter_admin: [
    {
      path: '/shelter',
      label: 'nav.shelterDashboard',
      icon: Building2,
    }
  ],
  
  donor: [
    {
      path: '/donor',
      label: 'nav.donorDashboard',
      icon: Heart,
      children: [
        {
          path: '/donor/donations',
          label: 'nav.myDonations',
          icon: Trophy
        },
        {
          path: '/donor/impact',
          label: 'nav.myImpact',
          icon: BarChart3
        },
        {
          path: '/donor/profile',
          label: 'nav.profile',
          icon: User
        }
      ]
    }
  ]
}; 