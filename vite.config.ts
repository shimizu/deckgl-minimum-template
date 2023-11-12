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
  build:{
    rollupOptions:{
      output:{
        manualChunks : {
          react:['react','react-dom'],
          deckgl_core: ['@deck.gl/core/typed'],
          deckgl_react: ['@deck.gl/react/typed'],
        }
      }
    }
  }
})
