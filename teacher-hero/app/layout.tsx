import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import WebsiteHeader from "@/components/website-header"
import WebsiteFooter from "@/components/website-footer"
import { ThemeProvider } from "@/providers/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Free Teacher Resources | Lesson Plans, Tools & Templates | Zaza Technologies",
  description:
    "Download free lesson planners, comment banks, printable posters, and teaching tools. Created by teachers, for teachers. No sign-up required.",
  keywords: [
    "free teacher resources",
    "lesson plans",
    "teaching tools",
    "UK teachers",
    "classroom materials",
    "educational resources",
    "teacher templates",
    "lesson planners",
    "comment banks",
    "printable posters",
  ],
  authors: [{ name: "Zaza Technologies" }],
  creator: "Zaza Technologies",
  publisher: "Zaza Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://zaza.tech/free-resources",
    title: "Free Teacher Resources | Lesson Plans, Tools & Templates | Zaza Technologies",
    description:
      "Download free lesson planners, comment banks, printable posters, and teaching tools. Created by teachers, for teachers. No sign-up required.",
    siteName: "Zaza Technologies",
    images: [
      {
        url: "/og-image-free-resources.jpg",
        width: 1200,
        height: 630,
        alt: "Free Teacher Resources by Zaza Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Teacher Resources | Lesson Plans, Tools & Templates | Zaza Technologies",
    description:
      "Download free lesson planners, comment banks, printable posters, and teaching tools. Created by teachers, for teachers. No sign-up required.",
    images: ["/og-image-free-resources.jpg"],
    creator: "@ZazaTech",
  },
  alternates: {
    canonical: "https://zaza.tech/free-resources",
  },
    generator: 'v0.dev'
}

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Zaza Technologies",
              url: "https://zaza.tech",
              logo: "https://zaza.tech/logo.png",
              description: "Educational technology company providing free and premium resources for teachers",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+44-20-1234-5678",
                contactType: "customer service",
                availableLanguage: "English",
              },
              sameAs: ["https://twitter.com/ZazaTech", "https://linkedin.com/company/zaza-technologies"],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
          >
            Skip to main content
          </a>
          <WebsiteHeader />
          {children}
          <WebsiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
