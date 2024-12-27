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
    let mounted = true;

    const getUserRole = async (userId: string) => {
      console.log('🔍 getUserRole - START', { userId });
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .single();
        
        if (error) throw error;
        
        console.log('✅ Profile data:', data);
        return data?.role || AUTH_ROLES.DONOR;
      } catch (e) {
        console.error('❌ Profile error:', e);
        return AUTH_ROLES.DONOR;
      }
    };

    const initSession = async () => {
      if (!mounted) return;

      try {
        console.log('🚀 Initializing session...');
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          console.log('📤 No session found');
          setUser(null);
          setIsLoading(false);
          return;
        }

        console.log('✅ Session found:', session.user.id);
        const userRole = await getUserRole(session.user.id);
        
        if (mounted) {
          setUser({
            ...session.user,
            role: userRole
          });
        }
      } catch (e) {
        console.error('❌ Session error:', e);
        if (mounted) {
          setError(e);
          await forceLogout();
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Initialize session
    initSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event);
        
        if (!session?.user) {
          if (mounted) {
            setUser(null);
            setIsLoading(false);
          }
          return;
        }

        const userRole = await getUserRole(session.user.id);
        if (mounted) {
          setUser({
            ...session.user,
            role: userRole
          });
          setIsLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

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