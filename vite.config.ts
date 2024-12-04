import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['lucide-react'],
  },
  server: {
    port: 3001,
    host: true,
    watch: {
      usePolling: true,
    },
  },
});