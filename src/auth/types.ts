import type { User as SupabaseUser } from '@supabase/supabase-js';

export enum AUTH_ROLES {
  SUPER_ADMIN = 'super_admin',
  SHELTER_ADMIN = 'shelter_admin',
  DONOR = 'donor',
  PARTICIPANT = 'participant'
}

export interface User extends SupabaseUser {
  role: AUTH_ROLES;
  firstName?: string;
  lastName?: string;
  profileComplete: boolean;
  profile?: ShelterProfile | DonorProfile | ParticipantProfile;
}

export interface BaseProfile {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  metadata: UserMetadata;
}

export interface ShelterProfile extends BaseProfile {
  name: string;
  address: string;
  city: string;
  contact_phone: string;
  registration_number: string;
  capacity: number;
  services: string[];
  emergency_contact: {
    name: string;
    phone: string;
    relationship: string;
  };
  current_occupancy: number;
  verified: boolean;
}

export interface DonorProfile extends BaseProfile {
  total_donated: number;
  total_donations: number;
  impact_score: number;
  last_donation_at?: Date;
  donation_frequency?: 'one-time' | 'monthly' | 'quarterly';
  preferred_causes: string[];
  anonymous: boolean;
}

export interface ParticipantProfile extends BaseProfile {
  shelter_id: string;
  program_type: string[];
  status: 'active' | 'inactive' | 'graduated';
  join_date: Date;
  needs_assessment: string[];
  goals: string[];
  progress_metrics: Record<string, number>;
}

export interface UserMetadata {
  last_updated: string;
  update_count: number;
  last_activity: string;
  activity_score: number;
  activity_status: string;
  profile_created: string;
  activity_metrics: {
    status: string;
    activity_history: Record<string, string>;
    activity_threshold: number;
    last_status_update: string;
    days_since_last_activity: number;
  };
  engagement_level: string;
  last_engagement_update: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  role: AUTH_ROLES | null;
  loading: boolean;
  isAuthenticated: boolean;
  error?: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export interface AuthResponse {
  user: User;
  session: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
}

export interface AuthError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
} 