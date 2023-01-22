import { defineConfig, loadEnv, ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";

export default ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "REACT_") };

  return defineConfig({
    envPrefix: "REACT_",
    plugins: [react(), ssr()],
    server: {
      host: "localhost",
      port: 3000,
      strictPort: true,
      cors: true,
      hmr: true,
    },
  });
};
