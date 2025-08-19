import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { ErrorBoundary } from '@/components/error-boundary'
import { SecurityHeaders } from '@/components/security-headers'
import { SelectionFix } from '@/components/selection-fix'
import { DeferredAnalytics } from '@/components/deferred-analytics'
import { PerformanceEnhancements, ServiceWorkerRegistration, PerformanceErrorBoundary } from '@/components/performance-enhancements'
import { PerformanceOptimizations, CriticalCSS } from '@/components/performance-optimizations'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Zaza Promptly - AI-Powered Teaching Assistant for Student Feedback',
    template: '%s | Zaza Promptly - AI for Teachers'
  },
  description: 'Transform your teaching with Zaza Promptly - the AI-powered assistant that helps teachers write student comments, parent messages, and feedback 10x faster. Save 5+ hours per week with smart, personalized AI that understands education.',
  keywords: [
    'AI teacher tools', 'student comment generator', 'parent communication AI', 
    'teacher feedback assistant', 'education technology', 'AI for teachers', 
    'report card comments', 'student assessment AI', 'teaching productivity tools',
    'automated feedback generation', 'teacher time-saving apps', 'educational AI assistant',
    'smart teaching tools', 'AI-powered education', 'teacher workflow automation'
  ],
  authors: [{ name: 'Zaza Technologies', url: 'https://www.zazapromptly.com' }],
  creator: 'Zaza Technologies',
  publisher: 'Zaza Technologies',
  category: 'Education Technology',
  applicationName: 'Zaza Promptly',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://zazapromptly.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'en-GB': '/en-GB',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zazapromptly.com',
    title: 'Zaza Promptly - AI Teaching Assistant That Saves Teachers 5+ Hours/Week',
    description: 'Join 12,000+ teachers using AI to write better student feedback faster. Generate personalized comments, parent messages, and assessments in seconds with Zaza Promptly.',
    siteName: 'Zaza Promptly',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zaza Promptly - AI-Powered Teaching Assistant for Student Feedback and Parent Communication',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 800,
        height: 800,
        alt: 'Zaza Promptly Logo - AI for Teachers',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Promptly - AI Teaching Assistant That Saves 5+ Hours/Week',
    description: 'Join 12,000+ teachers using AI to write better student feedback faster. Try free today!',
    images: ['/og-image.jpg'],
    creator: '@zazateachapp',
    site: '@zazateachapp',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code-here',
    yandex: 'your-yandex-verification-code-here',
    yahoo: 'your-yahoo-verification-code-here',
    other: {
      'facebook-domain-verification': 'your-facebook-domain-verification-here',
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Zaza Promptly',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#7c3aed',
    'msapplication-TileImage': '/mstile-144x144.png',
    'theme-color': '#7c3aed',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7c3aed" />
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <SecurityHeaders />
            <SelectionFix />
            <CriticalCSS />
            <Header />
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            <Footer />
            <DeferredAnalytics />
            <PerformanceEnhancements />
            <ServiceWorkerRegistration />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}