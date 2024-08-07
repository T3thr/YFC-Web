/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'standalone',
    distDir: 'dist',
    image: {
      unoptimized: true,
    }
  };
   
 module.exports = nextConfig;