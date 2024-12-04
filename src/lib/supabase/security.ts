import { createClient } from '@supabase/supabase-js';

export const securityConfig = {
  // Ensure search paths are set to public schema
  searchPath: 'public',
  
  // Add row level security policies
  policies: {
    // Define RLS policies here
  },
  
  // Function security settings
  functions: {
    validateShelterServices: {
      security: 'definer',
      searchPath: ['public'],
    },
    increment: {
      security: 'definer',
      searchPath: ['public'],
    },
    createSuperAdmin: {
      security: 'definer',
      searchPath: ['public'],
    },
    handleNewUser: {
      security: 'definer',
      searchPath: ['public'],
    },
    makeSuperAdmin: {
      security: 'definer',
      searchPath: ['public'],
    },
    exportSchema: {
      security: 'definer',
      searchPath: ['public'],
    },
    setupUserProfile: {
      security: 'definer',
      searchPath: ['public'],
    },
    updateLongestStreak: {
      security: 'definer',
      searchPath: ['public'],
    },
  },
};
