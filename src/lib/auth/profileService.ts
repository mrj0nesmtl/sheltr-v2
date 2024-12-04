import { supabase } from '../supabase';
import type { UserProfile } from '../types/auth';

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select(`
        id,
        email,
        role,
        name,
        organization,
        profile_image,
        default_donation,
        social_links,
        created_at
      `)
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Profile fetch error:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      email: data.email,
      role: data.role,
      name: data.name,
      organization: data.organization,
      profileImage: data.profile_image || null,
      defaultDonation: data.default_donation || null,
      socialLinks: data.social_links || null,
      createdAt: data.created_at
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function createUserProfile(userId: string, data: {
  email: string;
  name: string;
  role?: string;
  profileImage?: string;
  defaultDonation?: number;
  socialLinks?: Record<string, string>;
}): Promise<UserProfile | null> {
  try {
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .upsert({
        id: userId,
        email: data.email,
        name: data.name,
        role: data.role || 'user',
        profile_image: data.profileImage || null,
        default_donation: data.defaultDonation || null,
        social_links: data.socialLinks || null,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Profile creation error:', error);
      return null;
    }

    return profile ? {
      id: profile.id,
      email: profile.email,
      role: profile.role,
      name: profile.name,
      organization: profile.organization,
      profileImage: profile.profile_image || null,
      defaultDonation: profile.default_donation || null,
      socialLinks: profile.social_links || null,
      createdAt: profile.created_at
    } : null;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return null;
  }
}