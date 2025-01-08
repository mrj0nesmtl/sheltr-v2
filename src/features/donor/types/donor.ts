import { UserRole } from '@/auth/types';

export interface DonorProfile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url?: string;
  email: string;
  role: UserRole.DONOR;
  donation_preferences?: DonationPreferences;
  social_connections?: SocialConnections;
  impact_stats: DonorImpactStats;
  created_at: string;
  updated_at: string;
}

export interface DonationPreferences {
  preferred_causes?: string[];
  notification_frequency?: 'daily' | 'weekly' | 'monthly';
  anonymous_donations?: boolean;
  auto_share?: boolean;
}

export interface SocialConnections {
  connected_donors?: string[];
  followed_shelters?: string[];
  impact_circle?: string[];
}

export interface DonorImpactStats {
  total_donated: number;
  impact_score: number;
  donation_streak: number;
  people_helped: number;
  total_donations: number;
}

export interface DonorRegistrationData {
  email: string;
  password: string;
  display_name: string;
  donation_preferences?: DonationPreferences;
  social_connections?: SocialConnections;
} 