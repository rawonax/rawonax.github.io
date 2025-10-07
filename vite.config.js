import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: ".", // 루트 기준
  base: "/assets/js/",
  build: {
    outDir: "_site/assets/js",
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "assets/js/main.jsx"), // ✅ React 엔트리 지정
      output: {
        entryFileNames: "bundle.js", // ✅ 빌드 결과를 bundle.js로 지정
      },
    },
  },
});
