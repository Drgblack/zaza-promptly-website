import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnalyticsProvider from "../components/analytics/AnalyticsProvider";
import { ThemeProvider } from "../providers/ThemeProvider";
import { MotionProvider } from "../lib/motion";
// import PageTransition from "../components/layout/PageTransition";  // ⟵ remove

// Initialize Sentry configs safely
if (typeof window !== 'undefined') {
  import('../../sentry.client.config').catch(() => {});
} else {
  import('../../sentry.server.config').catch(() => {});
}

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zazapromptly.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Zaza Promptly – AI for Teacher Reports & Parent Communication",
  description:
    "Save hours with Zaza Promptly – hallucination-safe AI for teachers. Write reports, parent messages, and emails faster without losing empathy.",
  keywords:
    "AI tool for teachers, AI for teacher reports, AI for parent communication, safe AI for teachers, hallucination-safe AI, teacher productivity apps, report writing for teachers AI, parent email generator for teachers, reduce teacher workload with AI, GDPR compliant AI for teachers, best AI tools for teachers 2025",
  authors: [{ name: "Zaza Technologies" }],
  creator: "Zaza Technologies",
  publisher: "Zaza Technologies",
  robots: "index, follow",
  icons: [
    { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
    { rel: "icon", url: "/favicon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
    { rel: "icon", url: "/favicon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.svg", sizes: "180x180" },
    { rel: "manifest", url: "/site.webmanifest" },
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "Promptly Blog RSS Feed" }],
      "application/feed+json": [{ url: "/feed.json", title: "Promptly Blog JSON Feed" }],
    },
  },
  openGraph: {
    siteName: "Promptly",
    type: "website",
    locale: "en_GB",
    title: "Zaza Promptly – AI Tool for Teacher Reports & Parent Communication",
    description:
      "Save hours with Zaza Promptly – the hallucination-safe AI built for teachers. Write reports, parent messages, and professional emails faster, without losing empathy or trust.",
    url: baseUrl,
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Promptly - AI Tools for Teachers" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zazapromptly",
    creator: "@zazapromptly",
    title: "Zaza Promptly – AI Tool for Teacher Reports & Parent Communication",
    description:
      "Save hours with Zaza Promptly – the hallucination-safe AI built for teachers. Write reports, parent messages, and professional emails faster, without losing empathy or trust.",
    images: ["/og-default.png"],
  },
  verification: { google: undefined },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="preload"
          href="/fonts/GeistVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <script
  dangerouslySetInnerHTML={{
    __html: `(() => {
      try {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()));
        }
        if (window.caches) {
          caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
        }
      } catch {}
    })();`,
  }}
/>
      </head>
      <ThemeProvider defaultTheme="system">
        <MotionProvider>
          <AnalyticsProvider>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white dark:bg-slate-800 text-black dark:text-white px-4 py-2 rounded-md font-medium shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Skip to main content
              </a>
              <Header />
              {/* ⟵ replace PageTransition with a plain main */}
              <main id="main-content" role="main" className="flex-1">
                {children}
              </main>
              <Footer />
            </body>
          </AnalyticsProvider>
        </MotionProvider>
      </ThemeProvider>
    </html>
  );
}

