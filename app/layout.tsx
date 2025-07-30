import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { ErrorBoundary } from '@/components/error-boundary'
import { SecurityHeaders } from '@/components/security-headers'
import { GoogleAnalytics } from '@/components/google-analytics'
import { EnhancedConversionTracking } from '@/components/analytics/enhanced-conversion-tracking'
import { PerformanceEnhancements, ServiceWorkerRegistration, PerformanceErrorBoundary } from '@/components/performance-enhancements'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'
import { UserFeedback } from '@/components/user-feedback'

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
  authors: [{ name: 'Zaza Technologies', url: 'https://zazatechnologies.com' }],
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
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicon.ico', sizes: 'any' },
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#7c3aed' },
    ],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Zaza Promptly" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#4f46e5" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* PWA Icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body>
        <PerformanceErrorBoundary>
          <ErrorBoundary>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
              <Header />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </ThemeProvider>
          </ErrorBoundary>
        </PerformanceErrorBoundary>
        <SecurityHeaders />
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <EnhancedConversionTracking />
        <PerformanceEnhancements />
        <ServiceWorkerRegistration />
        <UserFeedback />
        <Analytics />
        <SpeedInsights />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Force enable text selection
              document.addEventListener('DOMContentLoaded', function() {
                // Remove any event listeners that might prevent selection
                document.addEventListener('mousedown', function(e) {
                  e.stopPropagation();
                }, true);
                
                document.addEventListener('selectstart', function(e) {
                  e.stopPropagation();
                }, true);
                
                // Force enable selection on all elements
                const enableSelection = () => {
                  const allElements = document.querySelectorAll('*');
                  allElements.forEach(el => {
                    if (el.style) {
                      el.style.setProperty('-webkit-user-select', 'text', 'important');
                      el.style.setProperty('-moz-user-select', 'text', 'important');
                      el.style.setProperty('-ms-user-select', 'text', 'important');
                      el.style.setProperty('user-select', 'text', 'important');
                      el.style.setProperty('pointer-events', 'auto', 'important');
                    }
                  });
                };
                
                enableSelection();
                
                // Run periodically to catch dynamic content
                setInterval(enableSelection, 1000);
              });
            `
          }}
        />

      </body>
    </html>
  )
}