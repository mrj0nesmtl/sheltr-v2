import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { UserRole } from '@/lib/types/database';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const location = useLocation();
  const { user, role, isAuthenticated } = useAuthStore();

  console.log('ProtectedRoute Check:', {
    isAuthenticated,
    role,
    allowedRoles,
    pathname: location.pathname,
    user
  });

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role as UserRole)) {
    console.log('Role not allowed:', { role, allowedRoles });
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}