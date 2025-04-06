import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { URL } from 'url';

export default defineConfig(async () => ({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(new URL('.', import.meta.url).pathname, "client", "src"),
      "@shared": path.resolve(new URL('.', import.meta.url).pathname, "shared"),
      "@assets": path.resolve(new URL('.', import.meta.url).pathname, "attached_assets"),
    },
  },
  root: path.resolve(new URL('.', import.meta.url).pathname, "client"),
  build: {
    outDir: path.resolve(new URL('.', import.meta.url).pathname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
}));
