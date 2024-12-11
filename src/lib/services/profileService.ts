import { supabase } from '@/lib/supabase';
import type { UserProfile } from '@/lib/types/auth';
import { profileSchema, type ProfileFormData } from '@/lib/validations/profile';

interface ProfileUpdateData {
  name?: string;
  profileImage?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  bio?: string;
  preferences?: {
    notifications?: boolean;
    language?: string;
    theme?: 'light' | 'dark' | 'system';
  };
}

export async function getUserProfile(userId: string): Promise<UserProfile> {
  const { data: profile, error } = await supabase
    .from('user_profiles')
    .select(`
      id,
      name,
      email,
      role,
      profile_image,
      social_links,
      bio,
      preferences,
      created_at,
      organization_id
    `)
    .eq('id', userId)
    .single();

  if (error) throw error;
  return profile;
}

export async function updateUserProfile(userId: string, data: ProfileFormData) {
  try {
    // Validate data
    const validatedData = profileSchema.parse(data);

    const { error } = await supabase
      .from('user_profiles')
      .update({
        ...validatedData,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) {
      throw new ProfileError(
        error.message,
        error.code
      );
    }

    return getUserProfile(userId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ProfileError(
        'Invalid profile data',
        'VALIDATION_ERROR'
      );
    }
    throw error;
  }
}

export async function getRoleSpecificData(userId: string, role: string) {
  switch (role) {
    case 'participant':
      const { data: participantData } = await supabase
        .from('participants')
        .select(`
          housing_status,
          employment_status,
          total_received,
          services_enrolled(
            service_type,
            status,
            start_date
          )
        `)
        .eq('user_id', userId)
        .single();
      return participantData;

    case 'donor':
      const { data: donorData } = await supabase
        .from('donor_stats')
        .select(`
          total_donated,
          donation_count,
          impact_score,
          beneficiaries_helped
        `)
        .eq('user_id', userId)
        .single();
      return donorData;

    case 'admin':
      const { data: adminData } = await supabase
        .from('organization_staff')
        .select(`
          organizations(
            name,
            total_participants,
            active_participants,
            total_donations
          )
        `)
        .eq('user_id', userId)
        .single();
      return adminData?.organizations;

    default:
      return null;
  }
} 