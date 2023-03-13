/// <reference types="vitest" />
/// <reference types="vite/client" />

/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const iconsPrefix = mode === "development" ? "/src/assets" : "";
  return {
    plugins: [react()],
    resolve: {
      // Workaround to fix inline dependency of a dependency, which is the case in @ionic/react
      mainFields: ["module"]
    },
    server: {
      host: "localhost",
      port: 3000,
      strictPort: true
    },
    test: {
      globals: true,
      environment: "jsdom",
      threads: false,
      css: false
    }
  };
});
