import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/auth/stores/authStore';
import { User, UserRole, LoginCredentials, AuthState } from '@/auth/types/auth.types';

interface AuthContextType extends AuthState {
  isAuthenticated: boolean;
  user: User | null;
  role: UserRole;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, role, login, logout, loading } = useAuthStore();

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('auth');
      if (savedAuth) {
        const authData = JSON.parse(savedAuth);
        if (authData.user && authData.role) {
          validateSession(authData).then(isValid => {
            if (isValid) {
              useAuthStore.setState(authData);
            } else {
              handleInvalidSession();
            }
          });
        }
      }
    } catch (error) {
      console.error('Error restoring auth state:', error);
      handleInvalidSession();
    }
  }, []);

  useEffect(() => {
    try {
      if (isAuthenticated && user) {
        localStorage.setItem('auth', JSON.stringify({ 
          user, 
          role, 
          isAuthenticated,
          lastActive: new Date().toISOString() 
        }));
      } else {
        handleInvalidSession();
      }
    } catch (error) {
      console.error('Error saving auth state:', error);
    }
  }, [isAuthenticated, user, role]);

  const handleInvalidSession = () => {
    localStorage.removeItem('auth');
    useAuthStore.setState({ 
      user: null, 
      role: null, 
      isAuthenticated: false 
    });
    navigate('/login');
  };

  const validateSession = async (authData: any): Promise<boolean> => {
    return true;
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    role,
    login,
    logout: () => {
      logout();
      navigate('/login');
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