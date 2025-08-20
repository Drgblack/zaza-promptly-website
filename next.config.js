const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },

  async redirects() {
    return [
      {
        source: '/pricing',
        destination: '/promptly-pricing',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/about-founder',
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig;