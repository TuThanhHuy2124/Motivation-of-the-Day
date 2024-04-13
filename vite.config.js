import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/updatedaytimes': {
          target: 'https://localhost:5000',
          changeOrigin: true,
          secure: false,      
          ws: true,
      },
      '/getuser': {
        target: 'https://localhost:5000',
        changeOrigin: true,
        secure: false,      
        ws: true,
      },
      '/signupuser': {
        target: 'https://localhost:5000',
        changeOrigin: true,
        secure: false,      
        ws: true,
      },
      '/verifyuser': {
        target: 'https://localhost:5000',
        changeOrigin: true,
        secure: false,      
        ws: true,
      },
      '/authenticateuser': {
        target: 'https://localhost:5000',
        changeOrigin: true,
        secure: false,      
        ws: true,
      }
    }
  }
})
