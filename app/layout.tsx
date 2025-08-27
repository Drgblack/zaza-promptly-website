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
  icons: {
    icon: '/favicon.ico?v=9',
    shortcut: '/favicon.ico?v=9',
    apple: '/apple-touch-icon.png?v=9',
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