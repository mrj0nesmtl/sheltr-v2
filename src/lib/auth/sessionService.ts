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
    console.log('Calling Supabase signInWithPassword'); // Debug log
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log('Supabase response:', { user, error }); // Debug log

    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Supabase sign in error:', error); // Debug log
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