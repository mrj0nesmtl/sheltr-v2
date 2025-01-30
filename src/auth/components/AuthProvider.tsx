import { useEffect, useCallback, useRef } from 'react';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../lib/supabase';
import { getUserRole } from '../utils/getUserRole';
import { debounce } from 'lodash';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { 
    login, 
    logout, 
    setLoading,
    setInitialized,
    setInitializing,
    hasInitialized,
    isInitializing 
  } = useAuthStore();
  
  const mountedRef = useRef(true);

  // Add debounced state updates
  const debouncedSetState = useCallback(
    debounce((fn: () => void) => {
      if (mountedRef.current) {
        fn();
      }
    }, 100),
    []
  );

  // Add state tracking
  const prevAuthStateRef = useRef<Partial<AuthState>>({});

  // Update batch updates
  const batchAuthStateUpdates = useCallback((updates: Partial<AuthState>) => {
    if (!mountedRef.current) return;
    
    const hasChanges = Object.entries(updates).some(
      ([key, value]) => {
        const prevValue = prevAuthStateRef.current[key as keyof AuthState];
        return prevValue !== value;
      }
    );
    
    if (hasChanges) {
      prevAuthStateRef.current = { ...prevAuthStateRef.current, ...updates };
      set(updates);
      
      // Log only on significant changes
      if (updates.hasInitialized !== undefined || 
          updates.isAuthenticated !== undefined ||
          updates.user !== undefined) {
        console.debug('Auth State:', updates);
      }
    }
  }, []);

  // Update the auth state handler
  const handleAuthStateChange = useCallback(async (session: any) => {
    if (!mountedRef.current || isInitializing) return;
    
    try {
      setInitializing(true);
      
      if (!session) {
        batchAuthStateUpdates({
          user: null,
          isAuthenticated: false,
          hasInitialized: true,
          isInitializing: false
        });
        return;
      }

      const user = session.user;
      console.debug('Auth State Change - User:', user?.id, 'Metadata:', user?.user_metadata);

      // Get role first
      const { role, organizationId } = await getUserRole(user.id);
      
      // Handle donor profile creation specifically for new donors
      if (role === 'donor') {
        try {
          // First check if donor profile exists
          const { data: existingProfile, error: checkError } = await supabase
            .from('donor_profiles')
            .select('id')
            .eq('user_id', user.id)
            .single();

          if (!existingProfile && !checkError) {
            console.debug('Creating donor profile for:', user.id);
            
            // Create donor profile
            const { error: createError } = await supabase
              .from('donor_profiles')
              .insert({
                user_id: user.id,
                display_name: user.user_metadata?.display_name || user.email?.split('@')[0],
                email: user.email,
                social_links: {},
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              });

            if (createError) {
              console.error('Failed to create donor profile:', createError);
            } else {
              console.debug('Donor profile created successfully');
            }
          }
        } catch (profileError) {
          console.error('Error handling donor profile:', profileError);
        }
      }

      // Update auth state after profile handling
      batchAuthStateUpdates({
        user,
        role,
        organizationId,
        isAuthenticated: true,
        hasInitialized: true,
        isInitializing: false
      });

    } catch (error) {
      console.error('Auth state change error:', error);
      batchAuthStateUpdates({
        user: null,
        isAuthenticated: false,
        hasInitialized: true,
        isInitializing: false,
        error
      });
    }
  }, [batchAuthStateUpdates, setInitializing, isInitializing]);

  // Add initialization tracking
  useEffect(() => {
    if (!mountedRef.current) {
      console.debug('Starting auth initialization...');
      mountedRef.current = true;
    }
    
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Initialize auth once
  useEffect(() => {
    if (hasInitialized || isInitializing) return;

    const initializeAuth = async () => {
      try {
        setLoading(true);
        setInitializing(true);
        
        const { data: { session } } = await supabase.auth.getSession();
        await handleAuthStateChange(session);
        
        setInitialized(true);
      } catch (error) {
        console.error('Auth initialization error:', error);
        await logout();
      } finally {
        if (mountedRef.current) {
          setLoading(false);
          setInitializing(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mountedRef.current = false;
    };
  }, [hasInitialized, isInitializing, handleAuthStateChange]);

  // Auth state listener
  useEffect(() => {
    if (!hasInitialized) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mountedRef.current || isInitializing) return;

        switch (event) {
          case 'SIGNED_OUT':
            await logout();
            break;
          case 'SIGNED_IN':
          case 'TOKEN_REFRESHED':
            await handleAuthStateChange(session);
            break;
          default:
            break;
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [handleAuthStateChange, logout, hasInitialized, isInitializing]);

  return <>{children}</>;
}