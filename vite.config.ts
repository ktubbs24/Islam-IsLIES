import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
// ▼▼▼ ADD THIS NEW IMPORT ▼▼▼
import { imageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      'e9ddcd97-b549-4279-8af4-932da278d7d2.lovableproject.com'
    ]
  },
  plugins: [
    react(),
    // ▼▼▼ ADD THE NEW OPTIMIZER HERE (AFTER REACT, BEFORE COMPONENT TAGGER) ▼▼▼
    imageOptimizer({
      jpg: { quality: 70 },
      png: { quality: 70 },
      webp: { lossless: false },
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));