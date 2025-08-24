import { Metadata } from 'next'
import PlaceholderPage, { generatePlaceholderMetadata } from '@/components/PlaceholderPage'

export async function generateMetadata(): Promise<Metadata> {
  return generatePlaceholderMetadata('quick-comment-helper')
}

export default function QuickCommentHelperPage() {
  return <PlaceholderPage source="quick-comment-helper" />
}