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
  // Migrated content batch 1
  { 
    slug: 'ai-tools-teachers-guide-2025',  
    title: 'The Complete Guide to AI Tools for Teachers in 2025: Transform Your Classroom', 
    description: 'Discover the best AI tools for teachers in 2025. From lesson planning to student feedback, learn how artificial intelligence can save you time and improve learning outcomes.', 
    date: '2025-01-07', 
    author: 'Zaza Promptly Team', 
    tags: ['AI tools', 'teacher technology', 'classroom innovation', 'educational AI', 'teacher productivity', 'lesson planning', 'student feedback'] 
  },
  { 
    slug: 'best-ai-tools-for-teachers-2025',  
    title: 'Best AI Tools for Teachers 2025: Complete Guide to Safe AI in Education', 
    description: 'Discover the best AI tools for teachers in 2025. Learn about hallucination-safe AI, reduce teacher workload by 3-5 hours/week, and compare AI vs ChatGPT for teachers.', 
    date: '2025-01-20', 
    author: 'Dr. Greg Blackburn', 
    tags: ['best AI tools for teachers 2025', 'AI tool for teachers', 'safe AI for teachers', 'teacher productivity apps'] 
  },
  { 
    slug: 'ai-comment-generation-guide',  
    title: 'AI Comment Generation: Complete Guide for Teachers', 
    description: 'Learn how to use AI to generate meaningful, personalized student comments that save hours while improving feedback quality.', 
    date: '2024-12-18', 
    author: 'Dr. Greg Blackburn', 
    tags: ['AI Comments', 'Student Feedback', 'Report Cards', 'Teaching Efficiency', 'AI in Education'] 
  },
  { 
    slug: 'teacher-guide-safe-use-of-ai',  
    title: 'Trust First: A teacher\'s guide to safe, useful AI in the classroom', 
    description: 'A practical, teacher-first approach to using AI safely in education. Build trust, save time, and grow student thinking with research-backed routines.', 
    date: '2025-08-19', 
    author: 'Dr Greg Blackburn', 
    tags: ['AI in Education', 'Teacher Workload', 'Classroom Routines', 'Safety', 'Teaching Strategies'] 
  },
  { 
    slug: 'ai-lesson-planning-guide-2025',  
    title: 'Complete Guide to AI-Powered Lesson Planning in 2025', 
    description: 'Discover how artificial intelligence is revolutionizing lesson planning for teachers. Learn practical strategies, tools, and best practices for integrating AI into your curriculum design.', 
    date: '2024-12-28', 
    author: 'Sarah Johnson', 
    tags: ['AI Tools', 'Lesson Planning', 'Curriculum Design', 'Teacher Productivity', 'EdTech'] 
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
