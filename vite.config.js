import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// https://motivation-of-the-day.onrender.com
// https://localhost:5000
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/updatedaytimes': {
          target: 'https://motivation-of-the-day.onrender.com',
          changeOrigin: true,
          secure: false,      
          ws: true,
      },
      '/getuser': {
        target: 'https://motivation-of-the-day.onrender.com',
        changeOrigin: true,
        secure: false,      
        ws: true,
      },
      '/signupuser': {
        target: 'https://motivation-of-the-day.onrender.com',
        changeOrigin: true,
        secure: false,      
        ws: true,
      },
      '/verifyuser': {
        target: 'https://motivation-of-the-day.onrender.com',
        changeOrigin: true,
        secure: false,      
        ws: true,
      },
      '/authenticateuser': {
        target: 'https://motivation-of-the-day.onrender.com',
        changeOrigin: true,
        secure: false,      
        ws: true,
      }
    }
  }
})
