import { useAuthStore } from '@/auth/stores/authStore';
import { AUTH_ROLES } from '@/types/auth.types';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles?: AUTH_ROLES[];
  children: React.ReactNode;
}

export function ProtectedRoute({ allowedRoles = [], children }: ProtectedRouteProps) {
  const location = useLocation();
  const { user, role } = useAuthStore();

  console.log('ProtectedRoute Check:', {
    user,
    role,
    allowedRoles,
    currentPath: location.pathname
  });

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role as AUTH_ROLES)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}