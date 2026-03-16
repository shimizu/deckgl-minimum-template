import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";


// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    wasm(),
    react(),
  ],
  build: {
    chunkSizeWarningLimit   : 1600,
    sourcemap: true,
    rollupOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react',
              test: /node_modules[\\/]react/,
              priority: 20,
            },
            {
              name: 'deckgl',
              test: /node_modules[\\/]@deck\.gl/,
              priority: 10,
            },
          ],
        },
      }
    }
  }
})
