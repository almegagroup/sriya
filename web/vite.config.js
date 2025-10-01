import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [react()],
    server: isDev
      ? {
          proxy: {
            "/api": {
              target: "http://127.0.0.1:5001",
              changeOrigin: true,
              rewrite: (p) =>
                p.replace(/^\/api/, "/demo-sriya/asia-south1/api"),
            },
          },
        }
      : undefined,
  };
});
