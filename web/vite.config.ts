import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import compression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),

    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    ...(mode === 'analyze' ? [visualizer()] : []),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    host: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:7573',
        changeOrigin: true,
      },
      '/uaa': {
        target: 'http://localhost:7573',
        changeOrigin: true,
      },
      '/oauth2': {
        target: 'http://localhost:7573',
        changeOrigin: true,
      },
      '/login/oauth2': {
        target: 'http://localhost:7573',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          antd: ['antd', '@ant-design/x', '@ant-design/icons'],
          utils: ['axios', 'dayjs', 'lodash-es'],
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
}))
