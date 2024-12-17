import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { UserRole, type AuthState, type LoginCredentials } from '../../lib/auth/types';
import { supabase, auth, getUserProfile } from '../../lib/supabase';
import type { User } from '@supabase/supabase-js';

type AuthContextType = AuthState;

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, role, login, logout, loading } = useAuthStore();

  // Session recovery and validation
  useEffect(() => {
    const initializeAuth = async () => {
      useAuthStore.setState({ loading: true });
      try {
        const { data: { session }, error } = await auth.getSession();
        
        // Only proceed if we have a valid session
        if (session?.user?.id) {
          console.log('Valid session found, fetching profile...');
          const profile = await getUserProfile(session.user.id);
          if (profile) {
            useAuthStore.setState({
              user: session.user,
              role: profile.role as UserRole,
              isAuthenticated: true,
              loading: false
            });
          } else {
            // Profile not found, clear session
            handleInvalidSession();
          }
        } else {
          // No valid session
          handleInvalidSession();
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
            const profile = await getUserProfile(session.user.id);
            if (profile) {
              useAuthStore.setState({
                user: session.user,
                role: profile.role as UserRole,
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
    localStorage.removeItem('sheltr-auth-token');
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
        await auth.signOut();
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