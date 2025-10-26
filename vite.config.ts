import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://5b676b1fab63.ngrok-free.app',
        changeOrigin: true,
        secure: false
      }
    }
  },
  optimizeDeps: {
    force: true
  }
})
