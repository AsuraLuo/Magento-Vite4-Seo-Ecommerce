import { defineConfig, loadEnv, ConfigEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";

export default ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "REACT_") };

  return defineConfig({
    envPrefix: "REACT_",
    plugins: [react(), ssr()],
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "./components"),
        "@graphql": path.resolve(__dirname, "./graphql"),
        "@hooks": path.resolve(__dirname, "./hooks"),
        "@store": path.resolve(__dirname, "./store"),
        "@types": path.resolve(__dirname, "./types"),
      },
    },
    server: {
      host: "localhost",
      port: 3000,
      strictPort: true,
      cors: true,
      hmr: true,
    },
  });
};
