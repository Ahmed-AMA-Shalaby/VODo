import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
  resolve: {
    alias: {
      '@/app': path.resolve(__dirname, './src/app'),
      '@/pages': path.resolve(__dirname, './src/app/(pages)'),
      '@/assets': path.resolve(__dirname, './src/shared/assets'),
      '@/components': path.resolve(__dirname, './src/shared/components'),
      '@/models': path.resolve(__dirname, './src/shared/models'),
      '@/services': path.resolve(__dirname, './src/shared/services'),
      '@/utils': path.resolve(__dirname, './src/shared/utils'),
      '@/tests': path.resolve(__dirname, './tests'),
    },
  },
});
