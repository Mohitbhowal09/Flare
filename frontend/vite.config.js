import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist'
  },
  // Tell Vite where to find index.html
  root: '.',  // This tells Vite to look in the current directory
})
