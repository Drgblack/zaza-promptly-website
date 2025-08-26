import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostMeta, getPostSlugs } from '@/lib/blog'
import BlogLayout from '@/components/blog/BlogLayout'
import { generateBlogMetadata, generateBlogStructuredData } from '@/lib/blog-metadata'

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
      alternates: {
        canonical: '/404',
      },
    }
  }

  return generateBlogMetadata({
    title: postMeta.title,
    description: postMeta.description,
    content: postMeta.content || '',
    publishDate: postMeta.date,
    slug: params.slug,
    author: postMeta.author,
    tags: postMeta.tags,
    customImage: postMeta.image // Allow posts to override default founder photo
  })
}

export default async function BlogPost({ params }: Props) {
  const postMeta = await getPostMeta(params.slug)
  
  if (!postMeta) {
    notFound()
  }

  // Generate structured data using the new system
  const { articleData, breadcrumbData } = generateBlogStructuredData({
    title: postMeta.title,
    description: postMeta.description,
    content: postMeta.content || '',
    publishDate: postMeta.date,
    slug: params.slug,
    author: postMeta.author,
    tags: postMeta.tags,
    customImage: postMeta.image
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      
      <BlogLayout
        title={postMeta.title}
        description={postMeta.description}
        content={postMeta.content || ''}
        publishDate={postMeta.date}
        slug={params.slug}
        author={postMeta.author}
        tags={postMeta.tags}
      />
    </>
  )
}