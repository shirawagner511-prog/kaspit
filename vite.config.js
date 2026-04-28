import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/kaspit/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'firebase': [
            'firebase/app',
            'firebase/auth',
            'firebase/firestore',
          ],
          'react-vendor': [
            'react',
            'react-dom',
          ],
          'i18n': [
            'i18next',
            'react-i18next',
          ],
        },
      },
    },
  },
});
