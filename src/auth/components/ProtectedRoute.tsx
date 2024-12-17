import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/auth/stores/authStore';
import { UserRole } from '@/types/auth.types';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
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

  if (allowedRoles.length > 0 && !allowedRoles.includes(role as UserRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}