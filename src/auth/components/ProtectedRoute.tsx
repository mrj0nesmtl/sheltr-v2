import { useAuth } from '@/hooks/useAuth';
import { AUTH_ROLES } from '@/types/auth.types';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  allowedRoles?: AUTH_ROLES[];
  children: React.ReactNode;
}

export function ProtectedRoute({ allowedRoles = [], children }: ProtectedRouteProps) {
  const location = useLocation();
  const { user, isLoading } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log('ProtectedRoute: Auth State', {
      user,
      isLoading,
      allowedRoles,
      currentPath: location.pathname
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

  // Check role access
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role as AUTH_ROLES)) {
    console.log('ProtectedRoute: Invalid role, redirecting to home');
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}