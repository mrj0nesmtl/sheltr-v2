import { AUTH_ROLES } from './constants';

// Define the role type from AUTH_ROLES
export type AllowedRole = (typeof AUTH_ROLES)[keyof typeof AUTH_ROLES];

// Base user interface
export interface BaseUser {
  id: string;
  email: string;
  role: AllowedRole;
}

// Supabase user interface
export interface User extends BaseUser {
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  aud: string;
  created_at: string;
}

// Auth state user interface
export interface AuthUser extends BaseUser {
  // Add any additional auth-specific user properties here
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

export interface AuthResponse {
  user: User;
  session: any; // Type this more specifically if needed
} 