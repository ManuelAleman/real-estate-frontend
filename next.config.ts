import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tu-vecindario-bucket.s3.us-east-2.amazonaws.com',
        pathname: '/estates/**',
      },
    ],
  },
};

export default nextConfig;
