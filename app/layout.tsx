import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { ErrorBoundary } from '@/components/error-boundary'
import { SecurityHeaders } from '@/components/security-headers'
import './globals.css'
import { UserFeedback } from '@/components/user-feedback'

export const metadata: Metadata = {
  title: {
    default: 'Zaza Promptly - AI-Powered Feedback Generation for Teachers',
    template: '%s | Zaza Promptly'
  },
  description: 'Save hours with Zaza Promptly – the AI-powered tool that helps teachers write student comments and parent messages faster, better, and stress-free.',
  keywords: ['AI teacher tools', 'student comments', 'report writing', 'teacher feedback', 'education technology', 'AI for teachers'],
  authors: [{ name: 'Zaza Technologies' }],
  creator: 'Zaza Technologies',
  publisher: 'Zaza Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://zazapromptly.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zazapromptly.com',
    title: 'Zaza Promptly - AI-Powered Feedback Generation for Teachers',
    description: 'Save hours with Zaza Promptly – the AI-powered tool that helps teachers write student comments and parent messages faster, better, and stress-free.',
    siteName: 'Zaza Promptly',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zaza Promptly - AI for Teachers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Promptly - AI-Powered Feedback Generation for Teachers',
    description: 'Save hours with Zaza Promptly – the AI-powered tool that helps teachers write student comments and parent messages faster, better, and stress-free.',
    images: ['/og-image.png'],
    creator: '@zazateach',
    site: '@zazateach',
  },
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
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
      </head>
      <body>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </ErrorBoundary>
        <SecurityHeaders />
        <UserFeedback />
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