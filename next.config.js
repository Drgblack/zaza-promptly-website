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
      '@radix-ui/react-icons',
      'framer-motion',
      'date-fns'
    ]
  },

  // Turbopack configuration (moved out of experimental as it's now stable)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js'
      }
    }
  },

  // Output standalone for better performance
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },

  // Bundle analyzer for development
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        const { BundleAnalyzerPlugin } = require('@next/bundle-analyzer')();
        config.plugins.push(new BundleAnalyzerPlugin());
      }
      return config;
    }
  }),

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
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
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
      },
      {
        source: '/(favicon|apple-touch|og-image|manifest)\\.(ico|png|jpg|jpeg|svg|webmanifest)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400' // 24 hours
          }
        ]
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
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
      {
        source: '/blog/zaza-promptly-official-launch',
        destination: '/blog/teach-thinking-student-centred-problem-solving',
        permanent: true,
      },

      // Reverse redirects - redirect /en/* back to root paths since we disabled i18n
      {
        source: '/en/blog',
        destination: '/blog',
        permanent: false,
      },
      {
        source: '/en/blog/:slug*',
        destination: '/blog/:slug*',
        permanent: false,
      },
      {
        source: '/en/about-founder',
        destination: '/about-founder',
        permanent: false,
      },
      {
        source: '/en/support',
        destination: '/support',
        permanent: false,
      },
      {
        source: '/en/promptly-pricing',
        destination: '/promptly-pricing',
        permanent: false,
      },
      {
        source: '/en/faqs',
        destination: '/faqs',
        permanent: false,
      },
      {
        source: '/en/free-resources',
        destination: '/free-resources',
        permanent: false,
      },
      {
        source: '/en/contact',
        destination: '/contact',
        permanent: false,
      },
      {
        source: '/en/privacy',
        destination: '/privacy',
        permanent: false,
      },
      {
        source: '/en/terms',
        destination: '/terms',
        permanent: false,
      },
      {
        source: '/en/products',
        destination: '/products',
        permanent: false,
      },
      {
        source: '/en/promptly',
        destination: '/promptly',
        permanent: false,
      },
      {
        source: '/en/teach',
        destination: '/teach',
        permanent: false,
      },
      {
        source: '/en/autoplanner',
        destination: '/autoplanner',
        permanent: false,
      },
      {
        source: '/en/notably',
        destination: '/notably',
        permanent: false,
      },
      {
        source: '/en/spark',
        destination: '/spark',
        permanent: false,
      },
      {
        source: '/en/looop',
        destination: '/looop',
        permanent: false,
      },
      {
        source: '/en/knowledgecore',
        destination: '/knowledgecore',
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
  withMDX(nextConfig), // Temporarily disabled withNextIntl to fix 404 routing issues
  sentryWebpackPluginOptions
);