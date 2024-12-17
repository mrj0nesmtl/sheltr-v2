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

// Re-export other auth types
export type { 
  UserRole,
  AuthState,
  LoginCredentials,
  AuthUser,
  AuthError,
  AuthResponse,
  AuthSession
} from './auth.types';

// Export any auth-related constants
export const AUTH_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  SHELTER_ADMIN: 'SHELTER_ADMIN',
  DONOR: 'DONOR'
} as const;
