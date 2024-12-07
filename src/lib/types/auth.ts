export type UserRole = 'super_admin' | 'admin' | 'shelter_admin' | 'donor' | 'participant';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  verified?: boolean;
  profileImage?: string;
  totalDonated?: number;
  totalDonations?: number;
  impactScore?: number;
  createdAt: string;
  updatedAt: string;
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

export interface ShelterProfile extends UserProfile {
  organization?: string;
  registrationNumber?: string;
  contactPhone?: string;
  city?: string;
  address?: string;
  capacity?: number;
  services?: string[];
  verified?: boolean;
  emergencyContact?: string;
  participantCount?: number;
}