import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/hooks/use-theme"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zaza Technologies – Human-Centred AI Tools for Educators",
  description:
    "Zaza builds trusted AI tools that help teachers save time, reduce burnout, and bring back the joy of teaching.",
  keywords: [
    "AI for teachers",
    "lesson planning AI",
    "report comment generator",
    "education AI tools",
    "Zaza Promptly",
    "Zaza Teach",
    "EdTech",
    "teacher tools",
    "AI education",
    "classroom AI",
    "teaching assistant AI",
    "educator productivity",
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
    locale: "en_US",
    url: "https://zaza.tech",
    siteName: "Zaza Technologies",
    title: "Zaza Technologies – Human-Centred AI for Classrooms",
    description: "Save time and stress with trusted AI tools for teaching.",
    images: [
      {
        url: "/assets/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Zaza Technologies - Human-Centred AI for Classrooms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaza Technologies – Human-Centred AI for Classrooms",
    description: "Save time and stress with trusted AI tools for teaching.",
    images: ["/assets/og-cover.jpg"],
    creator: "@ZazaTech",
    site: "@ZazaTech",
  },
  alternates: {
    canonical: "https://zaza.tech",
  },
  category: "Education Technology",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://zaza.tech"),
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  icons: {
    icon: [
      { url: "/assets/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/assets/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/assets/safari-pinned-tab.svg", color: "#6366f1" }],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Zaza Logo Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />

        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/assets/safari-pinned-tab.svg" color="#6366f1" />

        {/* Microsoft Tiles */}
        <meta name="msapplication-TileImage" content="/assets/mstile-144x144.png" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-config" content="/assets/browserconfig.xml" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Zaza Technologies – Human-Centred AI for Classrooms" />
        <meta property="og:description" content="Save time and stress with trusted AI tools for teaching." />
        <meta property="og:image" content="/assets/og-cover.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Zaza Technologies - Human-Centred AI for Classrooms" />
        <meta property="og:url" content="https://zaza.tech" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Zaza Technologies" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zaza Technologies – Human-Centred AI for Classrooms" />
        <meta name="twitter:description" content="Save time and stress with trusted AI tools for teaching." />
        <meta name="twitter:image" content="/assets/og-cover.jpg" />
        <meta name="twitter:image:alt" content="Zaza Technologies - Human-Centred AI for Classrooms" />
        <meta name="twitter:site" content="@ZazaTech" />
        <meta name="twitter:creator" content="@ZazaTech" />

        {/* Additional SEO meta tags */}
        <meta name="theme-color" content="#6366f1" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Zaza Technologies" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Zaza Technologies" />

        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Zaza Technologies",
              description: "Human-centred AI tools built by educators, for educators",
              url: "https://zaza.tech",
              logo: "https://zaza.tech/assets/zaza-logo.png",
              foundingDate: "2024",
              founder: {
                "@type": "Person",
                name: "Dr. Greg Blackburn",
                jobTitle: "Founder & CEO",
                description: "PhD-qualified educator and Global Director of Learning with over 20 years' experience",
              },
              industry: "Education Technology",
              sameAs: ["https://twitter.com/ZazaTech", "https://linkedin.com/company/zaza-technologies"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                url: "https://zaza.tech/contact",
              },
              offers: [
                {
                  "@type": "Product",
                  name: "Zaza Promptly",
                  description:
                    "Write 100 report comments in minutes — hallucination-safe, tone-aware, and teacher-trusted",
                  url: "https://zaza.tech/promptly",
                },
                {
                  "@type": "Product",
                  name: "Zaza Teach",
                  description: "Plan lessons in seconds with AI that understands curriculum, context, and creativity",
                  url: "https://zaza.tech/teach",
                },
              ],
            }),
          }}
        />

        {/* Structured Data for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Zaza Technologies",
              description: "Human-Centred AI Tools for Educators",
              url: "https://zaza.tech",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://zaza.tech/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light" storageKey="zaza-ui-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
