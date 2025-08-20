const path = require('path');
const createNextIntlPlugin = require('next-intl/plugin');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      'localhost',
      'zazatechnologies.com',
      'www.zazatechnologies.com',
      'images.unsplash.com',
      'via.placeholder.com',
      'picsum.photos'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 31536000, // 1 year
    unoptimized: process.env.NODE_ENV === 'development'
  },

  // Experimental features for performance
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'framer-motion',
      'date-fns'
    ]
  },

  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },

  async redirects() {
    return [
      // Original redirects
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

// Temporarily disable internationalization to fix routing issues
module.exports = withMDX(nextConfig);