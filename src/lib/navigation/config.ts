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
  Trophy
} from 'lucide-react';
import { UserRole } from '@/types/auth.types';

export interface NavigationItem {
  path: string;
  label: string;
  icon?: any;
  description?: string;
  children?: NavigationItem[];
  requiresAuth?: boolean;
  roles?: UserRole[];
}

// Public navigation
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

// Role-based navigation
export const userNavigation = {
  [UserRole.SUPER_ADMIN]: [
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
  [UserRole.SHELTER_ADMIN]: [
    {
      path: '/shelter/dashboard',
      label: 'Dashboard',
      icon: Home
    },
    {
      path: '/shelter/participants',
      label: 'Participants',
      icon: Users
    },
    {
      path: '/shelter/settings',
      label: 'Settings',
      icon: Settings
    }
  ],
  [UserRole.DONOR]: [
    {
      path: '/donor/dashboard',
      label: 'Dashboard',
      icon: Home
    },
    {
      path: '/donor/donations',
      label: 'My Donations',
      icon: Heart
    },
    {
      path: '/donor/impact',
      label: 'Impact',
      icon: Trophy
    }
  ],
  [UserRole.PARTICIPANT]: [
    {
      path: '/participant/dashboard',
      label: 'Dashboard',
      icon: Home
    },
    {
      path: '/participant/profile',
      label: 'Profile',
      icon: User
    },
    {
      path: '/participant/services',
      label: 'Services',
      icon: Calendar
    }
  ]
};

// Helper functions
export function getNavigationByRole(role: UserRole) {
  return userNavigation[role] || [];
}

export function isPathAccessibleByRole(path: string, role: UserRole): boolean {
  const roleNavigation = getNavigationByRole(role);
  return roleNavigation.some(item => 
    item.path === path || 
    item.children?.some(child => child.path === path)
  );
} 