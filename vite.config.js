import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "url"

import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3000,
    strictPort: true, // Will fail if port 3000 is in use
    proxy: {
      '/api': {
        target: 'https://fst-gateway-service-production.up.railway.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})