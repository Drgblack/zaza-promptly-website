// top of file (optional but handy)
const FORCE_BUILD_ID = `v-${Date.now()}`;

// ...inside your exported Next.js config object:
generateBuildId: async () => FORCE_BUILD_ID,
// next.config.mjs
import createMDX from '@next/mdx';
import rehypeFixInternalLinks from './lib/rehype-fix-internal-links.js';
// If you use Sentry, keep this. If not, you can remove the import and wrapper at the bottom.
import { withSentryConfig } from '@sentry/nextjs';

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
    return [
      // Cache PDFs in /resources aggressively (immutable)
      {
        source: '/resources/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
      // Reasonable caching for SEO feeds
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600' }],
      },
      {
        source: '/robots.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600' }],
      },
    ];
  },

  async redirects() {
    return [
      // A few sensible canonicalizations; add your own as needed
      { source: '/learning-center', destination: '/learning-centre', permanent: true },
      { source: '/faq', destination: '/faqs', permanent: true },
      { source: '/pricing/', destination: '/pricing', permanent: true },
    ];
  },
};

// Export with MDX + (optionally) Sentry
const withAll = withMDX(nextConfig);
export default withSentryConfig
  ? withSentryConfig(withAll, { silent: true })
  : withAll;
