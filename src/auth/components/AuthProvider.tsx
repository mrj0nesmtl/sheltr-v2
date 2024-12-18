import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  AUTH_ROLES, 
  type AuthState, 
  type User, 
  type AuthError, 
  type LoginCredentials 
} from '@/types/core/auth';

const initialState: AuthState = {
  user: null,
  role: null,
  loading: true,
  isAuthenticated: false,
  error: null,
  login: async () => { throw new Error('AuthProvider not initialized') },
  logout: async () => { throw new Error('AuthProvider not initialized') },
  refreshSession: async () => { throw new Error('AuthProvider not initialized') },
  updateProfile: async () => { throw new Error('AuthProvider not initialized') }
};

export const AuthContext = createContext<AuthState>(initialState);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          setState((prev: AuthState) => ({
            ...prev,
            user: {
              ...session.user,
              ...profile,
              role: profile?.role as AUTH_ROLES
            } as User,
            isAuthenticated: true,
            loading: false
          }));
        } else {
          setState((prev: AuthState) => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setState((prev: AuthState) => ({ 
          ...prev, 
          error: 'Failed to initialize authentication',
          loading: false 
        }));
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          setState((prev: AuthState) => ({
            ...prev,
            user: { ...session.user, ...profile } as User,
            role: profile?.role as AUTH_ROLES,
            isAuthenticated: true,
            loading: false
          }));
        } else if (event === 'SIGNED_OUT') {
          setState((prev: AuthState) => ({
            ...prev,
            user: null,
            role: null,
            isAuthenticated: false,
            loading: false
          }));
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setState((prev: AuthState) => ({
      ...prev,
      loading: true,
      error: null
    }));
    try {
      const { data, error } = await supabase.auth.signInWithPassword(credentials);
      if (error) throw error;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      setState((prev: AuthState) => ({
        ...prev,
        user: { ...data.user, ...profile } as User,
        role: profile?.role as AUTH_ROLES,
        isAuthenticated: true,
        loading: false
      }));
    } catch (error) {
      setState((prev: AuthState) => ({
        ...prev,
        error: (error as AuthError).message || 'Failed to login',
        loading: false
      }));
      throw error;
    }
  };

  const logout = async () => {
    setState((prev: AuthState) => ({
      ...prev,
      loading: true,
      error: null
    }));
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setState(prev => ({
        ...prev,
        user: null,
        role: null,
        isAuthenticated: false,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: (error as AuthError).message || 'Failed to logout',
        loading: false
      }));
      throw error;
    }
  };

  const refreshSession = async () => {
    setState((prev: AuthState) => ({
      ...prev,
      loading: true,
      error: null
    }));
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;

      if (data.session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', data.session.user.id)
          .single();

        setState(prev => ({
          ...prev,
          user: { ...data.session?.user, ...profile } as User,
          role: profile?.role as AUTH_ROLES,
          isAuthenticated: true,
          loading: false
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: (error as AuthError).message || 'Failed to refresh session',
        loading: false
      }));
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    setState((prev: AuthState) => ({
      ...prev,
      loading: true,
      error: null
    }));
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('user_id', state.user?.id);

      if (error) throw error;

      setState(prev => ({
        ...prev,
        user: { ...prev.user, ...data } as User,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: (error as AuthError).message || 'Failed to update profile',
        loading: false
      }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{
        ...state,
        login,
        logout,
        refreshSession,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 