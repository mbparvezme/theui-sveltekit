import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      "tailwind.config.cjs": path.resolve(__dirname, "tailwind.config.cjs"),
    },
  },
  optimizeDeps: {
    include: ["tailwind.config.cjs"],
  },
};

export default config;
