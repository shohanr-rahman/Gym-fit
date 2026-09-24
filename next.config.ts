import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
    ],
  },

  basePath: "/Gym-fit",
  assetPrefix: "/Gym-fit/",
};

export default nextConfig;