import type { Metadata } from 'next'
import { getAllBlogPosts, getPopularPosts, getAllCategories, getAllTags } from '@/lib/blog'
import { StructuredData } from '@/components/structured-data'
import { generateWebsiteSchema } from '@/lib/structured-data'
import { BlogPageClient } from './BlogPageClient'
// Header and Footer are now rendered globally via layout

// Enable static generation with ISR
export const dynamic = 'force-static'
export const revalidate = 3600 // 1 hour

export const metadata: Metadata = {
  title: 'Insights for Teachers - AI Education Blog | Zaza Technologies',
  description: 'Practical tips, research-based strategies, and AI-powered teaching insights for modern educators. Discover safe AI tools reducing teacher workload.',
  keywords: [
    'AI teaching insights', 'teacher productivity tips', 'educational AI strategies',
    'teaching with AI', 'AI lesson planning', 'teacher workflow optimization',
    'AI tools for educators', 'teaching technology tips', 'classroom AI integration',
    'educator professional development', 'AI teaching best practices'
  ],
  openGraph: {
    title: 'Insights for Teachers - AI Education Blog',
    description: 'Practical tips, research-based strategies, and AI-powered teaching insights for modern educators.',
    images: ['/opengraph-image'],
    type: 'website',
    siteName: 'Zaza Technologies'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights for Teachers - AI Education Blog',
    description: 'Practical tips and AI-powered teaching insights for educators.',
    images: ['/opengraph-image'],
    creator: '@zazateachapp'
  },
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {
  const siteUrl = 'https://www.zazapromptly.com'
  
  let allPosts: any[] = [];
  let popularPosts: any[] = [];
  let categories: string[] = [];
  let tags: string[] = [];
  
  try {
    [allPosts, popularPosts, categories, tags] = await Promise.all([
      getAllBlogPosts(),
      getPopularPosts(6),
      getAllCategories(),
      getAllTags()
    ]);
  } catch (error) {
    console.error('Error loading blog data:', error);
    // Continue with empty arrays for graceful degradation
  }

  // Generate structured data for blog section
  const blogSchema = generateWebsiteSchema({
    name: 'Zaza Technologies Blog - AI Education Tips & Strategies',
    url: `${siteUrl}/blog`,
    description: 'Practical tips, research-based strategies, and AI-powered teaching insights for modern educators.'
  })

  // Filter to only published posts
  const publishedPosts = allPosts.filter(post => post.isPublished && !post.isDraft)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <StructuredData data={blogSchema} />
      <BlogPageClient 
        publishedPosts={publishedPosts}
        categories={categories}
        tags={tags}
      />
    </div>
  )
}