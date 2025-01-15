import { useAuth } from '@/hooks/useAuth';
import { AUTH_ROLES } from '@/types/auth.types';
import { Navigate, useLocation } from 'react-router-dom';
import { getRoleBasedRedirect, isPathAllowedForRole } from '@/lib/navigation/roleNavigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  allowedRoles?: AUTH_ROLES[];
  children: React.ReactNode;
}

export function ProtectedRoute({ allowedRoles = [], children }: ProtectedRouteProps) {
  const location = useLocation();
  const { user, isLoading, organization } = useAuth();

  useEffect(() => {
    if (user?.role && !isPathAllowedForRole(location.pathname, user.role as AUTH_ROLES)) {
      console.warn('User attempting to access unauthorized path:', {
        role: user.role,
        path: location.pathname
      });
    }
  }, [user?.role, location.pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user?.role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role as AUTH_ROLES)) {
    const correctPath = getRoleBasedRedirect(
      user.role as AUTH_ROLES,
      user.id,
      organization?.id
    );
    return <Navigate to={correctPath} replace />;
  }

  return <>{children}</>;
}