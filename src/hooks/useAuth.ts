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
        // 1. First check profiles (master table) - if no profile exists, create one
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role, id')
          .eq('id', userId)
          .maybeSingle();

        if (!profileData && !profileError) {
          console.log('📝 Creating new profile for user:', userId);
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([
              {
                id: userId,
                role: AUTH_ROLES.SHELTER_ADMIN, // Default to shelter admin during registration
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }
            ])
            .select()
            .single();

          if (createError) {
            console.error('❌ Profile creation error:', createError);
            throw createError;
          }

          console.log('✅ New profile created:', newProfile);
          return {
            role: newProfile.role,
            isNewProfile: true
          };
        }

        // 2. Validate and return role
        const userRole = profileData?.role || AUTH_ROLES.SHELTER_ADMIN;
        
        // Ensure role is a valid enum value
        if (!Object.values(AUTH_ROLES).includes(userRole)) {
          console.error('❌ Invalid role found:', userRole);
          return {
            role: AUTH_ROLES.SHELTER_ADMIN,
            error: 'Invalid role'
          };
        }

        console.log('✅ Role resolved:', userRole);
        return {
          role: userRole,
          organizationId: profileData?.organization_id
        };

      } catch (e) {
        console.error('❌ Role resolution error:', e);
        return { 
          role: AUTH_ROLES.SHELTER_ADMIN,
          error: e instanceof Error ? e.message : 'Unknown error'
        };
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
          const userWithRole = {
            ...session.user,
            role: userRole.role,
            organizationId: userRole.organizationId
          };
          
          console.log('🔑 Setting user with role:', userWithRole);
          setUser(userWithRole);
          setIsLoading(false);
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

          // Add proper navigation with both role and userId
          const dashboardPath = getDashboardPath(userRole, session.user.id);
          console.log('🚀 Navigating to:', dashboardPath);
          navigate(dashboardPath, { replace: true });
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