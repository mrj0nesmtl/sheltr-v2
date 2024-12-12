import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export function ProtectedRoute({ children, allowedRoles = ['admin'] }: ProtectedRouteProps) {
  const location = useLocation();
  const { user } = useAuthStore();

  console.log('Protected Route:', { user, allowedRoles });

  if (!user) {
    console.log('No user, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles || !Array.isArray(allowedRoles)) {
    console.error('allowedRoles is not properly defined:', allowedRoles);
    return <Navigate to="/login" replace />;
  }

  if (!user.role) {
    console.error('User has no role:', user);
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    console.log('User role not allowed:', user.role);
    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case 'super_admin':
        return <Navigate to="/super-admin/dashboard" replace />;
      case 'shelter_admin':
        return <Navigate to="/shelter-admin/dashboard" replace />;
      case 'donor':
        return <Navigate to="/donor/dashboard" replace />;
      case 'participant':
        return <Navigate to="/participant/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
}