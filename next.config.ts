import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"], // ✅ Allow GitHub avatars
  },
};

export default nextConfig;
