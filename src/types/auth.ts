// Import from the correct path
export * from '@/auth/types/auth.types';

// Define base roles using const assertion for better type inference
export const AUTH_ROLES = {
  SUPER_ADMIN: 'super_admin',
  SHELTER_ADMIN: 'shelter_admin',
  DONOR: 'donor',
  PARTICIPANT: 'participant'
} as const;

// Create a type from the AUTH_ROLES values
export type UserRole = typeof AUTH_ROLES[keyof typeof AUTH_ROLES];

// Base user interface
export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  last_sign_in_at?: string;
  metadata?: {
    name?: string;
    avatar_url?: string;
  };
}

// Auth state interface
export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error?: Error | null;
}

// Session interface matching Supabase session
export interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: User;
}

// Role-based type guards
export const isSuperAdmin = (user: User): boolean => user.role === AUTH_ROLES.SUPER_ADMIN;
export const isShelterAdmin = (user: User): boolean => user.role === AUTH_ROLES.SHELTER_ADMIN;
export const isDonor = (user: User): boolean => user.role === AUTH_ROLES.DONOR;
export const isParticipant = (user: User): boolean => user.role === AUTH_ROLES.PARTICIPANT;

// Role-based permission types
export type Permission = 
  | 'manage:shelters'
  | 'manage:donors'
  | 'manage:participants'
  | 'view:analytics'
  | 'manage:donations';

// Role to permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: ['manage:shelters', 'manage:donors', 'manage:participants', 'view:analytics', 'manage:donations'],
  shelter_admin: ['manage:participants', 'view:analytics'],
  donor: ['manage:donations'],
  participant: []
};

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