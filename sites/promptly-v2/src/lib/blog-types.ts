export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  lastmod?: string
  author?: string
  tags?: string[]
  readTime?: string
  category?: string
  featured?: boolean
  content?: string
}

export type AuthorMeta = {
  name: string
  bio: string
  avatar?: string
  email?: string
  twitter?: string
  linkedin?: string
}

export type BlogPost = PostMeta

export type TagInfo = {
  name: string
  count: number
  slug: string
}

export type BlogStats = {
  totalPosts: number
  totalAuthors: number
  totalTags: number
  lastUpdated: string
}

// Client-safe utility functions
export const slugifyAuthor = (author: string): string => {
  return author
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

export const extractExcerpt = (content: string, maxLength: number = 150): string => {
  // Remove markdown syntax and HTML tags
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .trim()

  if (plainText.length <= maxLength) return plainText
  
  return plainText.substring(0, maxLength).trim() + '...'
}