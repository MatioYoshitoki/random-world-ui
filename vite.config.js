import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-import.d.ts',
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        }),
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ['ep']
        }),
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      dts: 'src/components.d.ts'
    }),
    Icons({
      autoInstall: true
    }),
    Pages({
      pagesDir: [{ dir: 'src/views', baseRoute: '' }],
      exclude: ['**/components/*.vue']
    }),
    Layouts({
      layoutsDirs: 'src/layout',
      defaultLayout: 'index'
    })
  ],
  server: {
    host: '0.0.0.0' // IP配置，支持从IP启动
  },
  build: {
    target: 'es2015'
  },
  rollupOptions: {
    output: {
      // Static resource classification and packaging
      chunkFileNames: 'assets/js/[name]-[hash].js',
      entryFileNames: 'assets/js/[name]-[hash].js',
      assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
    }
  }
})
