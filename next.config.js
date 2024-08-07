/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
    distDir: 'dist',
    image: {
      unoptimized: true,
    }
  };
   
 module.exports = nextConfig;