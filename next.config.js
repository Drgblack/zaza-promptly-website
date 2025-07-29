const path = require('path');
const { withSentryConfig } = require('@sentry/nextjs');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      'localhost',
      'zazapromptly.com',
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
      '@radix-ui/react-icons'
    ]
  },

  // Headers for caching and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
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
    ]
  },
};

// Sentry configuration
const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  
  // Only upload source maps in production
  include: process.env.NODE_ENV === 'production' ? '.next' : undefined,
  ignore: ['node_modules', 'webpack.config.js'],
  
  // Disable source map uploading in development
  dryRun: process.env.NODE_ENV !== 'production',
};

module.exports = withSentryConfig(
  withMDX(nextConfig),
  sentryWebpackPluginOptions
);
