/// <reference types="vitest" />
import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import { Stage } from "./plugins/stage"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    Stage({
      stage: process.env.stage ?? "Stable",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "vue-i18n": "vue-i18n/dist/vue-i18n.esm-bundler.js",
    },
  },
  test: {
    environment: "jsdom",
    reporters: ["html", "default"],
    outputFile: "./dist/test/report.html",
    coverage: {
      reporter: ["html", "json", "text"],
      provider: "v8",
      enabled: true,
      reportsDirectory: "./dist/test/coverage",
    },
    deps: {
      interopDefault: true,
      moduleDirectories: ["node_modules"],
    },
  },
})
