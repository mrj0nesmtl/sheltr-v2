import type { User } from '@supabase/supabase-js';

export type UserRole = typeof AUTH_ROLES[keyof typeof AUTH_ROLES];

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
} 