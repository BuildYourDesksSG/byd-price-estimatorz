import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// base: './' makes built asset links relative, so the app works whether it's
// served from a domain root (Cloudflare / custom domain) or a GitHub Pages
// project subpath like /byd-price-estimatorz/.
export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    globals: true,
  },
})
