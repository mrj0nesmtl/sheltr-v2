// Add this file to centralize environment configuration
export const config = {
  environment: import.meta.env.VITE_ENVIRONMENT || 'development',
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  api: {
    url: import.meta.env.VITE_API_URL || 'http://localhost:5173',
  },
  features: {
    qrScanner: import.meta.env.VITE_ENABLE_QR_SCANNER === 'true',
    offlineMode: import.meta.env.VITE_ENABLE_OFFLINE_MODE === 'true',
  }
} 