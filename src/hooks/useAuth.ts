import { useAuthStore } from '@/auth/stores/authStore';
import { UserRole } from '@/lib/types/auth';
import { getDashboardPath } from '@/lib/navigation/roleNavigation';

export function useAuth() {
  const {
    user,
    loading: isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    clearError
  } = useAuthStore();

  const hasRole = (roles: UserRole | UserRole[]) => {
    if (!user?.role) return false;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    return allowedRoles.includes(user.role as UserRole);
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    clearError,
    hasRole,
    isSuperAdmin: () => hasRole(UserRole.SUPER_ADMIN),
    isShelterAdmin: () => hasRole(UserRole.SHELTER_ADMIN),
    isDonor: () => hasRole(UserRole.DONOR),
    isParticipant: () => hasRole(UserRole.PARTICIPANT),
    isStaff: () => hasRole(UserRole.STAFF)
  };
} 