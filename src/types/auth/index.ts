import type { User } from '@supabase/supabase-js';
import { AUTH_ROLES } from './constants';

// Define the UserRole type from AUTH_ROLES
export type UserRole = keyof typeof AUTH_ROLES;

// Define the Transaction type
export type Transaction = {
  id: string;
  amount: number;
  date: Date;
  userId: string;
  recipientId: string;
  status: 'pending' | 'completed' | 'failed';
  type: 'donation' | 'withdrawal';
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
};

// Define the UserProfile interface
export interface UserProfile {
  id: string;
  role: UserRole;
  email: string;
  firstName?: string;
  lastName?: string;
  organizationName?: string;
  phoneNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Re-export auth types
export type { 
  AuthState,
  LoginCredentials,
  AuthUser,
  AuthError,
  AuthResponse,
  AuthSession
} from './auth.types';

// Export auth roles constants
export const AUTH_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  SHELTER_ADMIN: 'SHELTER_ADMIN',
  DONOR: 'DONOR',
  PARTICIPANT: 'PARTICIPANT'
} as const;
