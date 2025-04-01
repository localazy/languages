import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import packageJson from './package.json';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },

  plugins: [dts({ rollupTypes: true })],

  build: {
    lib: {
      entry: {
        languages: resolve(import.meta.dirname, 'src/index.ts'),
      },
      name: 'languages',
      formats: ['es'],
    },
    minify: false,
    sourcemap: true,
    rollupOptions: {
      external: [...Object.keys(packageJson.devDependencies || {})],
    },
  },
});
