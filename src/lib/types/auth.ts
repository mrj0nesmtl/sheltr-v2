export type UserRole = 'super_admin' | 'admin' | 'shelter_admin' | 'donor' | 'participant' | 'authenticated';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface UserProfile extends Profile {
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  organization_id?: string;
}

export interface DonorProfile extends UserProfile {
  total_donated: number;
  donation_count: number;
  last_donation_date?: string;
  preferred_causes?: string[];
  tax_receipt_email?: string;
}

export interface DonorStats {
  donor_id: string;
  total_donated: number;
  donation_count: number;
  impact_score: number;
  last_donation_date: string;
}