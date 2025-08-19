const path = require('path');
const { withSentryConfig } = require('@sentry/nextjs');
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
      },
      {
        source: '/why-zaza-promptly',
        destination: '/why-zaza-teach',
        permanent: true,
      },
      
      // Blog redirects
      {
        source: '/blog',
        destination: '/en/blog',
        permanent: false,
      },
      {
        source: '/blog/:slug*',
        destination: '/en/blog/:slug*',
        permanent: false,
      },
      
      // Main page redirects to localized versions
      {
        source: '/about-founder',
        destination: '/en/about-founder',
        permanent: false,
      },
      {
        source: '/support',
        destination: '/en/support',
        permanent: false,
      },
      {
        source: '/promptly-pricing',
        destination: '/en/promptly-pricing',
        permanent: false,
      },
      {
        source: '/faqs',
        destination: '/en/faqs',
        permanent: false,
      },
      {
        source: '/free-resources',
        destination: '/en/free-resources',
        permanent: false,
      },
      {
        source: '/contact',
        destination: '/en/contact',
        permanent: false,
      },
      {
        source: '/privacy',
        destination: '/en/privacy',
        permanent: false,
      },
      {
        source: '/terms',
        destination: '/en/terms',
        permanent: false,
      },
      {
        source: '/products',
        destination: '/en/products',
        permanent: false,
      },
      
      // Product page redirects
      {
        source: '/promptly',
        destination: '/en/promptly',
        permanent: false,
      },
      {
        source: '/teach',
        destination: '/en/teach',
        permanent: false,
      },
      {
        source: '/autoplanner',
        destination: '/en/autoplanner',
        permanent: false,
      },
      {
        source: '/notably',
        destination: '/en/notably',
        permanent: false,
      },
      {
        source: '/spark',
        destination: '/en/spark',
        permanent: false,
      },
      {
        source: '/looop',
        destination: '/en/looop',
        permanent: false,
      },
      {
        source: '/knowledgecore',
        destination: '/en/knowledgecore',
        permanent: false,
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
  withNextIntl(withMDX(nextConfig)),
  sentryWebpackPluginOptions
);
