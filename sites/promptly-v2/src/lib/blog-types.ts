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
  // Draft and scheduling support
  isDraft?: boolean
  isPublished?: boolean
  publishDate?: string // ISO date string for scheduled publishing
  scheduledFor?: string // Human readable scheduled date
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

export const slugifyTag = (tag: string): string => {
  return tag
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export const unslugifyTag = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
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

// Scheduling utility functions
export const isPostPublishable = (post: PostMeta): boolean => {
  // If explicitly marked as draft, don't publish
  if (post.isDraft === true) return false
  
  // If explicitly marked as published, publish regardless of date
  if (post.isPublished === true) return true
  
  // Check if scheduled publish date has passed
  if (post.publishDate) {
    const now = new Date()
    const publishDate = new Date(post.publishDate)
    return publishDate <= now
  }
  
  // Default: published if no draft flag and no future publish date
  return !post.isDraft
}

export const getNextMondayAt9AM = (fromDate: Date = new Date()): Date => {
  const date = new Date(fromDate)
  const dayOfWeek = date.getDay()
  const daysUntilMonday = dayOfWeek === 1 ? 7 : (8 - dayOfWeek) % 7
  
  date.setDate(date.getDate() + daysUntilMonday)
  date.setHours(9, 0, 0, 0)
  
  return date
}

export const formatScheduledDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
  }).format(date)
}