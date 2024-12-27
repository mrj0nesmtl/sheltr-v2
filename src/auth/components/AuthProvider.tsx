import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import type { AuthState } from '@/types/core/auth';

// Create initial state
const initialState: AuthState = {
  user: null,
  role: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
  login: async () => { throw new Error('Not initialized') },
  logout: async () => { throw new Error('Not initialized') },
  refreshSession: async () => { throw new Error('Not initialized') },
  updateProfile: async () => { throw new Error('Not initialized') }
};

// Create and export context as a const
export const AuthContext = createContext<AuthState>(initialState);

// Export provider as a named function
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const authInitialized = useRef(false);
  const [state, setState] = useState<AuthState>(() => {
    // Define stable auth methods
    const authMethods = {
      login: async (credentials: LoginCredentials) => {
        const { data, error } = await supabase.auth.signInWithPassword(credentials);
        if (error) throw error;
        
        // Fetch profile data immediately after successful login
        if (data.user) {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();
            
          if (profileError) throw profileError;
          
          // Update state with user and role
          setState(prev => ({
            ...prev,
            user: {
              ...data.user,
              role: profileData?.role || AUTH_ROLES.DONOR
            },
            role: profileData?.role || AUTH_ROLES.DONOR,
            isAuthenticated: true,
            isLoading: false
          }));
        }
        
        return data;
      },
      logout: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      },
      refreshSession: async () => {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return session;
      },
      updateProfile: async (data: Partial<User>) => {
        const { error } = await supabase
          .from('profiles')
          .update(data)
          .eq('id', state?.user?.id);
        if (error) throw error;
      }
    };

    return {
      ...initialState,
      ...authMethods
    };
  });

  useEffect(() => {
    if (authInitialized.current) return;
    authInitialized.current = true;

    let mounted = true;

    async function initializeAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user && mounted) {
          // Fetch profile data
          const { data: profileData } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          setState(prev => ({
            ...prev,
            isLoading: false,
            isAuthenticated: true,
            user: {
              ...session.user,
              role: profileData?.role || AUTH_ROLES.DONOR
            },
            role: profileData?.role || AUTH_ROLES.DONOR
          }));
        } else if (mounted) {
          setState(prev => ({
            ...prev,
            isLoading: false,
            isAuthenticated: false
          }));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setState(prev => ({
            ...prev,
            isLoading: false,
            error
          }));
        }
      }
    }

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;
        
        if (session?.user) {
          // Fetch profile data on auth state change
          const { data: profileData } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          setState(prev => ({
            ...prev,
            isLoading: false,
            isAuthenticated: true,
            user: {
              ...session.user,
              role: profileData?.role || AUTH_ROLES.DONOR
            },
            role: profileData?.role || AUTH_ROLES.DONOR
          }));
        } else {
          setState(prev => ({
            ...prev,
            isLoading: false,
            isAuthenticated: false,
            user: null,
            role: null
          }));
        }
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

// Export hook as a named function
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}