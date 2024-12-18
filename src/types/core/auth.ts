// Define the AUTH_ROLES as both type and enum
export enum AUTH_ROLES {
  SUPER_ADMIN = 'super_admin',
  SHELTER_ADMIN = 'shelter_admin',
  DONOR = 'donor'
}

// User type with all required properties
export interface User {
  id: string;
  email: string;
  role: AUTH_ROLES;
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  created_at: string;
  updated_at?: string;
  aud: string;
}

// Shelter Admin Sign Up Form Data
export interface ShelterAdminSignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  organization: string;
  registrationNumber: string;
  city: string;
  address: string;
  capacity: number;
  services: string[];
  contactPhone: string;
  emergencyContact: {
    name: string;
    phone: string;
    email: string;
  };
  role: AUTH_ROLES.SHELTER_ADMIN;
}

// Auth Response type
export interface AuthResponse {
  data: {
    user: User;
    session: any;
  };
  error: Error | null;
}

// Auth Error type
export interface AuthError {
  message: string;
  status?: number;
}

// Add this to your existing auth.ts file
export interface AuthState {
  user: User | null;
  role: AUTH_ROLES | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Add this if not already present
export interface LoginCredentials {
  email: string;
  password: string;
} 