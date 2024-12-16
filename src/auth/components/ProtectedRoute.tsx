import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { UserRole } from '@/auth/types/auth.types';
import { toast } from "@/components/ui/Toast";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const location = useLocation();
  const { user, role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    toast({
      variant: "destructive",
      title: "Authentication Required",
      description: "Please log in to access this page"
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role as UserRole)) {
    toast({
      variant: "destructive",
      title: "Access Denied",
      description: "You don't have permission to access this page"
    });
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}