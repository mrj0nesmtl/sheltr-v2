import { 
  Home,
  Info,
  QrCode,
  BarChart3,
  Users,
  Settings,
  HelpCircle
} from 'lucide-react';

export interface NavigationItem {
  path: string;
  label: string;
  icon?: any;
  description?: string;
  children?: NavigationItem[];
  requiresAuth?: boolean;
  roles?: string[];
}

export const navigationConfig: NavigationItem[] = [
  {
    path: '/how-it-works',
    label: 'How It Works',
    icon: Info
  },
  {
    path: '/solutions',
    label: 'Solutions',
    icon: HelpCircle,
    children: [
      {
        path: '/solutions/nonprofits',
        label: 'For Nonprofits',
        description: 'Solutions for charitable organizations'
      },
      {
        path: '/solutions/donors',
        label: 'For Donors',
        description: 'Easy ways to make an impact'
      }
    ]
  },
  {
    path: '/scan-donate',
    label: 'Scan & Donate',
    icon: QrCode,
    requiresAuth: true
  },
  {
    path: '/impact',
    label: 'Impact',
    icon: BarChart3
  }
];

export const ROLE_NAVIGATION = {
  admin: [
    {
      path: '/admin/users',
      label: 'User Management',
      icon: Users
    },
    {
      path: '/admin/settings',
      label: 'Settings',
      icon: Settings
    }
  ],
  user: [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: Home
    },
    {
      path: '/settings',
      label: 'Settings',
      icon: Settings
    }
  ]
}; 