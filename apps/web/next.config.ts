import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@ekvir/ui", "@ekvir/config"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["@ekvir/ui"],
  },
};

export default nextConfig;
