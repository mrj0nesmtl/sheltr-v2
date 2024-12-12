import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { UserRole } from '../../lib/types/database';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const location = useLocation();
  const { user, isLoading, isAuthenticated } = useAuthStore();

  // Show loading state while auth is initializing
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Validate roles
  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    const dashboardRoutes: Record<UserRole, string> = {
      [UserRole.SUPER_ADMIN]: '/super-admin/dashboard',
      [UserRole.SHELTER_ADMIN]: '/shelter-admin/dashboard',
      [UserRole.DONOR]: '/donor/dashboard',
      [UserRole.PARTICIPANT]: '/participant/dashboard',
      [UserRole.STAFF]: '/staff/dashboard'
    };

    const redirectPath = dashboardRoutes[user.role] || '/login';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}