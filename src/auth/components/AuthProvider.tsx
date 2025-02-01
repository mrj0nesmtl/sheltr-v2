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
      console.debug('Auth State Change Handler - Session:', session?.user?.id);
      
      if (!session?.user) {
        batchAuthStateUpdates({
          user: null,
          isAuthenticated: false,
          hasInitialized: true,
          isInitializing: false
        });
        return;
      }

      const user = session.user;
      
      // First ensure base profile is correct
      const { data: existingProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError || !existingProfile || !existingProfile.user_id) {
        console.debug('Fixing base profile for:', user.id);
        
        // Upsert the base profile with correct user_id
        await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            user_id: user.id, // Ensure this is set
            email: user.email,
            role: 'donor',
            verified: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'id',
            ignoreDuplicates: false
          });
      }

      // Then ensure donor profile exists
      const { data: donorProfile } = await supabase
        .from('donor_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!donorProfile) {
        console.debug('Creating donor profile for:', user.id);
        
        await supabase
          .from('donor_profiles')
          .insert({
            user_id: user.id,
            email: user.email,
            display_name: user.email?.split('@')[0],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
      }

      // Get role after ensuring profiles exist
      const { role, organizationId } = await getUserRole(user.id);
      
      console.debug('Role resolved:', role);

      // Add specific routing for donor role
      if (role === 'donor') {
        // Redirect to user-specific donor dashboard
        window.location.href = `/dashboard/donor/${user.id}`;
        return;
      }

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
      
      // Force logout on critical errors
      await logout();
    }
  }, [batchAuthStateUpdates, setInitializing, isInitializing, logout]);

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