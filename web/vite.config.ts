import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@dto': '/src/dto',
      '@hooks': '/src/hooks',
      '@libs': '/src/libs',
      '@pages': '/src/pages',
      '@services': '/src/services',
      '@ui': '/src/components/ui',
    },
  },
});
