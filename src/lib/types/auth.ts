// src/lib/types/auth.ts
export enum AUTH_ROLES {
  SUPER_ADMIN = 'super_admin',
  SHELTER_ADMIN = 'shelter_admin',
  DONOR = 'donor',
  PARTICIPANT = 'participant',
  STAFF = 'staff'
}

export interface User {
  id: string;
  email: string;
  role: AUTH_ROLES;
  created_at: string;
  updated_at: string;
}

export interface Profile extends User {
  name?: string;
  avatar_url?: string;
  bio?: string;
  preferences?: {
    notifications?: boolean;
    theme?: 'light' | 'dark' | 'system';
  };
}

export interface AuthState {
  user: Profile | null;
  isAuthenticated: boolean;
  role: AUTH_ROLES | null;
  error: string | null;
  loading: boolean;
}