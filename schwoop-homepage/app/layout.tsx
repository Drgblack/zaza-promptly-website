import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Schwoop - School is brutal. Schwoop is coming.",
  description:
    "We're building the world's first vibe-based study app. Join the TikTok challenges and help shape the future of studying.",
  keywords: "study app, TikTok challenge, Gen Z, students, viral, UGC, SaveMeSchwoop, WhatIsSchwoop",
  openGraph: {
    title: "Schwoop - Help Us Build the Future of Studying",
    description: "Join the viral TikTok challenges and be part of building Schwoop!",
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
    <html lang="en">
      <body className={`${inter.variable} ${inter.className}`}>{children}</body>
    </html>
  )
}
