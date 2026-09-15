import type { NextConfig } from "next";

/**
 * Default: standard Next.js build (Vercel / Node hosting).
 * GitHub Pages: set STATIC_EXPORT=true (and optionally BASE_PATH=/repo-name)
 * to emit a fully static site into ./out with unoptimized images.
 *
 * Note: `images.unoptimized` does not prefix `basePath` on <Image> src.
 * Public assets must go through `withBasePath()` / NEXT_PUBLIC_BASE_PATH.
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isStaticExport ? basePath : "",
  },
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath: basePath || undefined,
        assetPrefix: basePath || undefined,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
