import { useAuthStore } from '../stores/authStore';
import { UserRole } from '../lib/types/database';

export function useAuth() {
  const {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    clearError
  } = useAuthStore();

  const hasRole = (roles: UserRole | UserRole[]) => {
    if (!user) return false;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    return allowedRoles.includes(user.role);
  };

  const isSuperAdmin = () => hasRole(UserRole.SUPER_ADMIN);
  const isShelterAdmin = () => hasRole(UserRole.SHELTER_ADMIN);
  const isDonor = () => hasRole(UserRole.DONOR);
  const isParticipant = () => hasRole(UserRole.PARTICIPANT);
  const isStaff = () => hasRole(UserRole.STAFF);

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    clearError,
    hasRole,
    isSuperAdmin,
    isShelterAdmin,
    isDonor,
    isParticipant,
    isStaff
  };
} 