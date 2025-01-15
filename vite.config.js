import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your Express backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
