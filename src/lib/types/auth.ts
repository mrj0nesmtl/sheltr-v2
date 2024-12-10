export type UserRole = 'super_admin' | 'admin' | 'donor' | 'participant';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization?: string | null;
  created_at: string;
  last_sign_in_at?: string;
  profile_image?: string;
}

export interface SignUpData {
  email: string;
  password: string;
  role: UserRole;
  name?: string;
  city?: string;
  address?: string;
  taxReceiptRequired?: boolean;
  defaultDonation?: number;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface ShelterProfile extends UserProfile {
  organization: string;
  registrationNumber: string;
  contactPhone: string;
  city: string;
  address: string;
  capacity: number;
  services: string[];
  verified: boolean;
  emergencyContact: {
    name: string;
    phone: string;
    email: string;
  };
  participantCount: number;
}

export interface DonorProfile extends UserProfile {
  taxReceiptRequired: boolean;
  defaultDonation: number;
  totalDonated: number;
  donationCount: number;
  impactScore: number;
}

export interface ParticipantProfile extends UserProfile {
  servicesReceived: string[];
  activeServices: string[];
  totalReceived: number;
  lastServiceDate: string;
  status: 'active' | 'inactive';
}