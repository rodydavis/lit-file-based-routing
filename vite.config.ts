import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    base: "/lit-file-based-routing/",
    rollupOptions: {
      input: "index.html",
    },
  },
});
