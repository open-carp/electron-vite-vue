import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electronVite from './plugins/electron-vite/index'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),electronVite()],
})
