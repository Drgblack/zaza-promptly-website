import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnalyticsProvider from "../components/analytics/AnalyticsProvider";
import { ThemeProvider } from "../providers/ThemeProvider";
import { MotionProvider } from "../lib/motion";
import LoadingIndicator from "../components/LoadingIndicator";
import ZaraOrbProvider from "../components/ui/ZaraOrbProvider";
// import LinkDiagnostic from "../components/LinkDiagnostic";

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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${baseUrl}/#organization`,
  name: "Zaza Technologies",
  url: baseUrl,
  logo: `${baseUrl}/images/logo/zaza-logo.png`,
  description: "Educational technology company providing AI tools for teachers, including Promptly for parent communication and report writing.",
  foundingDate: "2023",
  founder: {
    "@type": "Person",
    name: "Dr. Greg Blackburn",
    jobTitle: "PhD, Professional Education"
  },
  sameAs: [
    "https://twitter.com/zazapromptly",
    "https://www.linkedin.com/company/zaza-technologies"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@zazatechnologies.com",
    availableLanguage: ["English", "German", "French", "Spanish", "Italian"]
  }
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  name: "Promptly - AI Tools for Teachers",
  url: baseUrl,
  publisher: {
    "@id": `${baseUrl}/#organization`
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${baseUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: "%s | Promptly",
    default: "AI for Teacher Reports & Parent Communication | Safe AI Writing Helper for Teachers"
  },
  description:
    "Save hours with Promptly – hallucination-safe AI for teacher report writing and parent communication. GDPR-compliant AI writing assistant designed by educators, trusted by 12,000+ teachers.",
  keywords:
    "ai for teacher report writing, teacher report comments helper, safe ai for parent communication, teacher productivity ai, parent email generator for teachers, gdpr compliant ai for schools, hallucination-safe ai for education, ai writing assistant for educators",
  authors: [{ name: "Dr. Greg Blackburn", url: `${baseUrl}/about` }],
  creator: "Zaza Technologies",
  publisher: "Zaza Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png?v=4',
    shortcut: '/icon.png?v=4',
    apple: '/apple-icon.png?v=4',
  },
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
    images: [{ url: "/images/logo/zaza-logo.png", width: 512, height: 512, alt: "Zaza Technologies - Promptly AI Tools for Teachers" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zazapromptly",
    creator: "@zazapromptly",
    title: "Zaza Promptly – AI Tool for Teacher Reports & Parent Communication",
    description:
      "Save hours with Zaza Promptly – the hallucination-safe AI built for teachers. Write reports, parent messages, and professional emails faster, without losing empathy or trust.",
    images: ["/images/logo/zaza-logo.png"],
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <ThemeProvider defaultTheme="system">
        <AnalyticsProvider>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
            <LoadingIndicator />
            {/* <LinkDiagnostic /> */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white dark:bg-slate-800 text-slate-100 dark:text-white px-4 py-2 rounded-md font-medium shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Skip to main content
            </a>
            <Header />
            <main id="main-content" role="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <ZaraOrbProvider />
          </body>
        </AnalyticsProvider>
      </ThemeProvider>
    </html>
  );
}