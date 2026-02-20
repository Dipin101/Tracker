import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Make Vite resolve firebase properly
      "firebase/app": path.resolve(
        "./node_modules/firebase/app/dist/index.esm.js",
      ),
      "firebase/auth": path.resolve(
        "./node_modules/firebase/auth/dist/index.esm.js",
      ),
    },
  },
});
