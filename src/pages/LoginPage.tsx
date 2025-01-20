import { LoginForm } from '@/components/Auth/LoginForm';
import { useAuthStore } from '@/auth/stores/authStore';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useEffect, memo, useRef, useCallback } from 'react';

const LoginPage = memo(() => {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const redirectAttempted = useRef(false);

  // Memoize the navigation function
  const handleRedirect = useCallback((path: string) => {
    if (!redirectAttempted.current) {
      redirectAttempted.current = true;
      // Use replace to prevent URL history stack buildup
      navigate(path, { 
        replace: true,
        // Add state to prevent unnecessary re-renders
        state: { from: 'login' }
      });
    }
  }, [navigate]);

  // Handle auth redirect once
  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      if (!mounted || !isAuthenticated || !user?.id || redirectAttempted.current) {
        return;
      }

      // For QA shelter admin - immediate redirect
      if (user.email === 'qa.shelter@arcanaconcept.com') {
        handleRedirect('/shelter/8a6b74a8-1f61-4b2b-9146-0524f2cf018c/dashboard');
        return;
      }

      // For other accounts
      try {
        const { data: org } = await supabase
          .from('organizations')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (org?.id && mounted) {
          handleRedirect(`/shelter/${org.id}/dashboard`);
        }
      } catch (error) {
        console.error('Error fetching organization:', error);
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated, user, handleRedirect]);

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  // If authenticated, return null (will be redirected by effect)
  if (isAuthenticated && user) {
    return null;
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