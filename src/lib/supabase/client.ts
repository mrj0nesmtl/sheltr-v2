import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

// Change to use environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://oinjrlzucizztdstagqg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pbmpybHp1Y2l6enRkc3RhZ3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4ODkwODcsImV4cCI6MjA0NDQ2NTA4N30.XPKa2Zhse4_KZRSuHfwaqBo0A9QezPhWdPLezI67zdk';

// Add debug logging
console.log('Initializing Supabase client with:', { 
  url: supabaseUrl,
  keyLength: supabaseAnonKey.length,
  timestamp: new Date().toISOString(),
  usingEnvVars: !!import.meta.env.VITE_SUPABASE_URL
});

export const supabase = createClient<Database>(
  supabaseUrl, 
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storage: window.localStorage // Explicitly set storage
    }
  }
);

// Test connection immediately
supabase.auth.getSession().then(response => {
  console.log('Initial session check:', response);
}).catch(error => {
  console.error('Session check failed:', error);
});

export const auth = supabase.auth;
export const db = supabase.from;

export async function getUserProfile(userId: string) {
  if (!userId) {
    console.error('getUserProfile called without userId');
    return null;
  }

  try {
    console.log('Fetching profile for userId:', userId);
    
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        email,
        role,
        name,
        first_name,
        last_name,
        is_active,
        profile_complete
      `)
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Profile fetch error:', error);
      return null;
    }

    console.log('Profile fetch result:', data);
    return data;

  } catch (error) {
    console.error('getUserProfile error:', error);
    return null;
  }
}

// Add a force logout utility
export const forceLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Clear any auth-related local storage
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('user');
    
    // Force reload the page to clear any cached auth state
    window.location.href = '/login';
  } catch (error) {
    console.error('Error during logout:', error);
  }
};