import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Load all env variables starting with VITE_
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      inject({ Buffer: ['buffer', 'Buffer'] }),
      vue(),
    ],
    define: {
      // Expose all VITE_* environment variables to client
      'process.env': env
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