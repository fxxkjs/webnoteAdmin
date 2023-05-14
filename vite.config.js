import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 包分析器
import { visualizer } from "rollup-plugin-visualizer";
// 按需打包
import Components from 'unplugin-vue-components/vite'
// gzip
import viteCompression from 'vite-plugin-compression';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer(),
    Components(),
    viteCompression()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:65535/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/getAdminImg': {
        target: 'http://localhost:65535/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/getAdminImg/, '/getAdminImg'),
      },
    }
  },
})
