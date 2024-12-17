import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      template: 'treemap',
      open: true,
      gzipSize: true,
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@auth': path.resolve(__dirname, './src/auth'),
      '@features': path.resolve(__dirname, './src/features'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  preview: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'esnext',
    minify: 'esbuild',
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      external: ['gray-matter'],
      output: {
        manualChunks: (id) => {
          // Core vendor dependencies
          if (id.includes('node_modules')) {
            // React Core
            if (id.includes('react/') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            // Routing
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            // UI Components
            if (id.includes('@headlessui')) {
              return 'vendor-headless';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }

            // Charts - Split Recharts more granularly
            if (id.includes('recharts')) {
              if (id.includes('/lib/chart/')) {
                const chartType = id.split('/lib/chart/')[1]?.split('.')[0];
                return `chart-${chartType || 'base'}`;
              }
              if (id.includes('/lib/component/')) {
                const component = id.split('/lib/component/')[1]?.split('.')[0];
                return `chart-component-${component || 'base'}`;
              }
              if (id.includes('/lib/shape/')) {
                return 'chart-shapes';
              }
              return 'chart-utils';
            }

            // D3 Libraries
            if (id.includes('d3-scale')) return 'vendor-d3-scale';
            if (id.includes('d3-shape')) return 'vendor-d3-shape';
            if (id.includes('d3-array')) return 'vendor-d3-array';
            if (id.includes('d3')) return 'vendor-d3-core';

            // Forms and Validation
            if (id.includes('react-hook-form')) return 'vendor-forms';
            if (id.includes('zod')) return 'vendor-validation';
            
            // Auth and API
            if (id.includes('@supabase')) return 'vendor-auth';
            
            // State Management
            if (id.includes('zustand')) return 'vendor-state';
            if (id.includes('@tanstack/query')) return 'vendor-query';

            // Utils
            if (id.includes('date-fns')) return 'vendor-date';
            if (id.includes('i18next')) return 'vendor-i18n';
            
            // Third party utils
            if (id.includes('lodash')) return 'vendor-lodash';
            if (id.includes('uuid')) return 'vendor-uuid';
            
            return 'vendors-other';
          }

          // Application code
          if (id.includes('/pages/')) {
            const section = id.includes('/SuperAdmin/') ? 'admin' :
                          id.includes('/ShelterAdmin/') ? 'shelter' :
                          id.includes('/Participant/') ? 'participant' :
                          id.includes('/Donor/') ? 'donor' : 'public';
            return `page-${section}`;
          }

          if (id.includes('/features/')) {
            const feature = id.split('/features/')[1].split('/')[0];
            return `feature-${feature}`;
          }

          if (id.includes('/components/')) {
            if (id.includes('/ui/')) return 'components-ui';
            if (id.includes('/shared/')) return 'components-shared';
            if (id.includes('/forms/')) return 'components-forms';
            if (id.includes('/charts/')) return 'components-charts';
            return 'components-other';
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@headlessui/react',
      'lucide-react',
      'zustand',
      '@supabase/supabase-js',
      'gray-matter'
    ],
    esbuildOptions: {
      mainFields: ['module', 'main'],
      format: 'esm'
    }
  },
  base: './',
  commonjsOptions: {
    transformMixedEsModules: true
  }
});