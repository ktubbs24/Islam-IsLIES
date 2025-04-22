import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path-browserify";
import { componentTagger } from "lovable-tagger";

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
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Correct alias for "src"
    },
  },
  build: {
    rollupOptions: {
      external: ["use-debounce"], // Exclude "use-debounce" from the bundle
    },
  },
}));