import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.mentors.com.bd',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
