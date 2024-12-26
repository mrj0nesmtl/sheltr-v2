import { LoginForm } from '@/components/Auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { getDashboardPath } from '@/lib/navigation/roleNavigation';
import { Navigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

console.log('LoginPage component mounting');

export default function LoginPage() {
  console.log('LoginPage component mounting');
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    console.log('LoginPage effect - auth state:', { isAuthenticated, user, isLoading });
  }, [isAuthenticated, user, isLoading]);

  // Only redirect if we're actually authenticated and have a user role
  if (isAuthenticated && user?.role) {
    console.log('Redirecting to dashboard:', getDashboardPath(user.role));
    return <Navigate to={getDashboardPath(user.role)} replace />;
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