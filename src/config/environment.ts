// Make sure this file doesn't contain any secrets
export const environment = {
  production: import.meta.env.PROD,
  development: import.meta.env.DEV,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  // ... other non-sensitive config
}; 