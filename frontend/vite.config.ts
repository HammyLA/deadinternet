import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    port: 5173,
  },
})
