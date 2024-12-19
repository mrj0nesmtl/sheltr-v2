import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/auth/stores/authStore';
import { AUTH_ROLES } from '@/types/auth';

// Define allowed roles type directly from AUTH_ROLES
type AllowedRole = (typeof AUTH_ROLES)[keyof typeof AUTH_ROLES];

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: AllowedRole[];
}

export const RoleGuard: FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const { user } = useAuthStore();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}; 