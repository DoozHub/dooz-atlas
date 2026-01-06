import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    fs: {
      // Allow serving files from the project root (for .md files)
      allow: ['.']
    }
  },
  // Make markdown files accessible via /docs/ path
  assetsInclude: ['**/*.md'],
})
