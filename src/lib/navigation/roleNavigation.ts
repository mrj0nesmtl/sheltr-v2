import type { UserRole } from '@/lib/i18n/types';

interface RoleRouteConfig {
  defaultRoute: string;
  allowedRoutes: string[];
}

export const ROLE_ROUTES: Record<string, RoleRouteConfig> = {
  super_admin: {
    defaultRoute: '/super-admin/dashboard',
    allowedRoutes: [
      '/super-admin/dashboard',
      '/admin/*',
      '/shelter/*',
      '/donor/*',
      '/participant/*'
    ]
  },
  admin: {
    defaultRoute: '/admin/dashboard',
    allowedRoutes: [
      '/admin/dashboard',
      '/admin/participants',
      '/admin/analytics'
    ]
  },
  shelter_admin: {
    defaultRoute: '/admin/dashboard',
    allowedRoutes: [
      '/admin/dashboard',
      '/admin/participants',
      '/admin/analytics'
    ]
  },
  donor: {
    defaultRoute: '/donor/dashboard',
    allowedRoutes: [
      '/donor/dashboard',
      '/donor/donations',
      '/donor/impact'
    ]
  },
  participant: {
    defaultRoute: '/participant/dashboard',
    allowedRoutes: [
      '/participant/dashboard',
      '/participant/services',
      '/participant/qr-code'
    ]
  }
};

export const getDashboardPath = (role: UserRole): string => {
  switch (role) {
    case 'super_admin':
      return '/super-admin/dashboard';
    case 'admin':
      return '/admin/dashboard';
    case 'donor':
      return '/donor/dashboard';
    case 'participant':
      return '/participant/dashboard';
    default:
      return '/login';
  }
};

export const isRouteAllowed = (role: UserRole, route: string): boolean => {
  const effectiveRole = role === 'admin' ? 'shelter_admin' : role;
  const config = ROLE_ROUTES[effectiveRole];
  if (!config) return false;
  
  return config.allowedRoutes.some(allowedRoute => {
    if (allowedRoute.endsWith('/*')) {
      const basePath = allowedRoute.slice(0, -2);
      return route.startsWith(basePath);
    }
    return route === allowedRoute;
  });
}; 