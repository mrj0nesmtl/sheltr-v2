import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { UserRole } from '@/auth/types/auth.types';
import { supabase } from '@/lib/supabase';

interface AuthContextType extends AuthState {
  isAuthenticated: boolean;
  user: User | null;
  role: UserRole;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, role, login, logout, loading } = useAuthStore();

  // Session recovery and validation
  useEffect(() => {
    const initializeAuth = async () => {
      useAuthStore.setState({ loading: true });
      try {
        // Check Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          // Get user profile with role
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            useAuthStore.setState({
              user: session.user,
              role: profile.role,
              isAuthenticated: true,
              loading: false
            });
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        handleInvalidSession();
      } finally {
        useAuthStore.setState({ loading: false });
      }
    };

    initializeAuth();
  }, []);

  // Real-time auth state monitoring
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          handleInvalidSession();
        } else if (event === 'SIGNED_IN' && session) {
          useAuthStore.setState({ loading: true });
          try {
            // Update auth store with new session data
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              useAuthStore.setState({
                user: session.user,
                role: profile.role,
                isAuthenticated: true,
                loading: false
              });
            }
          } catch (error) {
            console.error('Profile fetch error:', error);
            handleInvalidSession();
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleInvalidSession = () => {
    localStorage.removeItem('auth');
    useAuthStore.setState({ 
      user: null, 
      role: null, 
      isAuthenticated: false,
      loading: false
    });
    navigate('/login');
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    role,
    login,
    logout: async () => {
      useAuthStore.setState({ loading: true });
      try {
        await supabase.auth.signOut();
        logout();
        navigate('/login');
      } finally {
        useAuthStore.setState({ loading: false });
      }
    },
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 