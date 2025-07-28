import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zaza Study - Gamified AI Study Help That Actually Works",
  description:
    "AI-powered learning coach for students aged 10-18. Reduce stress, increase motivation, and achieve better grades with gamified study help.",
  keywords: "AI tutoring, gamified learning, study help, education app, homework help, student motivation",
  authors: [{ name: "Zaza Technologies" }],
  openGraph: {
    title: "Zaza Study - Gamified AI Study Help",
    description: "Transform your child's learning experience with AI-powered tutoring and gamified rewards.",
    type: "website",
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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
