import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// 配置路径解析，获取文件在磁盘上的绝对路径
const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/var.scss";'
      }
    }
  },
  resolve: {
    alias: {
      '@': pathResolve('./src/'),
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
          // if (id.includes(resolve(__dirname, '@/store/index.ts'))) {
          if (id.includes('/store/index.ts')) {
            return 'vendor'
          }
        }
      }
    },
    outDir: '../backend/web/www'
  },
  define: {

  },
  envDir: pathResolve('./src/'),
  server: {
    port: 9010,
  }
})
