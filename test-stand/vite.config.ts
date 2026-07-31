import { resolve } from 'path';
import { defineConfig } from 'vite';

const root = resolve(__dirname);

export default defineConfig({
  root,
  resolve: {
    alias: {
      '@styles': resolve(root, 'styles'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        'desktop--search-activate': resolve(root, 'components', 'desktop--search-activate', 'index.html'),
      },
    },
  },
  server: {
    open: true,
  },
});
