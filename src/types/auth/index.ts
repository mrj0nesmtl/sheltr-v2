import { AUTH_ROLES } from './constants';

// Define the UserRole type from AUTH_ROLES
export type AUTH_ROLES = keyof typeof AUTH_ROLES;

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
  role: AUTH_ROLES;
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
    AuthError,
    AuthResponse,
    AuthSession, AuthState, AuthUser, LoginCredentials
} from './auth.types';

// Export auth roles constants
export const AUTH_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  SHELTER_ADMIN: 'SHELTER_ADMIN',
  DONOR: 'DONOR',
  PARTICIPANT: 'PARTICIPANT'
} as const;
