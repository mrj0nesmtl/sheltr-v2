import type { AUTH_ROLES } from '@/types/auth';
import {
    BarChart3,
    Building2,
    Heart,
    HelpCircle,
    Info,
    QrCode,
    Shield,
    Trophy,
    User
} from 'lucide-react';

export interface NavigationItem {
  path: string;
  label: string;
  icon?: any;
  requiresAuth?: boolean;
  roles?: AUTH_ROLES[];
  children?: NavigationItem[];
}

// Public navigation
export const mainNavigation: NavigationItem[] = [
  {
    path: '/how-it-works',
    label: 'nav.howItWorks',
    icon: HelpCircle,
    requiresAuth: false
  },
  {
    path: '/solutions',
    label: 'nav.solutions',
    icon: Info,
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

// Update footerNavigation to include About
export const footerNavigation = {
  company: [
    {
      label: 'footer.about',
      path: '/about'
    },
    {
      label: 'footer.blog',
      path: '/blog'
    }
  ],
  solutions: [
    {
      label: 'footer.howItWorks',
      path: '/how-it-works'
    },
    {
      label: 'footer.solutions',
      path: '/solutions'
    },
    {
      label: 'footer.scanDonate',
      path: '/scan-donate'
    }
  ],
  blockchain: [
    {
      label: 'footer.whitepaper',
      path: '/whitepaper'
    },
    {
      label: 'footer.transactions',
      path: '/transactions'
    }
  ]
}; 