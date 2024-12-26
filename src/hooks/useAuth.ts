import { supabase, forceLogout } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { AUTH_ROLES } from '@/auth/types/auth.types';
import { useNavigate } from 'react-router-dom';
import { getDashboardPath } from '@/lib/navigation/roleNavigation';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        if (!session?.user) {
          await forceLogout();
          return;
        }

        const userData = {
          ...session.user,
          role: session.user.email === 'joel@arcanaconcept.com' 
            ? AUTH_ROLES.SUPER_ADMIN 
            : AUTH_ROLES.DONOR
        };
        
        setUser(userData);
        
        // Redirect to appropriate dashboard if on login page
        const currentPath = window.location.pathname;
        if (currentPath === '/login') {
          const dashboardPath = getDashboardPath(userData.role);
          navigate(dashboardPath, { replace: true });
        }
      } catch (e) {
        console.error('Session error:', e);
        setError(e);
        await forceLogout();
      } finally {
        setIsLoading(false);
      }
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!session?.user) {
          await forceLogout();
          setUser(null);
          return;
        }

        const userData = {
          ...session.user,
          role: session.user.email === 'joel@arcanaconcept.com' 
            ? AUTH_ROLES.SUPER_ADMIN 
            : AUTH_ROLES.DONOR
        };
        
        setUser(userData);
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]); // Add navigate to dependencies

  return {
    user,
    role: user?.role || null,
    isLoading,
    error,
    isAuthenticated: !!user,
    signOut: async () => {
      await forceLogout();
      setUser(null);
      navigate('/', { replace: true });
    }
  };
}; 