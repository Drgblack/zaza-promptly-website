import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
