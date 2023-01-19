import { defineConfig, loadEnv, ConfigEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "REACT_") };

  return defineConfig({
    envPrefix: "REACT_",
    plugins: [react()],
    server: {
      host: "localhost",
      port: 3000,
      strictPort: true,
      cors: true,
      hmr: true,
    },
  });
};
