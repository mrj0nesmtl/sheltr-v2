export type UserRole = 'super_admin' | 'admin' | 'shelter_admin' | 'donor' | 'participant';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization?: string | null;
  profileImage?: string | null;
  defaultDonation?: number | null;
  socialLinks?: Record<string, string> | null;
  createdAt: string;
  contactPhone?: string | null;
  city?: string | null;
  address?: string | null;
  registrationNumber?: string | null;
  capacity?: number | null;
  services?: string[] | null;
  verified?: boolean;
  emergencyContact?: {
    name?: string;
    phone?: string;
    email?: string;
  } | null;
}

export interface SignUpData {
  email: string;
  password: string;
  role: UserRole;
  name?: string;
  city?: string;
  address?: string;
  taxReceiptRequired?: boolean;
  defaultDonation?: number;  // Changed from string to number
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  // Add other signup fields as needed
}

export interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  checkUser: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}