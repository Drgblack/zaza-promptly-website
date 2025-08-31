// next.config.mjs
import createMDX from '@next/mdx';
import rehypeFixInternalLinks from './lib/rehype-fix-internal-links.js';
// If you use Sentry, keep this. If not, you can remove the import and wrapper at the bottom.
import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeFixInternalLinks],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Enable instrumentation for Sentry
  experimental: {
    instrumentationHook: true,
  },
  
  // Force new build ID to clear caches
  generateBuildId: async () => `v-${Date.now()}`,

  // MDX + app router
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Keep builds green on CI even if lint has warnings
  eslint: { ignoreDuringBuilds: true },

  // You can flip this to true if you want to ignore TS errors during builds
  typescript: { ignoreBuildErrors: false },

  async headers() {
    const securityHeaders = [
      // Security headers for all routes
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.stripe.com *.sentry.io",
          "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
          "font-src 'self' fonts.gstatic.com",
          "img-src 'self' data: blob: *.stripe.com",
          "connect-src 'self' *.stripe.com *.sentry.io api.brevo.com",
          "frame-src 'self' *.stripe.com",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
          "upgrade-insecure-requests"
        ].join('; ')
      }
    ];

    return [
      // Security headers for all routes
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Cache PDFs in /resources aggressively (immutable)
      {
        source: '/resources/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          ...securityHeaders,
        ],
      },
      // Reasonable caching for SEO feeds
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600' },
          ...securityHeaders,
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600' },
          ...securityHeaders,
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Host-based redirects for legacy domain
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'promptly.zazatechnologies.com' }],
        destination: 'https://www.zazapromptly.com/:path*',
        permanent: true,
      },
      // A few sensible canonicalizations; add your own as needed
      { source: '/learning-center', destination: '/learning-centre', permanent: true },
      { source: '/faqs', destination: '/faq', permanent: true },
      { source: '/pricing/', destination: '/pricing', permanent: true },
      { source: '/free-resources', destination: '/resources', permanent: true },
      { source: '/:locale(en|de)/free-resources', destination: '/:locale/resources', permanent: true },
    ];
  },
};

// Export with next-intl, MDX + (optionally) Sentry
const withAll = withNextIntl(withMDX(nextConfig));
export default withSentryConfig
  ? withSentryConfig(withAll, { silent: true })
  : withAll;