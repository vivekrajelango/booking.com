import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://c11f23fb4819.ngrok-free.app',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
