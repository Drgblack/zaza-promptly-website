import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import GlobalSchema from '@/components/seo/GlobalSchema'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zaza Draft – The writing partner for teachers',
  description: 'Beat the blank page, save hours, and stay in control — for parent emails, student reports, and staff notes.',
  keywords: 'AI for teachers, AI teacher reports, AI parent communication, safe AI for teachers, teacher AI tool, hallucination-safe AI, teacher report writing',
  authors: [{ name: 'Zaza Technologies' }],
  creator: 'Zaza Technologies',
  publisher: 'Zaza Technologies',
  metadataBase: new URL(process.env.NEXT_PUBLIC_DRAFT_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zazadraft.com'),
  viewport: 'width=device-width, initial-scale=1',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Zaza Draft – The writing partner for teachers',
    description: 'Beat the blank page, save hours, and stay in control — for parent emails, student reports, and staff notes.',
    url: '/',
    siteName: 'Zaza Draft',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og/zaza-og.png',
        width: 1200,
        height: 630,
        alt: 'Zaza Draft - The writing partner for teachers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Draft – The writing partner for teachers',
    description: 'Beat the blank page, save hours, and stay in control — for parent emails, student reports, and staff notes.',
    images: ['/images/og/zaza-og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: "/favicon.ico?v=10" },
      { url: "/icon.png?v=10", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=10", sizes: "180x180" }],
    shortcut: [{ url: "/favicon.ico?v=10" }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        {/* PWA theme colors */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Zaza Draft" />
        
        {/* Preconnect to Stripe for pricing page performance */}
        <link rel="preconnect" href="https://js.stripe.com" />
        <link rel="preconnect" href="https://api.stripe.com" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <GlobalSchema type="website" />
        </ErrorBoundary>
      </body>
    </html>
  )
}