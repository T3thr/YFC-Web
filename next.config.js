/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    distDir: 'dist',
  };
   
 module.exports = {
  // Disable static export
  output: 'standalone',
};