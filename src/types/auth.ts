// Import from the correct path
export * from '@/auth/types/auth.types';

// Define AUTH_ROLES using the imported UserRole enum
export const AUTH_ROLES = {
  SUPER_ADMIN: 'super_admin',
  SHELTER_ADMIN: 'shelter_admin',
  DONOR: 'donor',
  PARTICIPANT: 'participant'
} as const;

// Remove duplicate definitions since they're coming from auth.types.ts
// Remove these as they're already defined in auth.types.ts:
// - UserRole
// - User
// - AuthState

// Remove the last line as we're already importing at the top
// export * from './auth.types'; 

export interface ShelterAdminSignUpFormData {
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  registration_number: string;
  capacity: number;
  emergency_contact?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  role: typeof AUTH_ROLES.SHELTER_ADMIN;
}