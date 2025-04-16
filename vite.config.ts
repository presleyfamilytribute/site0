
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'all',
      '513ba5e0-19d8-421b-9975-f1f700b808bc-00-1sxuhj0sx9ws2.picard.replit.dev'
    ],
  },
});
