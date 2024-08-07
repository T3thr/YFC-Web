/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
    distDir: 'dist',
    images: {
      unoptimized: true,
    }
  };
   
 module.exports = nextConfig;