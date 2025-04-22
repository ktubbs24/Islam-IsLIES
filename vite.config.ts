import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Allow IPv6 and IPv4 connections
    port: 8080, // Set the development server port
    allowedHosts: [
      "e9ddcd97-b549-4279-8af4-932da278d7d2.lovableproject.com", // Allow this specific host
    ],
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(), // Use componentTagger only in development mode
  ].filter(Boolean), // Filter out falsy plugins
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias "@" to the "src" directory
    },
  },
  build: {
    rollupOptions: {
      external: ["use-debounce"], // Exclude "use-debounce" from the bundle
    },
  },
}));