/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
  };
   
 module.exports = {
  // Disable static export
  output: 'standalone',
};