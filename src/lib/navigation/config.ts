import { 
  Info,
  HelpCircle,
  BarChart3,
  FileText,
  Building2,
  Settings,
  Home,
  User,
  Users,
  Heart,
  Shield,
  Calendar,
  Trophy,
  QrCode
} from 'lucide-react';
import { UserRole } from '@/types/auth.types';

export interface NavigationItem {
  path: string;
  label: string;
  icon?: string;
  requiresAuth?: boolean;
  roles?: UserRole[];
}

// Public navigation
export const mainNavigation: NavigationItem[] = [
  {
    path: '/about',
    label: 'nav.about',
    icon: 'info',
    requiresAuth: false
  },
  {
    path: '/how-it-works',
    label: 'nav.howItWorks',
    icon: 'help-circle',
    requiresAuth: false
  },
  {
    path: '/solutions',
    label: 'nav.solutions',
    icon: 'lightbulb',
    requiresAuth: false
  },
  {
    path: '/scan-donate',
    label: 'nav.scanDonate',
    icon: 'qr-code',
    requiresAuth: false
  },
  {
    path: '/impact',
    label: 'nav.impact',
    icon: 'chart-bar',
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
    },
    // ... existing super admin routes
  ],
  
  shelter_admin: [
    {
      path: '/shelter',
      label: 'nav.shelterDashboard',
      icon: Building2,
    },
    // ... existing shelter admin routes
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
  ],
  
  participant: [
    {
      path: '/participant',
      label: 'nav.participantDashboard',
      icon: User,
      children: [
        {
          path: '/participant/qr-code',
          label: 'nav.myQRCode',
          icon: QrCode
        },
        {
          path: '/participant/donations',
          label: 'nav.receivedDonations',
          icon: Heart
        },
        {
          path: '/participant/profile',
          label: 'nav.profile',
          icon: User
        }
      ]
    }
  ]
}; 