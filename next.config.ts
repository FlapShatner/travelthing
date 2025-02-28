import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'fqhny3wiia.ufs.sh' },
    ],
  },
};

export default nextConfig;
