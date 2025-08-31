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
    remotePatterns: [
      // Add any remote image hosts you use for blog/resources OGs
      { protocol: 'https', hostname: 'images.prismic.io' },
      { protocol: 'https', hostname: 'cdn.zazateach.com' },
    ],
  },

  // Keep builds green on CI even if lint has warnings
  eslint: { ignoreDuringBuilds: true },

  // You can flip this to true if you want to ignore TS errors during builds
  typescript: { ignoreBuildErrors: false },

  async headers() {
    // Update the connect-src/img-src/frame-src to match any new vendors you add.
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://static.cloudflareinsights.com",
      "connect-src 'self' https://api.brevo.com https://api.stripe.com https://r.stripe.com https://o.ingest.sentry.io https://*.ingest.sentry.io",
      "frame-src https://js.stripe.com",
      "form-action 'self'",
      "report-uri /api/csp-report"
    ].join('; ');
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: "accelerometer=(), autoplay=(), camera=(), geolocation=(), microphone=(), payment=(), usb=()" },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
          { key: 'Content-Security-Policy-Report-Only', value: csp }
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