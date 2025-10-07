import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/assets/js/",
  build: {
    outDir: "../_site/assets/js",
    emptyOutDir: true,
    rollupOptions: {
      input: "./mouse-avoid-game.jsx",
      output: {
        entryFileNames: "bundle.js",
      },
    },
  },
});
