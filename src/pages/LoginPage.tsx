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

  // Memoize the role-based redirect logic
  const getRoleBasedPath = useCallback((role: string, userId: string, orgId?: string) => {
    switch (role) {
      case AUTH_ROLES.SUPER_ADMIN:
        return '/dashboard/super-admin';
      case AUTH_ROLES.SHELTER_ADMIN:
        return `/dashboard/shelter/${orgId}/dashboard`;
      case AUTH_ROLES.DONOR:
        return `/dashboard/donor/${userId}`;
      case AUTH_ROLES.PARTICIPANT:
        return `/dashboard/participant/${userId}`;
      default:
        return '/';
    }
  }, []);

  // Add debug logging
  useEffect(() => {
    console.debug('LoginPage State:', {
      isAuthenticated,
      userRole: user?.role,
      isLoading,
      redirectAttempted: redirectAttempted.current
    });
  }, [isAuthenticated, user, isLoading]);

  // Break the loop if we're already authenticated and on login page
  useEffect(() => {
    if (isAuthenticated && user && location.pathname === '/login' && !redirectInProgress) {
      console.debug('Breaking redirect loop - already authenticated on login page');
      const path = user.role === AUTH_ROLES.SUPER_ADMIN 
        ? '/dashboard/super-admin'
        : '/';
      setRedirectInProgress(true);
      navigate(path, { replace: true });
    }
  }, [isAuthenticated, user, location.pathname]);

  // Handle auth redirect once
  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    const handleAuthRedirect = async () => {
      // Guard against multiple redirects
      if (!mounted || redirectInProgress || !isAuthenticated || !user?.id || redirectAttempted.current) {
        console.debug('Skipping redirect:', {
          mounted,
          redirectInProgress,
          isAuthenticated,
          hasUser: !!user,
          redirectAttempted: redirectAttempted.current
        });
        return;
      }

      try {
        setRedirectInProgress(true);
        
        // For super admin, redirect immediately
        if (user.role === AUTH_ROLES.SUPER_ADMIN) {
          console.debug('Redirecting super admin to dashboard');
          redirectAttempted.current = true;
          navigate('/dashboard/super-admin', { replace: true });
          
          // Reset redirect state after a delay
          timeoutId = setTimeout(() => {
            if (mounted) {
              setRedirectInProgress(false);
              redirectAttempted.current = false;
            }
          }, 1000);
          
          return;
        }

        // For shelter admin, fetch org ID first
        if (user.role === AUTH_ROLES.SHELTER_ADMIN) {
          const { data: org } = await supabase
            .from('organizations')
            .select('id')
            .eq('user_id', user.id)
            .single();

          if (org?.id && mounted) {
            navigate(`/dashboard/shelter/${org.id}/dashboard`, { replace: true });
          }
        } else {
          // Other roles use userId in path
          const path = getRoleBasedPath(user.role, user.id);
          navigate(path, { replace: true });
        }

        redirectAttempted.current = true;
      } catch (error) {
        console.error('Error during auth redirect:', error);
        setRedirectInProgress(false);
        redirectAttempted.current = false;
      }
    };

    handleAuthRedirect();

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isAuthenticated, user, navigate, getRoleBasedPath]);

  // Prevent render if redirect is in progress
  if (redirectInProgress) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-lg">Redirecting to dashboard...</div>
      </div>
    );
  }

  // Already authenticated - show loading
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-lg">Loading dashboard...</div>
      </div>
    );
  }

  // Add debug for render conditions
  console.debug('Render conditions:', {
    isLoading,
    isAuthenticated,
    hasUser: !!user
  });

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