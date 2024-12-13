import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  role: UserRole;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, role, login, logout } = useAuthStore();

  // Persist auth state
  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      // Validate and restore auth state
      if (authData.user && authData.role) {
        useAuthStore.setState(authData);
      }
    }
  }, []);

  // Save auth state changes
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('auth', JSON.stringify({ user, role, isAuthenticated }));
    } else {
      localStorage.removeItem('auth');
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 