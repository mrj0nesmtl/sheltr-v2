export type UserRole = 'super_admin' | 'admin' | 'shelter_admin' | 'donor' | 'participant';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  organization?: string;
  city?: string;
  address?: string;
  annualIncome?: number;
  taxReceiptRequired?: boolean;
  profileImage?: string | null;
  defaultDonation?: number | null;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  } | null;
  verified?: boolean;
  createdAt: string;
}

export interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  checkUser: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}