export enum AUTH_ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
  ORGANIZATION = 'ORGANIZATION',
  DONOR = 'DONOR'
}

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

// Create a separate auth.types.ts file if it doesn't exist
export interface AuthError {
  message: string;
  status: number;
}

export interface AuthResponse {
  data: {
    user: AuthUser;
    session: AuthSession;
  };
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
  role: AUTH_ROLES;
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  created_at: string;
  updated_at?: string;
  aud: string;
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

export interface DonorSignUpFormData {
  email: string;
  password: string;
  name: string;
  role: AUTH_ROLES.DONOR;
}
