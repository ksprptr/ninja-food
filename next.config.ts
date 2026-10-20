import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './src/common/lib/image-loader.ts',
  },
};

export default nextConfig;
