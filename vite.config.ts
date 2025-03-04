import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      template: "treemap",
      open: true,
      gzipSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@auth": path.resolve(__dirname, "./src/auth"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@transactions": path.resolve(__dirname, "./src/components/transactions"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: [
      "localhost", 
      "*.replit.dev", 
      "*.repl.co", 
      "*.repl.it",
      "*.riker.replit.dev",
      ".replit.dev",
      ".repl.co",
      ".repl.it"
    ],
    watch: {
      usePolling: true,
      interval: 100,
    },
    hmr: {
      overlay: false,
    },
  },
  preview: {
    port: 5173,
    host: true,
    allowedHosts: [
      "localhost", 
      "*.replit.dev", 
      "*.repl.co", 
      "*.repl.it",
      "*.riker.replit.dev",
      ".replit.dev",
      ".repl.co",
      ".repl.it"
    ],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    target: "esnext",
    minify: "esbuild",
    chunkSizeWarningLimit: 3000,
    esbuild: {
      logOverride: {
        "duplicate-object-key": "silent",
        "this-is-undefined-in-esm": "silent",
      },
      logLevel: "warning",
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-router": ["react-router-dom"],
          "vendor-ui": ["@headlessui/react"],
          "vendor-icons": ["lucide-react"],
          "vendor-forms": ["react-hook-form", "@hookform/resolvers"],
          "vendor-state": ["zustand"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-auth": ["@supabase/supabase-js"],
          "vendor-utils": ["date-fns", "i18next"],
          "vendor-cytoscape": ["cytoscape"],
          "vendor-katex": ["katex"],
          "vendor-charts": [
            "@/features/shared/analytics/charts/LineChart",
            "@/features/dashboard/shared/widgets/charts/LineChart",
            "@/components/charts/LineChart",
            "recharts",
            "chart.js",
            "react-chartjs-2",
          ],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@headlessui/react",
      "lucide-react",
      "zustand",
      "@supabase/supabase-js",
      "react-hot-toast",
      "react-scroll",
    ],
  },
  assetsInclude: ["**/*.md"],
});
