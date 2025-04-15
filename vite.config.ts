import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import componentTagger from 'vite-plugin-component-tagger';

export default defineConfig({
  plugins: [
    react(),
    componentTagger({
      tag: 'data-component',
      include: ['src/**/*.tsx'],
    }),
  ],
  server: {
    port: 5173,
  },
});
