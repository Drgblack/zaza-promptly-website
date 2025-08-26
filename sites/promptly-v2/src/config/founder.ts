export interface FounderConfig {
  name: string
  title: string
  photo: string
  bio: string
  shortBio: string
  social: {
    email?: string
    linkedin?: string
    twitter?: string
  }
  profileUrl: string
}

export const founder: FounderConfig = {
  name: "Dr. Greg Blackburn",
  title: "Founder & Fellow Educator",
  photo: "/images/founder-new.jpg",
  bio: "Dr. Greg Blackburn is the founder of Zaza Technologies and creator of Promptly. With over 20 years of experience building educational tools and a PhD in Professional Education, he understands the daily challenges teachers face and is passionate about creating AI solutions that truly serve educators.",
  shortBio: "Founder of Zaza Technologies, PhD Professional Education. Building AI tools that actually help teachers save time without losing the personal touch.",
  social: {
    email: "greg@zazatechnologies.com",
    linkedin: "https://www.linkedin.com/in/greg-blackburn-phd"
  },
  profileUrl: "/about"
}

// Calculate reading time for articles
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Parse content to insert CTAs at optimal positions
export function insertCTAAtPosition(content: string, position: number): string {
  const paragraphs = content.split('\n\n')
  const targetIndex = Math.floor(paragraphs.length * position)
  
  if (targetIndex < paragraphs.length) {
    paragraphs.splice(targetIndex, 0, '<!-- CTA_INSERTION_POINT -->')
  }
  
  return paragraphs.join('\n\n')
}

// Extract excerpt from content for social previews
export function extractExcerpt(content: string, maxLength: number = 160): string {
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove markdown headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim()
  
  if (plainText.length <= maxLength) {
    return plainText
  }
  
  return plainText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
}