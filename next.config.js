/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
    distDir: 'dist',
    image: {
      unoptimized: true,
    }
  };
   
 module.exports = nextConfig;