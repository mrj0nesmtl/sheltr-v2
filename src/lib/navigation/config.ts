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
    User,
    LayoutGrid,
    BarChart,
    Home
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
export const mainNavigation = [
  {
    label: 'nav.howItWorks',
    path: '/how-it-works',
    icon: HelpCircle
  },
  {
    label: 'nav.solutions',
    path: '/solutions',
    icon: Home
  },
  {
    label: 'nav.scanDonate',
    path: '/scan-donate',
    icon: QrCode
  },
  {
    label: 'nav.impact',
    path: '/impact',
    icon: BarChart3
  },
  {
    label: 'nav.about',
    path: '/about',
    icon: Info
  }
] as const;

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