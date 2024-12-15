import { UserRole } from '../types/database';

export const getDashboardPath = (role: UserRole): string => {
  const dashboardRoutes: Record<UserRole, string> = {
    super_admin: '/super-admin/dashboard',
    shelter_admin: '/shelter-admin/dashboard',
    donor: '/donor/dashboard',
    participant: '/participant/dashboard',
    staff: '/staff/dashboard'
  };

  return dashboardRoutes[role] || '/';
};

export const getRoleBasedRedirect = (role: UserRole | null): string => {
  if (!role) return '/login';
  return getDashboardPath(role);
}; 