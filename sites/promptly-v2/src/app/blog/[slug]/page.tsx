import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostMeta, getPostSlugs } from '@/lib/blog'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const postMeta = await getPostMeta(params.slug)
  
  if (!postMeta) {
    return {
      title: 'Post Not Found | Promptly Blog',
    }
  }

  return {
    title: `${postMeta.title} | Promptly Blog`,
    description: postMeta.description,
  }
}

export default async function BlogPost({ params }: Props) {
  const postMeta = await getPostMeta(params.slug)
  
  if (!postMeta) {
    notFound()
  }

  // Dynamically import the MDX post
  let Post
  try {
    const postModule = await import(`../../../../content/blog/${params.slug}.mdx`)
    Post = postModule.default
  } catch (error) {
    console.error(`Failed to load post ${params.slug}:`, error)
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {postMeta.tags?.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-brand-600/20 text-brand-400 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6">
              {postMeta.title}
            </h1>
            
            <p className="text-xl text-slate-300 mb-8">
              {postMeta.description}
            </p>
            
            <div className="flex items-center justify-center gap-4 text-slate-400">
              <span>{formatDate(postMeta.date)}</span>
              {postMeta.author && (
                <>
                  <span>•</span>
                  <span>by {postMeta.author}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-invert prose-lg max-w-none">
              <Post />
            </article>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-t border-white/10 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link 
              href="/blog"
              className="inline-flex items-center text-brand-400 hover:text-brand-300 transition-colors"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            
            <Link 
              href="/waitlist"
              className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors shadow-card"
            >
              Try Promptly
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}