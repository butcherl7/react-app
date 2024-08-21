import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

/**
 * @see [配置 Vite | Vite 官方中文文档](https://cn.vitejs.dev/config/)
 * @see [Vite打包优化之缩小打包体积实现详解](https://www.jb51.net/article/271663.html)
 */
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: false,
    }),
  ],
  resolve: {
    // 配置路径别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // 按模块分包。
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
  },
});
