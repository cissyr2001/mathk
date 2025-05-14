import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Check if we are building for production
  const isProduction = mode === "production";

  // Replace 'YOUR_REPO_NAME' with the actual name of your GitHub repository
  // If deploying to https://YOUR_USERNAME.github.io/ or a custom domain, use '/'
  const base = isProduction ? "/YOUR_REPO_NAME/" : "/";

  return {
    plugins: [react(), tailwindcss()],
    // Set the base path for the application
    base: base,

    build: {
      // The output directory for the static files (defaults to 'dist')
      outDir: "dist",
      // Ensure relative paths are used in the production build
      // This is often helpful for static hosting
      assetsDir: "assets", // You can configure the assets subdirectory name
    },
  };
});
