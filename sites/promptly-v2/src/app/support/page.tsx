import { Metadata } from 'next'
import PlaceholderPage, { generatePlaceholderMetadata } from '@/components/PlaceholderPage'

export async function generateMetadata(): Promise<Metadata> {
  return generatePlaceholderMetadata('support')
}

export default function SupportPage() {
  return <PlaceholderPage source="support" />
}