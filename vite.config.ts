import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const viteConfig = defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler']
      }
    }),
    tsconfigPaths()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    globalSetup: './src/test/globalSetup.ts',
    setupFiles: './src/test/setup.ts',
    css: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@test': path.resolve(__dirname, 'src/test')
    }
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',

        manualChunks(id) {
          // node_modules만 분리
          if (id.includes('node_modules')) {
            // React 코어
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }

            // Markdown (큰 용량)
            if (id.includes('react-markdown') || id.includes('remark-gfm')) {
              return 'markdown'
            }

            // UI 라이브러리
            if (id.includes('@emotion') || id.includes('lucide-react')) {
              return 'ui'
            }

            // 상태/데이터 관리
            if (
              id.includes('zustand') ||
              id.includes('@tanstack/react-query') ||
              id.includes('dexie')
            ) {
              return 'data'
            }

            // 라우터
            if (id.includes('react-router')) {
              return 'router'
            }

            // 토스트
            if (id.includes('sonner')) {
              return 'sonner'
            }

            // 나머지 vendor
            return 'vendor'
          }
        }
      }
    }
  }
})

export default viteConfig
