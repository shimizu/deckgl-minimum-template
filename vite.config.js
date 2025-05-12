import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";



//https://react.dev/learn/react-compiler
const ReactCompilerConfig = {
  target:'19' //react 19
  
  // 「opt-in」モードにする設定
  //compilationMode: "annotation",
};


// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    wasm(),
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler", ReactCompilerConfig],
        ],
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit   : 1600,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          deckgl_core: ['@deck.gl/core'],
          deckgl_react: ['@deck.gl/react'],
        }
      }
    }
  }
})
