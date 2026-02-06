import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If you deploy under a subpath (like /design-tools/), set base: "/design-tools/"
// Otherwise leave it as "/" (default).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    sourcemap: true,
  },
});
