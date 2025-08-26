import { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { marked } from 'marked'
import { SaveTimeCTA } from './InlineCTA'

// Configure marked for better rendering
const renderer = new marked.Renderer()

// Note: Custom renderer configuration temporarily disabled due to API changes
// The main blog layout uses its own content processing system

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: false
})

interface BlogMDXProcessorProps {
  content: string
  insertCTAs?: boolean
}

export default function BlogMDXProcessor({ 
  content, 
  insertCTAs = true 
}: BlogMDXProcessorProps): ReactNode {
  // Split content into sections for CTA insertion
  const paragraphs = content.split('\n\n').filter(p => p.trim())
  const elements: ReactNode[] = []
  
  // Calculate where to insert CTAs (after ~30% of content)
  const ctaInsertPoint = Math.floor(paragraphs.length * 0.3)
  
  paragraphs.forEach((paragraph, index) => {
    // Process each paragraph through marked
    const htmlContent = marked.parse(paragraph.trim()) as string
    
    elements.push(
      <div 
        key={`content-${index}`}
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
      />
    )
    
    // Insert CTA at strategic point
    if (insertCTAs && index === ctaInsertPoint) {
      elements.push(
        <SaveTimeCTA key="mid-article-cta" className="my-12" />
      )
    }
  })
  
  return <>{elements}</>
}

// Export styled components for use in other blog components
export const BlogComponents = {
  h1: ({ children, ...props }: any) => (
    <h1 className="text-3xl md:text-4xl font-semibold text-white mb-6 mt-0" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 mt-12 border-b-2 border-slate-700 pb-3" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 mt-10" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-slate-300 text-lg leading-relaxed mb-6" {...props}>
      {children}
    </p>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="relative bg-slate-800/30 border-l-4 border-brand-500 rounded-r-xl p-6 my-8" {...props}>
      <div className="absolute top-4 left-4 text-brand-400/20">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
        </svg>
      </div>
      <div className="text-lg text-white font-medium italic leading-relaxed pl-8">
        {children}
      </div>
    </blockquote>
  ),
  img: ({ src, alt, title, ...props }: any) => (
    <figure className="max-w-[600px] mx-auto my-8">
      <Image
        src={src}
        alt={alt || ''}
        width={600}
        height={400}
        className="w-full rounded-xl"
        {...props}
      />
      {(title || alt) && (
        <figcaption className="text-slate-400 text-sm mt-3 text-center italic">
          {title || alt}
        </figcaption>
      )}
    </figure>
  ),
  a: ({ href, children, ...props }: any) => {
    const isExternal = href?.startsWith('http')
    const Component = isExternal ? 'a' : Link
    const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    
    return (
      <Component
        href={href}
        className="text-brand-400 hover:text-brand-300 underline decoration-brand-400/50 hover:decoration-brand-300/50 transition-colors"
        {...externalProps}
        {...props}
      >
        {children}
      </Component>
    )
  }
}