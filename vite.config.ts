import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  // build: {
  //   chunkSizeWarningLimit: 3000,
  // },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      // workbox: { maximumFileSizeToCacheInBytes: 3 * 1024 * 1024 },
    }),
  ],
});
