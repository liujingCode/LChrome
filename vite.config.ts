import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 9091,
    host: true,
  },
  build: {
    outDir: 'lchrome_dist',
    rollupOptions: {
      input: {
        newtab: resolve(__dirname, 'newtab.html'),
        popup: resolve(__dirname, 'popup.html'),
        background: resolve(__dirname, 'background.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const tempList = id.toString().split('node_modules/')[1].split('/');
            if (['element-plus', '@vue'].includes(tempList[0])) {
              return '_' + tempList[0];
            }
            return '__vendor';
          }
        },
        chunkFileNames: 'static/js/[hash].js',
        entryFileNames: 'chrome/js/[name].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
});
