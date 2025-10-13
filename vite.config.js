import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,               // cho phép truy cập từ ngoài localhost
    port: 5173,
    cors: true,               // bật CORS
    strictPort: false,
    allowedHosts: ['*'],      // tạm thời cho tất cả host (bỏ qua lỗi host)
    origin: 'https://ethnographic-designingly-earnest.ngrok-free.dev', // tên miền ngrok của bạn
  },
})