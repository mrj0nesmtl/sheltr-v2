import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            'i18next',
            'react-i18next'
          ],
          'ui': [
            '@radix-ui/react-accordion',
            'lucide-react',
            'recharts'
          ],
          'auth': [
            '@supabase/auth-ui-react',
            '@supabase/auth-ui-shared',
            '@supabase/supabase-js'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 5173,
    host: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});