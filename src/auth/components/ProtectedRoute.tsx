import { useAuth } from '@/hooks/useAuth';
import { AUTH_ROLES } from '@/types/auth.types';
import { Navigate, useLocation } from 'react-router-dom';
import { getRoleBasedRedirect } from '@/lib/navigation/roleNavigation';

interface ProtectedRouteProps {
  allowedRoles?: AUTH_ROLES[];
  children: React.ReactNode;
}

export function ProtectedRoute({ allowedRoles = [], children }: ProtectedRouteProps) {
  const location = useLocation();
  const { user, isLoading } = useAuth();

  // Simplified loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <h2 className="text-xl text-white">Verifying access...</h2>
      </div>
    );
  }

  // Single check for auth state
  if (!user?.role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based access check
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role as AUTH_ROLES)) {
    const correctPath = getRoleBasedRedirect(user.role as AUTH_ROLES);
    return <Navigate to={correctPath} replace />;
  }

  return <>{children}</>;
}