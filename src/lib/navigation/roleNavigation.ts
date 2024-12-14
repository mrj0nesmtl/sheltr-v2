import { UserRole } from '@/lib/types/auth';
import type { NavigationItem } from './config';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Map,
  FileText,
  Trophy,
  UserCircle,
  HeartHandshake
} from 'lucide-react';

export const ROLE_NAVIGATION: Record<UserRole, NavigationItem[]> = {
  [UserRole.SUPER_ADMIN]: [
    {
      path: '/super-admin/dashboard',
      label: 'nav.dashboard',
      icon: LayoutDashboard
    },
    {
      path: '/super-admin/analytics',
      label: 'nav.analytics',
      icon: BarChart3,
      children: [
        {
          path: '/super-admin/analytics/global',
          label: 'nav.globalAnalytics'
        },
        {
          path: '/super-admin/analytics/shelters',
          label: 'nav.shelterAnalytics'
        }
      ]
    }
    // ... other super admin items
  ],
  
  [UserRole.SHELTER_ADMIN]: [
    {
      path: '/shelter-admin/dashboard',
      label: 'nav.dashboard',
      icon: LayoutDashboard
    },
    {
      path: '/shelter-admin/participants',
      label: 'nav.participants',
      icon: Users
    }
    // ... other shelter admin items
  ],

  [UserRole.DONOR]: [
    {
      path: '/donor/dashboard',
      label: 'nav.dashboard',
      icon: LayoutDashboard
    },
    {
      path: '/donor/donations',
      label: 'nav.donations',
      icon: HeartHandshake
    },
    {
      path: '/donor/leaderboard',
      label: 'nav.leaderboard',
      icon: Trophy
    }
  ],

  [UserRole.PARTICIPANT]: [
    {
      path: '/participant/dashboard',
      label: 'nav.dashboard',
      icon: LayoutDashboard
    },
    {
      path: '/participant/profile',
      label: 'nav.profile',
      icon: UserCircle
    }
    // ... other participant items
  ],

  [UserRole.STAFF]: [
    {
      path: '/staff/dashboard',
      label: 'nav.dashboard',
      icon: LayoutDashboard
    }
  ]
};

// Keep existing helper functions but update to use new structure
export const getDashboardPath = (role: UserRole): string => {
  const roleNav = ROLE_NAVIGATION[role];
  return roleNav?.[0]?.path || '/login';
};

export const isRouteAllowed = (role: UserRole, route: string): boolean => {
  const roleNav = ROLE_NAVIGATION[role];
  if (!roleNav) return false;

  const getAllowedPaths = (items: NavigationItem[]): string[] => {
    return items.flatMap(item => {
      const paths = [item.path];
      if (item.children) {
        paths.push(...getAllowedPaths(item.children));
      }
      return paths;
    });
  };

  const allowedPaths = getAllowedPaths(roleNav);
  return allowedPaths.some(path => {
    if (path.endsWith('/*')) {
      return route.startsWith(path.slice(0, -2));
    }
    return route === path;
  });
}; 