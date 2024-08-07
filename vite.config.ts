import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify(), svgLoader()],
  publicDir: path.join(__dirname, 'src', 'assets'),
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@layouts': path.resolve(__dirname, './src/components/layouts'),
      '@locales': path.resolve(__dirname, './src/locales'),
      "@views": path.resolve(__dirname, './src/views'),
      "@stores": path.resolve(__dirname, './src/stores'),
    },
  },
})
