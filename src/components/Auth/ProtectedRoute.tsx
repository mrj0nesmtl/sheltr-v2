import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, getDashboardPath } from '../../stores/authStore';
import type { UserProfile } from '../../lib/types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode | ((props: { user: UserProfile }) => React.ReactNode);
  allowedRoles?: string[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  // Handle function children
  if (typeof children === 'function') {
    return <>{children({ user })}</>;
  }

  // Handle regular children
  return <>{children}</>;
}