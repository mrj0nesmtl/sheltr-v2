export interface Database {
  public: {
    Tables: {
      donations: {
        Row: {
          id: string
          created_at: string
          participant_id: string
          amount: number
          donor_email?: string
          transaction_id: string
          status?: 'pending' | 'completed' | 'failed'
        }
      }
      donor_stats: {
        Row: {
          donor_id: string
          current_streak: number
          longest_streak: number
          last_donation_date?: string
          total_donated: number
          donation_count: number
          created_at: string
          updated_at: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          registration_number: string
          status?: 'pending' | 'active' | 'suspended'
          verified?: boolean
          created_at: string
          updated_at: string
          address?: string
          city?: string
          postal_code?: string
          country?: string
          phone?: string
          email?: string
          website?: string
          total_capacity?: number
          current_capacity?: number
          tax_id?: string
          verification_date?: string
          verified_by?: string
          last_audit_date?: string
          services?: any[]
          metadata?: Record<string, any>
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          role: string
          name?: string
          verified?: boolean
          profile_image?: string
          total_donated: number
          total_donations: number
          impact_score: number
          created_at: string
          updated_at: string
        }
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Role types based on the schema
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  SHELTER_ADMIN = 'shelter_admin',
  DONOR = 'donor',
  PARTICIPANT = 'participant',
  STAFF = 'staff'
}

// Auth user type
export interface AuthUser {
  id: string
  email: string
  role: UserRole
  profile: Tables<'profiles'>
} 