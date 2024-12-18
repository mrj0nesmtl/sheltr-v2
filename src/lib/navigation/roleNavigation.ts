import { AUTH_ROLES } from '../types/database';

export const getDashboardPath = (role: AUTH_ROLES): string => {
  const dashboardRoutes: Record<AUTH_ROLES, string> = {
    super_admin: '/super-admin/dashboard',
    shelter_admin: '/shelter-admin/dashboard',
    donor: '/donor/dashboard',
    participant: '/participant/dashboard',
    staff: '/staff/dashboard'
  };

  return dashboardRoutes[role] || '/';
};

export const getRoleBasedRedirect = (role: AUTH_ROLES | null): string => {
  if (!role) return '/login';
  return getDashboardPath(role);
}; 