import type { User } from '@supabase/supabase-js';

export enum AUTH_ROLES {
  SUPER_ADMIN = 'super_admin',
  SHELTER_ADMIN = 'shelter_admin',
  DONOR = 'donor',
  PARTICIPANT = 'participant'
}

export interface AuthState {
  user: User | null;
  role: AUTH_ROLES | null;
  isAuthenticated: boolean;
  loading: boolean;
  error?: Error | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export interface LoginCredentials {
  email: string;
  password: string;
} 