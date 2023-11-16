import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin({ relativeCSSInjection: true }),
  ],
  build: {
    // generate manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: "./src/main.jsx",
      output: {
        entryFileNames: "assets/[name]_v2.js"
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      }
    },
});
