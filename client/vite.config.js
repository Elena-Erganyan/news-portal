import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // generate manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: "./src/main.jsx",
      output: {
        entryFileNames: "assets/[name]_v1.js"
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      }
    },
});
