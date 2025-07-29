import type { Metadata } from 'next'
import { getAllBlogPosts, getPopularPosts, getAllCategories, getAllTags } from '@/lib/blog'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { BlogIndexClient } from '@/components/blog/blog-index-client'
import { BlogHeroClient } from '@/components/blog/blog-hero-client'

export const metadata: Metadata = {
  title: 'AI Education Blog - Teaching Tips & Strategies | Zaza Promptly',
  description: 'Discover the latest insights, tips, and strategies for using AI in education. Written by teachers, for teachers. Expert advice on AI-powered teaching tools.',
  keywords: ['AI in education', 'teaching with AI', 'AI teaching tools', 'educational technology', 'teacher blog', 'AI lesson planning', 'teaching strategies'],
  openGraph: {
    title: 'AI Education Blog - Teaching Tips & Strategies | Zaza Promptly',
    description: 'Discover the latest insights, tips, and strategies for using AI in education. Written by teachers, for teachers.',
    images: ['/opengraph-image'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Education Blog - Teaching Tips & Strategies | Zaza Promptly',
    description: 'Discover the latest insights, tips, and strategies for using AI in education. Written by teachers, for teachers.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {
  const [allPosts, popularPosts, categories, tags] = await Promise.all([
    getAllBlogPosts('en'),
    getPopularPosts(6, 'en'),
    getAllCategories('en'),
    getAllTags('en')
  ])

  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20 bg-gray-50">
        {/* Hero Section */}
        <BlogHeroClient 
          allPostsCount={allPosts.length}
          categoriesCount={categories.length}
        />

        {/* Blog Content with Client-side filtering */}
        <BlogIndexClient
          allPosts={allPosts}
          popularPosts={popularPosts}
          categories={categories}
          tags={tags}
          locale="en"
        />
      </main>

      <Footer />
    </>
  )
}