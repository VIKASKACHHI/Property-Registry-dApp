import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",  // 👈 forces localhost
    port: 5173,
    https: false,
    strictPort: true,
  },
});
