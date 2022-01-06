import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/lit-file-based-routing/",
  build: {
    rollupOptions: {
      input: "index.html",
    },
  },
});
