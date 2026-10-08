import type { NextConfig } from "next";

// STATIC_EXPORT=1 gera uma versão 100% estática em /out (hospedagem simples ou pré-visualização).
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport && { output: "export", images: { unoptimized: true } }),
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
