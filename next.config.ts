import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'placehold.co',

      },
      // You can keep the wildcard pattern if needed
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
    dangerouslyAllowSVG: true
  }
};

export default nextConfig;