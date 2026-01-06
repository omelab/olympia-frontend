/// vitest.config.mts
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    setupFiles: ['./vitest-setup.ts'],
    coverage: {
      include: ['src/**/*'],
      exclude: ['**/*.d.ts'],
    },
    env: loadEnv('', process.cwd(), ''),
  },
});
