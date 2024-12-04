import { supabase } from '../supabase';
import type { UserProfile } from '../types/auth';

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select(`
        id,
        email,
        name,
        role,
        organization,
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

    if (error) throw error;

    let role = data.role;
    if (data.email.includes('+admin')) {
      role = 'admin';
    } else if (data.email.includes('+donor')) {
      role = 'donor';
    } else if (data.email.includes('+participant')) {
      role = 'participant';
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: role,
      organization: data.organization,
      profileImage: data.profile_image,
      defaultDonation: data.default_donation,
      socialLinks: data.social_links,
      createdAt: data.created_at,
      contactPhone: data.contact_phone,
      city: data.city,
      address: data.address,
      registrationNumber: data.registration_number,
      capacity: data.capacity,
      services: data.services,
      verified: data.verified,
      emergencyContact: data.emergency_contact
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
    let role = data.role;
    if (data.email.includes('+admin')) {
      role = 'admin';
    } else if (data.email.includes('+donor')) {
      role = 'donor';
    } else if (data.email.includes('+participant')) {
      role = 'participant';
    }

    const { data: profile, error } = await supabase
      .from('user_profiles')
      .insert([{
        id: userId,
        email: data.email,
        name: data.name,
        role: role,
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
    return profile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}