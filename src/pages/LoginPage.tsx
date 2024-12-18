import { LoginForm } from '@/components/Auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { getDashboardPath } from '@/lib/navigation/roleNavigation';
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
  const { isAuthenticated, user } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated && user?.role) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return (
    <div className="container mx-auto px-4 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-white text-center">
          Sign In to SHELTR
        </h1>
        
        <LoginForm />

        <div className="text-center text-gray-400">
          Don't have an account?{' '}
          <a href="/signup" className="text-indigo-400 hover:text-indigo-300">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
} 