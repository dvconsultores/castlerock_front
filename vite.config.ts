import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject'
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  plugins: [
    inject({ Buffer: ['buffer', 'Buffer'] }),
    vue(),
  ],
  define: {
    'process.env': {
      VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY,
      VITE_FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN,
      VITE_FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID,
      VITE_FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET,
      VITE_FIREBASE_MESSAGING_SENDER_ID: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      VITE_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID,
      VITE_NEAR_NETWORK: process.env.VITE_NEAR_NETWORK,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  optimizeDeps: {
    include: ['vuetify'],
  },
  build: {
    chunkSizeWarningLimit: 2000, // Raise the chunk size limit to avoid warnings
    sourcemap: false, // Disable source maps for faster builds
    target: 'es2020', // Optimize for modern browsers
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000
  }
})