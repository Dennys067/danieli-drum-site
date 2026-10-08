import type { NextConfig } from "next";

// Site 100% estático: `npm run build` gera a pasta /out (usada no Cloudflare Pages).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
