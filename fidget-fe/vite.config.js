import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/npmconfig/
export default defineConfig({
  plugins: [react()],
})
