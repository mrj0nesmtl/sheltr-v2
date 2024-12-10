import { supabase } from '../supabase';
import type { UserProfile } from '../types/auth';

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select(`
        id,
        email,
        name,
        role,
        profile_image,
        default_donation,
        social_links,
        created_at,
        contact_phone,
        city,
        address,
        registration_number,
        capacity,
        services,
        verified,
        emergency_contact
      `)
      .eq('id', userId)
      .single();

    if (profileError) throw profileError;

    // Get organization info separately if needed
    let organizationId = null;
    if (profile.role === 'admin') {
      const { data: orgStaff } = await supabase
        .from('organization_staff')
        .select('organization_id')
        .eq('user_id', userId)
        .single();
      organizationId = orgStaff?.organization_id;
    }

    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      organization: organizationId,
      created_at: profile.created_at
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function createUserProfile(userId: string, data: {
  email: string;
  name: string;
  role: string;
  city?: string;
  address?: string;
  contactPhone?: string;
  organization?: string;
  registrationNumber?: string;
  capacity?: number;
  services?: string[];
}) {
  try {
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .insert([{
        id: userId,
        email: data.email,
        name: data.name,
        role: data.role,
        city: data.city,
        address: data.address,
        contact_phone: data.contactPhone,
        organization: data.organization,
        registration_number: data.registrationNumber,
        capacity: data.capacity,
        services: data.services,
        created_at: new Date().toISOString(),
        verified: false
      }])
      .select()
      .single();

    if (error) throw error;

    // If creating a participant, also create participant record
    if (data.role === 'participant') {
      const { error: participantError } = await supabase
        .from('participants')
        .insert({
          user_id: userId,
          name: data.name,
          qr_code: `SHELTR-${userId.slice(0, 8)}`,
          status: 'active'
        });

      if (participantError) throw participantError;
    }

    return profile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}