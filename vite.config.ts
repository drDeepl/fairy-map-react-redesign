import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vite.dev/config/

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    server: {
      proxy: {
        "/api": {
          target: "https://api.vleep-deep.ru",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react()],
    build: {
      target: "ES2022",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};
