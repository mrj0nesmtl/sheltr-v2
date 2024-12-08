import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, getDashboardPath } from '@/stores/authStore';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { UserRole } from '@/lib/types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading, initialized } = useAuthStore();
  const location = useLocation();

  if (!initialized || isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return <>{children}</>;
}