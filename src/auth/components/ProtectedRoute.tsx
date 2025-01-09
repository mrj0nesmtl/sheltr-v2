import { useAuth } from '@/hooks/useAuth';
import { AUTH_ROLES } from '@/types/auth.types';
import { Navigate, useLocation } from 'react-router-dom';
import { getRoleBasedRedirect } from '@/lib/navigation/roleNavigation';

const DEBUG = true;

interface ProtectedRouteProps {
  allowedRoles?: AUTH_ROLES[];
  children: React.ReactNode;
}

export function ProtectedRoute({ allowedRoles = [], children }: ProtectedRouteProps) {
  const location = useLocation();
  const { user, isLoading } = useAuth();

  // Enhanced debug logging
  if (DEBUG) {
    console.log('ProtectedRoute:', {
      path: location.pathname,
      user,
      isLoading,
      allowedRoles,
      currentRole: user?.role
    });
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <h2 className="text-xl text-white">Verifying access...</h2>
        </div>
      </div>
    );
  }

  // Auth check
  if (!user?.role) {
    if (DEBUG) console.log('No user role, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role as AUTH_ROLES)) {
    if (DEBUG) {
      console.log('Invalid role access attempt:', {
        userRole: user.role,
        allowedRoles,
        redirectingTo: getRoleBasedRedirect(user.role as AUTH_ROLES)
      });
    }
    const correctPath = getRoleBasedRedirect(user.role as AUTH_ROLES);
    return <Navigate to={correctPath} replace />;
  }

  return <>{children}</>;
}