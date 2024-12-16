import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = 'https://oinjrlzucizztdstaggg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsImR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pbmpybHp1Y2l6enRkc3RhZ2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI1MjQ1OTksImV4cCI6MjAxODEwMDU5OX0.eyJhbGciOiJIUzI1NiIsImR5cCI6IkpXVCJ9';

// Add debug logging
console.log('Initializing Supabase client with:', { 
  url: supabaseUrl,
  keyLength: supabaseAnonKey.length 
});

// Ensure we only create one instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type-safe auth helpers
export const auth = supabase.auth;
export const db = supabase.from;