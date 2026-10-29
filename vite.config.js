import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-futbol': {
        target: 'https://api.football-data.org',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-futbol/, '/v2'),
        headers: {
          'X-Auth-Token': '52a94a8dc8d846129b10800de5b5ff08'
        }
      }
    }
  }
})
