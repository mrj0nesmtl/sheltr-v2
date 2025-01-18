import { supabase, forceLogout } from '@/lib/supabase/client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { AUTH_ROLES } from '@/auth/types/auth.types';
import { useNavigate } from 'react-router-dom';
import { getDashboardPath } from '@/lib/navigation/roleNavigation';

export const useAuth = () => {
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  
  const [state, setState] = useState({
    isLoading: true,
    user: null,
    error: null
  });

  const getUserRole = useCallback(async (userId: string) => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role, id, organization_id')
        .eq('id', userId)
        .maybeSingle();

      if (!profileData && !profileError) {
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{
            id: userId,
            role: AUTH_ROLES.SHELTER_ADMIN,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }])
          .select()
          .single();

        if (createError) throw createError;
        return {
          role: newProfile.role,
          organizationId: newProfile.organization_id,
          isNewProfile: true
        };
      }

      return {
        role: profileData?.role || AUTH_ROLES.SHELTER_ADMIN,
        organizationId: profileData?.organization_id
      };
    } catch (e) {
      console.error('❌ Role resolution error:', e);
      return { 
        role: AUTH_ROLES.SHELTER_ADMIN,
        organizationId: null,
        error: e instanceof Error ? e.message : 'Unknown error'
      };
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    navigateRef.current = navigate;

    const handleSession = async (session) => {
      if (!session?.user || !mounted) {
        setState(s => ({ ...s, user: null, isLoading: false }));
        return;
      }

      try {
        const { role, organizationId } = await getUserRole(session.user.id);
        if (!mounted) return;

        const userWithRole = {
          ...session.user,
          role,
          organizationId
        };
        
        setState(s => ({ ...s, user: userWithRole, isLoading: false }));
        
        if (role) {
          const dashboardPath = getDashboardPath(role, session.user.id);
          navigateRef.current(dashboardPath, { replace: true });
        }
      } catch (e) {
        if (mounted) {
          setState(s => ({ ...s, error: e, isLoading: false }));
          await forceLogout();
        }
      }
    };

    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      await handleSession(session);
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        if (event === 'SIGNED_OUT') {
          setState(s => ({ ...s, user: null }));
          navigateRef.current('/', { replace: true });
          return;
        }

        if (session?.user && event === 'SIGNED_IN') {
          await handleSession(session);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [getUserRole]);

  const signOut = useCallback(async () => {
    await forceLogout();
    setState(s => ({ ...s, user: null }));
    navigateRef.current('/', { replace: true });
  }, []);

  return {
    user: state.user,
    role: state.user?.role || null,
    isLoading: state.isLoading,
    error: state.error,
    isAuthenticated: !!state.user,
    signOut
  };
}; 