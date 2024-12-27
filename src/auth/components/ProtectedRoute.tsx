import { useAuth } from '@/hooks/useAuth';
import { AUTH_ROLES } from '@/types/auth.types';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRoleBasedRedirect } from '@/lib/navigation/roleNavigation';

interface ProtectedRouteProps {
  allowedRoles?: AUTH_ROLES[];
  children: React.ReactNode;
}

export function ProtectedRoute({ allowedRoles = [], children }: ProtectedRouteProps) {
  const location = useLocation();
  const { user, isLoading } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log('ProtectedRoute - Current State:', {
      user,
      userRole: user?.role,
      allowedRoles,
      currentPath: location.pathname,
      isLoading,
      isInitialized
    });

    if (!isLoading && user?.email) {
      setIsInitialized(true);
    }
  }, [user, isLoading, location.pathname]);

  // Show loading state while auth is initializing
  if (isLoading || !isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <h2 className="text-xl text-white">Verifying access...</h2>
      </div>
    );
  }

  // Redirect to login if no user
  if (!user) {
    console.log('ProtectedRoute: No user, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Add detailed role checking logs
  console.log('ProtectedRoute - Role Check:', {
    userRole: user.role,
    allowedRoles,
    hasAccess: allowedRoles.includes(user.role as AUTH_ROLES)
  });

  // Check role access and redirect to appropriate dashboard
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role as AUTH_ROLES)) {
    console.log('ProtectedRoute: Invalid role, redirecting to correct dashboard');
    const correctPath = getRoleBasedRedirect(user.role as AUTH_ROLES);
    console.log('Redirecting to:', correctPath);
    return <Navigate to={correctPath} replace />;
  }

  return <>{children}</>;
}