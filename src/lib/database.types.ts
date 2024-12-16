export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: 'super_admin' | 'shelter_admin' | 'donor' | 'participant'
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
          role: 'super_admin' | 'shelter_admin' | 'donor' | 'participant'
          [key: string]: any
        }
        Update: {
          email?: string
          role?: 'super_admin' | 'shelter_admin' | 'donor' | 'participant'
          [key: string]: any
        }
      }
    }
  }
}

export type UserRole = 'super_admin' | 'shelter_admin' | 'donor' | 'participant';

export const enum UserRoleEnum {
  SUPER_ADMIN = 'super_admin',
  SHELTER_ADMIN = 'shelter_admin',
  DONOR = 'donor',
  PARTICIPANT = 'participant'
}

export interface ProfileMetadata {
  // Add specific metadata fields
}

export interface ProfileSettings {
  // Add specific settings fields
}

export interface ShelterServices {
  // Add specific service fields
}

export interface EmergencyContact {
  name: string
  phone: string
  relationship: string
  // Add other emergency contact fields
}