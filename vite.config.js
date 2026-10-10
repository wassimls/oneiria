import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Oneiria — static site build configuration.
// The build outputs a fully static bundle in ./dist that can be deployed to any
// static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, nginx, S3...).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative base so the built site also works when it is hosted in a
  // sub-directory (e.g. /oneiria/) instead of at the domain root.
  base: './',
  build: {
    target: 'es2020',
    outDir: 'dist',
    // Keep the payload lean: one CSS file, hashed JS chunks, no stray assets.
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Split the React runtime into its own long-lived chunk.
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'vendor'
          }
          return undefined
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: false,
  },
})
