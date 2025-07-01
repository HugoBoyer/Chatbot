import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.css']
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      overlay: false
    }
  }
})
