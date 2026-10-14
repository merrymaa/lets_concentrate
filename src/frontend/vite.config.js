import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Фронт ходит по относительным путям /api/...
      // dev: /api/login -> rewrite -> http://localhost:8000/login
      // (бэк работает без префикса, см. src/backend/api/routes.py)
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
