import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search | Promptly - AI Tools for Teachers',
  description: 'Search our blog posts and case studies to find AI tools, teaching strategies, and practical resources for educators.',
  keywords: 'search, blog posts, case studies, AI tools, teaching resources, education',
  robots: 'index, follow',
  openGraph: {
    title: 'Search | Promptly - AI Tools for Teachers',
    description: 'Search our blog posts and case studies to find AI tools, teaching strategies, and practical resources for educators.',
    type: 'website',
  },
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}