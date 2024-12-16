// src/lib/types/auth.ts
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  SHELTER_ADMIN = 'shelter_admin',
  DONOR = 'donor',
  PARTICIPANT = 'participant',
  STAFF = 'staff'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
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
  role: UserRole | null;
  error: string | null;
  loading: boolean;
}