import { supabase } from '../supabase';

export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Session error:', error);
      return null;
    }
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
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
    
    // Clear any cached data
    await supabase.auth.getSession();
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

export async function signUpWithEmail(
  email: string,
  password: string,
  userData: {
    name: string;
    role?: string;
    profileImage?: string;
    defaultDonation?: number;
    socialLinks?: Record<string, string>;
  }
) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase().trim(),
      password,
      options: {
        data: {
          ...userData,
          role: userData.role || 'user'
        }
      }
    });

    if (error) throw error;
    if (!data.user) throw new Error('No user data returned');

    return data.user;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}