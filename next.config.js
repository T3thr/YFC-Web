/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    // ... other configurations
    
    // Disable static generation for API routes
    experimental: {
        output: 'standalone',
    },
}
module.exports = nextConfig