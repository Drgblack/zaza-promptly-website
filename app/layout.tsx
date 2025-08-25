import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import GlobalSchema from '@/components/seo/GlobalSchema'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zaza Promptly – AI for Teachers & Parent Communication',
  description: 'Save hours with Zaza Promptly – the hallucination-safe AI built for teachers. Write reports, parent messages, and professional emails faster.',
  keywords: 'AI for teachers, AI teacher reports, AI parent communication, safe AI for teachers, teacher AI tool, hallucination-safe AI, teacher report writing',
  authors: [{ name: 'Zaza Technologies' }],
  creator: 'Zaza Technologies',
  publisher: 'Zaza Technologies',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://promptly.zazatechnologies.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Zaza Promptly – AI for Teachers & Parent Communication',
    description: 'Save hours with Zaza Promptly – the hallucination-safe AI built for teachers. Write reports, parent messages, and professional emails faster.',
    url: '/',
    siteName: 'Zaza Promptly',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og/zaza-og.png',
        width: 1200,
        height: 630,
        alt: 'Zaza Promptly - AI Comments for Teachers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Promptly – AI for Teachers & Parent Communication',
    description: 'Save hours with Zaza Promptly – the hallucination-safe AI built for teachers. Write reports, parent messages, and professional emails faster.',
    images: ['/images/og/zaza-og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/site.webmanifest',
  icons: [
    { rel: 'icon', url: '/favicon.ico', sizes: 'any' },
    { rel: 'icon', url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    { rel: 'icon', url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    { rel: 'icon', url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Favicon configuration as requested */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Additional favicon sizes for comprehensive browser support */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
        
        {/* PWA theme colors */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Zaza Promptly" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <GlobalSchema type="website" />
      </body>
    </html>
  )
}