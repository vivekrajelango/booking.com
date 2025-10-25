import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://cc0b8b81dcdf.ngrok-free.app',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
