import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/produtos': {
        target: 'https://app.econverse.com.br',
        changeOrigin: true,
        rewrite: () =>
          '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json',
      },
    },
  },
})
