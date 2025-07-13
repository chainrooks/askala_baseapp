import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup'
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    { enforce: 'pre', ...mdx() },
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
  ],
  resolve: {
    alias: {
      "declarations": fileURLToPath(
        new URL("../declarations", import.meta.url)
      ),
      "@": fileURLToPath(new URL("./src", import.meta.url))
    },
    dedupe: ['@dfinity/agent'],
  },
});