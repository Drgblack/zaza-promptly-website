// Legacy URL redirects for SEO continuity and discoverability
export const legacyRedirects = [
  // Legacy blog path formats -> /blog/
  { source: '/posts/ai-tools-teachers-guide-2025', destination: '/blog/ai-tools-teachers-guide-2025', permanent: true },
  { source: '/articles/ai-tools-teachers-guide-2025', destination: '/blog/ai-tools-teachers-guide-2025', permanent: true },
  { source: '/blog-posts/ai-tools-teachers-guide-2025', destination: '/blog/ai-tools-teachers-guide-2025', permanent: true },
  
  { source: '/posts/best-ai-tools-for-teachers-2025', destination: '/blog/best-ai-tools-for-teachers-2025', permanent: true },
  { source: '/articles/best-ai-tools-for-teachers-2025', destination: '/blog/best-ai-tools-for-teachers-2025', permanent: true },
  
  { source: '/posts/ai-comment-generation-guide', destination: '/blog/ai-comment-generation-guide', permanent: true },
  { source: '/articles/ai-comment-generation-guide', destination: '/blog/ai-comment-generation-guide', permanent: true },
  
  { source: '/posts/teacher-guide-safe-use-of-ai', destination: '/blog/teacher-guide-safe-use-of-ai', permanent: true },
  { source: '/articles/teacher-guide-safe-use-of-ai', destination: '/blog/teacher-guide-safe-use-of-ai', permanent: true },
  
  { source: '/posts/ai-lesson-planning-guide-2025', destination: '/blog/ai-lesson-planning-guide-2025', permanent: true },
  { source: '/articles/ai-lesson-planning-guide-2025', destination: '/blog/ai-lesson-planning-guide-2025', permanent: true },
  
  { source: '/posts/reduce-teacher-workload-with-ai', destination: '/blog/reduce-teacher-workload-with-ai', permanent: true },
  { source: '/articles/reduce-teacher-workload-with-ai', destination: '/blog/reduce-teacher-workload-with-ai', permanent: true },
  
  { source: '/posts/parent-teacher-communication-ai', destination: '/blog/parent-teacher-communication-ai', permanent: true },
  { source: '/articles/parent-teacher-communication-ai', destination: '/blog/parent-teacher-communication-ai', permanent: true },
  
  { source: '/posts/teacher-burnout-prevention-strategies', destination: '/blog/teacher-burnout-prevention-strategies', permanent: true },
  { source: '/articles/teacher-burnout-prevention-strategies', destination: '/blog/teacher-burnout-prevention-strategies', permanent: true },
  
  { source: '/posts/getting-started-with-ai', destination: '/blog/getting-started-with-ai', permanent: true },
  { source: '/articles/getting-started-with-ai', destination: '/blog/getting-started-with-ai', permanent: true },
  
  { source: '/posts/the-sunday-night-teacher-anxiety', destination: '/blog/the-sunday-night-teacher-anxiety', permanent: true },
  { source: '/articles/the-sunday-night-teacher-anxiety', destination: '/blog/the-sunday-night-teacher-anxiety', permanent: true },
  
  { source: '/posts/when-grading-feels-overwhelming', destination: '/blog/when-grading-feels-overwhelming', permanent: true },
  { source: '/articles/when-grading-feels-overwhelming', destination: '/blog/when-grading-feels-overwhelming', permanent: true },

  // Legacy section paths
  { source: '/resources', destination: '/free-resources', permanent: true },
  { source: '/downloads', destination: '/free-resources', permanent: true },
  { source: '/templates', destination: '/free-resources', permanent: true },
  
  // Legacy blog index paths
  { source: '/posts', destination: '/blog', permanent: true },
  { source: '/articles', destination: '/blog', permanent: true },
  { source: '/blog-posts', destination: '/blog', permanent: true },
  
  // Legacy product/service paths
  { source: '/tools', destination: '/', permanent: true },
  { source: '/ai-tools', destination: '/', permanent: true },
  { source: '/comment-generator', destination: '/', permanent: true },
  { source: '/teacher-tools', destination: '/personas', permanent: true },
  
  // Legacy about/contact paths
  { source: '/about', destination: '/about/founder', permanent: true },
  { source: '/contact', destination: '/waitlist', permanent: true },
  { source: '/signup', destination: '/waitlist', permanent: true },
  { source: '/get-started', destination: '/waitlist', permanent: true },
  
  // TODO: Add more specific legacy blog post redirects as we discover them during migration
  // TODO: Add any product-specific legacy URLs (e.g., old tool names, beta URLs)
  // TODO: Consider seasonal or campaign-specific legacy URLs if they existed
]

// Common legacy patterns that should redirect to blog posts (catch-all patterns)
export const legacyBlogPatterns = [
  // These would need to be handled with dynamic routing if needed
  // { source: '/posts/:slug*', destination: '/blog/:slug*', permanent: true },
  // { source: '/articles/:slug*', destination: '/blog/:slug*', permanent: true },
  // { source: '/blog-posts/:slug*', destination: '/blog/:slug*', permanent: true },
]
