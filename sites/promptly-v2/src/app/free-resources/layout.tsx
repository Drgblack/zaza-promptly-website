import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Resources | Draft - Educational Templates & Guides',
  description: 'Download free educational resources including comment writing tips, report templates, and parent communication guides for teachers.',
}

export default function FreeResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
