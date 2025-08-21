import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zaza Promptly - AI Comments. Done in seconds.',
  description: 'Revolutionary AI-powered comment generation for educators. Save hours, maintain quality, and focus on what matters most - teaching.',
  keywords: 'AI comments, teacher tools, education technology, automated feedback, teaching assistant',
  authors: [{ name: 'Zaza Technologies' }],
  creator: 'Zaza Technologies',
  publisher: 'Zaza Technologies',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://promptly.zazatechnologies.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Zaza Promptly - AI Comments. Done in seconds.',
    description: 'Revolutionary AI-powered comment generation for educators. Save hours, maintain quality, and focus on what matters most - teaching.',
    url: '/',
    siteName: 'Zaza Promptly',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zaza Promptly - AI Comments for Teachers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Promptly - AI Comments. Done in seconds.',
    description: 'Revolutionary AI-powered comment generation for educators. Save hours, maintain quality, and focus on what matters most - teaching.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
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
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        {/* Footer can be added here when ready */}
      </body>
    </html>
  )
}