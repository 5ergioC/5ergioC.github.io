import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        // Split rarely-changing vendor code into its own content-hashed chunk
        // so editing project data/UI doesn't bust the react+gsap cache for
        // repeat visitors.
        manualChunks: {
          react: ['react', 'react-dom'],
          gsap: ['gsap'],
        },
      },
    },
  },
})
