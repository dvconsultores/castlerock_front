import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig(({ mode }) => {
  // Load only VITE_-prefixed env variables (security: prevents non-public vars leaking to client)
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    base: env.VITE_BASE_URL || '/', // Set the base URL from the environment variable
    plugins: [
      vue(),
      nodePolyfills({
        include: ['buffer'],
        globals: {
          Buffer: true,
          global: true,
          process: true
        }
      })
    ],
    optimizeDeps: {
      include: ['buffer', 'vuetify'],
      esbuildOptions: {
        define: {
          global: 'globalThis'
        }
      }
    },
    define: {
      global: 'window',
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 2000,
      sourcemap: false,
      target: 'es2020',
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
  }
})