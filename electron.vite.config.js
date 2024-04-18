import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      minify: true,
      lib: {
        entry: [
          'src/main/index.js',
          'src/main/preparation.js',
          'src/main/scripts.js',
          'src/main/update.js',
          'src/main/events.js',
        ]
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      minify: true
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      react()
    ],
    build: {
      minify: true
    }
  }
})