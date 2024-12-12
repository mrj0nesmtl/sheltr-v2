import type { UserRole } from '@/lib/i18n/types';

interface RoleRouteConfig {
  defaultRoute: string;
  allowedRoutes: string[];
}

export const ROLE_ROUTES: Record<UserRole, RoleRouteConfig> = {
  super_admin: {
    defaultRoute: '/super-admin/dashboard',
    allowedRoutes: [
      '/super-admin/*',
      '/shelter-admin/*',
      '/donor/*',
      '/participant/*'
    ]
  },
  admin: {
    defaultRoute: '/shelter-admin/dashboard',
    allowedRoutes: [
      '/shelter-admin/dashboard',
      '/shelter-admin/participants',
      '/shelter-admin/analytics',
      '/shelter-admin/map',
      '/shelter-admin/reports'
    ]
  },
  shelter_admin: {
    defaultRoute: '/shelter-admin/dashboard',
    allowedRoutes: [
      '/shelter-admin/dashboard',
      '/shelter-admin/participants',
      '/shelter-admin/analytics',
      '/shelter-admin/map',
      '/shelter-admin/reports'
    ]
  },
  donor: {
    defaultRoute: '/donor/dashboard',
    allowedRoutes: [
      '/donor/dashboard',
      '/donor/donations',
      '/donor/leaderboard',
      '/donor/achievements'
    ]
  },
  participant: {
    defaultRoute: '/participant/dashboard',
    allowedRoutes: [
      '/participant/dashboard',
      '/participant/profile',
      '/participant/services',
      '/participant/history'
    ]
  }
};

export const getDashboardPath = (role: UserRole): string => {
  const config = ROLE_ROUTES[role];
  return config ? config.defaultRoute : '/login';
};

export const isRouteAllowed = (role: UserRole, route: string): boolean => {
  const config = ROLE_ROUTES[role];
  if (!config) return false;
  
  return config.allowedRoutes.some(allowedRoute => {
    if (allowedRoute.endsWith('/*')) {
      const basePath = allowedRoute.slice(0, -2);
      return route.startsWith(basePath);
    }
    return route === allowedRoute;
  });
}; 