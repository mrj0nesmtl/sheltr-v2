import { AUTH_ROLES } from './constants';

// Define the UserRole type from AUTH_ROLES
export type UserRole = typeof AUTH_ROLES[keyof typeof AUTH_ROLES];

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

// Create a separate auth.types.ts file if it doesn't exist
export interface AuthError {
  message: string;
  status: number;
}

export interface AuthResponse {
  user: AuthUser | null;
  error: AuthError | null;
}

export interface AuthSession {
  user: AuthUser | null;
  expires_at: number;
}

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  loading: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Export auth roles constants
export const AUTH_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  SHELTER_ADMIN: 'SHELTER_ADMIN',
  DONOR: 'DONOR',
  PARTICIPANT: 'PARTICIPANT'
} as const;

// First, define the enum of roles
export enum AUTH_ROLES {
  SUPER_ADMIN = 'SUPER_ADMIN',
  SHELTER_ADMIN = 'SHELTER_ADMIN',
  DONOR = 'DONOR',
  PARTICIPANT = 'PARTICIPANT'
}

// Then create a type from the enum
export type UserRole = keyof typeof AUTH_ROLES;

// Export a constant for runtime use
export const ROLE_VALUES = {
  SUPER_ADMIN: AUTH_ROLES.SUPER_ADMIN,
  SHELTER_ADMIN: AUTH_ROLES.SHELTER_ADMIN,
  DONOR: AUTH_ROLES.DONOR,
  PARTICIPANT: AUTH_ROLES.PARTICIPANT
} as const;

// Update interfaces to use the new type
export interface UserProfile {
  id: string;
  role: UserRole;
  email: string;
  // ... rest of the interface
}

// Update form types
export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export interface DonorSignUpFormData extends SignUpFormData {
  role: typeof AUTH_ROLES.DONOR;
  name: string;
}

export interface ShelterAdminSignUpFormData extends SignUpFormData {
  role: typeof AUTH_ROLES.SHELTER_ADMIN;
  organizationName: string;
}
