import { AUTH_ROLES } from '@/auth/types/auth.types';

export const getDashboardPath = (role: AUTH_ROLES): string => {
  switch (role) {
    case AUTH_ROLES.SUPER_ADMIN:
      return '/super-admin/dashboard';
    case AUTH_ROLES.SHELTER_ADMIN:
      return '/shelter-admin/dashboard';
    case AUTH_ROLES.DONOR:
      return '/donor/dashboard';
    case AUTH_ROLES.PARTICIPANT:
      return '/participant/dashboard';
    default:
      console.error('Invalid role provided:', role);
      return '/login';
  }
};

export const getRoleBasedRedirect = (role: AUTH_ROLES | null): string => {
  if (!role) return '/login';
  return getDashboardPath(role);
}; 