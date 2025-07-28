import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Zaza Visuals – AI-Powered Classroom Images & Videos for Teachers",
  description:
    "Create stunning classroom-ready visuals and explainer videos in seconds. Zaza uses AI to help teachers save time and boost engagement with curriculum-aligned content.",
  openGraph: {
    title: "Zaza Visuals – AI for Classroom Images & Videos",
    description: "Save time and engage students with AI-generated visuals and explainer videos.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zaza Visuals - AI Image and Video Generator for Teachers",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaza Visuals – AI for Classroom Images & Videos",
    description: "Save time and engage students with AI-generated visuals and explainer videos.",
    images: ["/og-image.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
