export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  author?: string
  tags?: string[]
}

// Manual index for now (keep lean; we can automate later)
export const posts: PostMeta[] = [
  { 
    slug: 'first-post',  
    title: 'How to write faster report comments', 
    description: 'Practical tips to speed up high-quality commenting.', 
    date: '2025-08-20', 
    author: 'Zaza Team', 
    tags: ['reports','productivity'] 
  },
  { 
    slug: 'second-post', 
    title: 'Feedback that lands: Making comments students actually read',                 
    description: 'Transform your feedback from overlooked to impactful with these evidence-based strategies.', 
    date: '2025-08-18', 
    author: 'Zaza Team', 
    tags: ['feedback', 'engagement', 'student-voice'] 
  },
]

export function getPostMeta(slug: string): PostMeta | undefined {
  return posts.find(p => p.slug === slug)
}

export function getAllPosts(): PostMeta[] {
  // Sort by date descending (most recent first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getLatestPost(): PostMeta | undefined {
  const sortedPosts = getAllPosts()
  return sortedPosts[0]
}