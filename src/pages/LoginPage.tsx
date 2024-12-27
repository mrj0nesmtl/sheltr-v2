import { LoginForm } from '@/components/Auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { getDashboardPath } from '@/lib/navigation/roleNavigation';
import { Navigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Debug auth state once
  console.log('LoginPage render - auth state:', { 
    isAuthenticated, 
    userRole: user?.role,
    isLoading 
  });

  // Only redirect if we're actually authenticated and have a user role
  if (isAuthenticated && user?.role) {
    const dashboardPath = getDashboardPath(user.role);
    console.log('Redirecting to dashboard:', dashboardPath);
    return <Navigate to={dashboardPath} replace />;
  }

  // Show login form regardless of loading state
  return (
    <div className="container mx-auto px-4 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-white text-center">
          Sign In to SHELTR
        </h1>
        
        <LoginForm />

        <div className="text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-400 hover:text-indigo-300">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
} 