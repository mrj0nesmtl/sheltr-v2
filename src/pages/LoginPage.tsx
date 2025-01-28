import { LoginForm } from '@/components/Auth/LoginForm';
import { useAuthStore } from '@/auth/stores/authStore';
import { Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useEffect, memo, useRef, useCallback, useState } from 'react';
import { AUTH_ROLES } from '@/auth/types/auth.types';

const LoginPage = memo(() => {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectAttempted = useRef(false);
  const [redirectInProgress, setRedirectInProgress] = useState(false);

  // Simplify the initial auth check
  useEffect(() => {
    console.debug('Auth State:', {
      isAuthenticated,
      userRole: user?.role,
      isLoading,
      pathname: location.pathname
    });

    const handleInitialAuth = async () => {
      // Skip if already processing or no auth
      if (redirectInProgress || !isAuthenticated || !user || redirectAttempted.current) {
        return;
      }

      try {
        setRedirectInProgress(true);
        
        switch (user.role) {
          case AUTH_ROLES.SUPER_ADMIN:
            navigate('/dashboard/super-admin', { replace: true });
            break;
            
          case AUTH_ROLES.SHELTER_ADMIN:
            const { data: orgs } = await supabase
              .from('organization_staff')
              .select('organization_id')
              .eq('user_id', user.id)
              .eq('role', 'shelter_admin')
              .eq('status', 'active');

            if (!orgs?.length) {
              console.debug('No active organizations found');
              navigate('/dashboard/shelter');
              break;
            }

            if (orgs.length === 1) {
              navigate(`/shelter/${orgs[0].organization_id}/dashboard`, { replace: true });
            } else {
              navigate('/dashboard/shelter');
            }
            break;

          default:
            navigate(`/dashboard/${user.role.toLowerCase()}/${user.id}`, { replace: true });
        }

        redirectAttempted.current = true;

      } catch (error) {
        console.error('Redirect error:', error);
        setRedirectInProgress(false);
      }
    };

    handleInitialAuth();
  }, [isAuthenticated, user, isLoading]);

  // Show loading state during redirect
  if (redirectInProgress) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-lg">Redirecting...</div>
      </div>
    );
  }

  // Already authenticated - wait for redirect
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-lg">Loading dashboard...</div>
      </div>
    );
  }

  // Login form
  return (
    <div className="container mx-auto px-4 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-900">
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
});

LoginPage.displayName = 'LoginPage';

export default LoginPage; 