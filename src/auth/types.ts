import type { User } from '@supabase/supabase-js';

export type UserRole = typeof AUTH_ROLES[keyof typeof AUTH_ROLES];

export interface LoginCredentials {
  email: string;
  password: string;
} 