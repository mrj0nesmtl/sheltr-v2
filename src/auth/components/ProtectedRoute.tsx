import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { UserRole } from '@/auth/types/auth.types';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const location = useLocation();
  const { user, role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role as UserRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}