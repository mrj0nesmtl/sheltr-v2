import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { User, UserRole, LoginCredentials } from '@/types/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  role: UserRole;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading?: boolean;
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
          useAuthStore.setState(authData);
        }
      }
    } catch (error) {
      console.error('Error restoring auth state:', error);
      localStorage.removeItem('auth');
    }
  }, []);

  useEffect(() => {
    try {
      if (isAuthenticated && user) {
        localStorage.setItem('auth', JSON.stringify({ user, role, isAuthenticated }));
      } else {
        localStorage.removeItem('auth');
      }
    } catch (error) {
      console.error('Error saving auth state:', error);
    }
  }, [isAuthenticated, user, role]);

  const value = {
    isAuthenticated,
    user,
    role,
    login,
    logout: () => {
      logout();
      navigate('/login');
    },
    loading
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