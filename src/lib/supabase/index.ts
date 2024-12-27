import { createClient, type User as SupabaseUser } from '@supabase/supabase-js';
import type { AUTH_ROLES } from '../auth/types';
import { Database } from '../types/database';
import { securityConfig } from './security';

// Debug environment variables (only in development)
if (import.meta.env.DEV) {
  console.log('Supabase Configuration:', {
    URL: import.meta.env.VITE_SUPABASE_URL?.slice(0, 10) + '...',
    KEY_EXISTS: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
    ENV: import.meta.env.MODE
  });
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// URL validation
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Environment validation
if (!supabaseUrl || !isValidUrl(supabaseUrl)) {
  throw new Error('[Supabase] Invalid or missing VITE_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  throw new Error('[Supabase] Missing VITE_SUPABASE_ANON_KEY');
}

// Create the client with all configurations
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: localStorage,
      storageKey: 'sheltr-auth-token'
    },
    ...securityConfig
  }
);

// Export typed helpers
export const auth = supabase.auth;
export const db = supabase.from;

// Profile management
export async function getUserProfile(userId: string) {
  if (!userId) {
    console.error('[Supabase] getUserProfile called without userId');
    return null;
  }

  try {
    console.log('[Supabase] Fetching profile for userId:', userId);
    
    const { data, error } = await db('profiles')
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
    
    if (error) throw error;
    
    console.log('[Supabase] Profile fetch result:', data);
    return data;
  } catch (error) {
    console.error('[Supabase] Profile error:', error);
    return null;
  }
}

// Session management
export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error('[Supabase] Session error:', error);
    return null;
  }
}

// Role validation
export async function validateUserRole(userId: string, expectedRole: AUTH_ROLES): Promise<boolean> {
  const profile = await getUserProfile(userId);
  return profile?.role === expectedRole;
}

// Add after other utility functions
export const forceLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Clear any auth-related local storage
    localStorage.removeItem('sheltr-auth-token'); // Updated to use our custom key
    localStorage.removeItem('user');
    
    // Force reload the page to clear any cached auth state
    window.location.href = '/login';
  } catch (error) {
    console.error('[Supabase] Error during logout:', error);
  }
};

// Re-export types
export type { Database } from '../types/database';
export type { SupabaseUser as User, AUTH_ROLES };
