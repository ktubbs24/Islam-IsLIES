/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // For static site generation
    trailingSlash: true, // Ensures clean URLs
    // Add MDX support if needed:
    pageExtensions: ['tsx', 'mdx'], 
  };
  
  module.exports = nextConfig;