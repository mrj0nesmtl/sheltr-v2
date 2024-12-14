import { 
  Info,
  HelpCircle,
  BarChart3,
  FileText,
  Building2,
  Settings,
  Home,
  User,
  Users
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
    path: '/about',
    label: 'About',
    icon: FileText,
    description: 'Learn about SHELTR'
  },
  {
    path: '/how-it-works',
    label: 'How It Works',
    icon: Info,
    description: 'Understanding our platform'
  },
  {
    path: '/solutions',
    label: 'Solutions',
    icon: Building2,
    description: 'Our platform solutions'
  },
  {
    path: '/impact',
    label: 'Impact',
    icon: BarChart3,
    description: 'See our impact'
  }
];

export const userNavigation = {
  admin: [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: Home
    },
    {
      path: '/admin/users',
      label: 'Users',
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
      path: '/profile',
      label: 'Profile',
      icon: User
    },
    {
      path: '/settings',
      label: 'Settings',
      icon: Settings
    }
  ]
}; 