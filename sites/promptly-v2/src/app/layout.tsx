import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnalyticsProvider from "../components/analytics/AnalyticsProvider";
import CookieBanner from "../components/marketing/CookieBanner";
import ZaraOrbProvider from "../components/ui/ZaraOrbProvider";

// Initialize Sentry configs safely
if (typeof window !== 'undefined') {
  // Client-side
  import('../../sentry.client.config').catch(() => {
    // Silently fail if Sentry is not configured
  });
} else {
  // Server-side
  import('../../sentry.server.config').catch(() => {
    // Silently fail if Sentry is not configured
  });
}

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Promptly - AI Comments Done in Seconds",
  description: "Transform your teaching with AI-powered comment generation. Save hours every week while maintaining the quality your students deserve.",
  keywords: "AI comments, teacher tools, education technology, automated feedback, teaching assistant",
  authors: [{ name: "Zaza Technologies" }],
  creator: "Zaza Technologies",
  publisher: "Zaza Technologies",
  robots: "index, follow",
  icons: [
    { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
    { rel: 'icon', url: '/favicon-32x32.svg', sizes: '32x32', type: 'image/svg+xml' },
    { rel: 'icon', url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.svg', sizes: '180x180' },
    { rel: 'manifest', url: '/site.webmanifest' },
  ],
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [
        { url: '/feed.xml', title: 'Promptly Blog RSS Feed' },
      ],
      'application/feed+json': [
        { url: '/feed.json', title: 'Promptly Blog JSON Feed' },
      ],
    },
  },
  openGraph: {
    siteName: 'Promptly',
    type: 'website',
    locale: 'en_GB',
    title: 'Promptly - AI Comments Done in Seconds',
    description: 'Transform your teaching with AI-powered comment generation. Save hours every week while maintaining the quality your students deserve.',
    url: baseUrl,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Promptly - AI Tools for Teachers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zazapromptly',
    creator: '@zazapromptly',
    title: 'Promptly - AI Comments Done in Seconds',
    description: 'Transform your teaching with AI-powered comment generation. Save hours every week while maintaining the quality your students deserve.',
    images: ['/og-default.png'],
  },
  verification: {
    google: undefined, // Add Google Search Console verification ID when available
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <AnalyticsProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        >
          {/* Skip to content link for accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded-md font-medium shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <ZaraOrbProvider />
        </body>
      </AnalyticsProvider>
    </html>
  );
}
