import { supabase } from '../supabase';
import type { UserProfile } from '../types/auth';

export async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Session error:', error);
    throw new Error('Failed to get current session');
  }
  return session;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        email,
        role,
        name,
        profile_image,
        verified,
        contact_phone,
        city,
        address,
        registration_number,
        capacity,
        services,
        emergency_contact,
        created_at
      `)
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Profile fetch error:', error);
      return null;
    }

    return data ? {
      ...data,
      profileImage: data.profile_image,
      createdAt: data.created_at,
      verified: data.verified || false
    } : null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password');
      }
      throw error;
    }

    if (!data.user) {
      throw new Error('No user data returned');
    }

    return data.user;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

export async function signOutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Sign out error:', error);
    throw new Error('Failed to sign out');
  }
}

export async function createUserWithEmail(
  email: string,
  password: string,
  profile: {
    name: string;
    profileImage?: string;
    defaultDonation?: number;
    socialLinks?: {
      twitter?: string;
      facebook?: string;
      instagram?: string;
      linkedin?: string;
    };
  }
) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase().trim(),
      password,
      options: {
        data: {
          name: profile.name,
          profile_image: profile.profileImage,
          default_donation: profile.defaultDonation,
          social_links: profile.socialLinks
        }
      }
    });

    if (error) throw error;
    if (!data.user) throw new Error('No user data returned');

    return data.user;
  } catch (error) {
    console.error('Sign up error:', error);
    if (error instanceof Error && error.message.includes('email')) {
      throw new Error('This email is already registered');
    }
    throw new Error('Failed to create account');
  }
}