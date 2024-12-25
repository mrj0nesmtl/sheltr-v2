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

    // Return initial state with stable methods
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
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted) {
          setState(prev => ({
            ...prev,
            isLoading: false,
            isAuthenticated: !!session,
            user: session?.user || null
          }));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      }
    }

    // Initialize auth
    initializeAuth();

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;
        setState(prev => ({
          ...prev,
          isLoading: false,
          isAuthenticated: !!session,
          user: session?.user || null
        }));
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