import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import QRBorderPlugin from "qr-border-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
