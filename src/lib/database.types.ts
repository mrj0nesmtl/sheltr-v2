import { AUTH_ROLES } from '../auth/types/auth.types';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: AUTH_ROLES
          is_active?: boolean
          verified?: boolean
          profile_complete?: boolean
          first_name?: string
          last_name?: string
          name?: string
          profile_image?: string
          contact_phone?: string
          address?: string
          city?: string
          registration_number?: string
          engagement_score?: number
          activity_score?: number
          impact_score?: number
          capacity?: number
          total_donated?: number
          total_donations?: number
          metadata?: Record<string, any>
          settings?: Record<string, any>
          services?: Record<string, any>
          emergency_contact?: Record<string, any>
          created_at?: string
          updated_at?: string
          last_login?: string
          last_activity_at?: string
        }
        Insert: {
          id: string
          email: string
          role: AUTH_ROLES
          [key: string]: any
        }
        Update: {
          email?: string
          role?: AUTH_ROLES
          [key: string]: any
        }
      }
    }
  }
}

export interface ProfileMetadata {
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

export interface ProfileSettings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    showProfile: boolean;
    showDonations: boolean;
    showActivity: boolean;
  };
  preferences: {
    language: string;
    theme: 'light' | 'dark' | 'system';
    currency: string;
  };
}

export interface ShelterServices {
  id: string;
  name: string;
  description: string;
  availability: boolean;
  capacity: number;
  requirements?: string[];
  schedule?: {
    days: string[];
    hours: string;
  };
  status: 'active' | 'inactive' | 'maintenance';
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
  email?: string;
  address?: string;
  isVerified: boolean;
  lastVerified?: string;
  notes?: string;
}

export type { AUTH_ROLES } from '../auth/types/auth.types';