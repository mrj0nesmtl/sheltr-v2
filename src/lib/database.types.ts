export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          role: 'super_admin' | 'admin' | 'user' | 'participant'
          name: string
          organization?: string
          profile_image?: string
          default_donation?: number
          social_links?: {
            twitter?: string
            facebook?: string
            instagram?: string
            linkedin?: string
          }
          created_at: string
        }
        Insert: {
          id: string
          email: string
          role: 'super_admin' | 'admin' | 'user' | 'participant'
          name: string
          organization?: string
          profile_image?: string
          default_donation?: number
          social_links?: {
            twitter?: string
            facebook?: string
            instagram?: string
            linkedin?: string
          }
        }
        Update: {
          email?: string
          role?: 'super_admin' | 'admin' | 'user' | 'participant'
          name?: string
          organization?: string
          profile_image?: string
          default_donation?: number
          social_links?: {
            twitter?: string
            facebook?: string
            instagram?: string
            linkedin?: string
          }
        }
      }
    }
  }
}