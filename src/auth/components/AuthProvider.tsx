import { createContext, useContext, useState } from 'react';
import type { AuthState } from '../types';

export const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: false,
    isAuthenticated: false,
    login: async (email: string, password: string) => {
      setState(prev => ({ ...prev, loading: true }));
      // ... login logic
    },
    logout: async () => {
      setState(prev => ({ ...prev, loading: true }));
      // ... logout logic
    }
  });

  return (
    <AuthContext.Provider value={state}>
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