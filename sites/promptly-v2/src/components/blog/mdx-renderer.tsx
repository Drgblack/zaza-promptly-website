import { marked } from 'marked'
import { mdxComponents } from './mdx-components'
import type { ReactElement } from 'react'

interface MDXRendererProps {
  content: string
}

export async function MDXRenderer({ content }: MDXRendererProps): Promise<ReactElement> {
  // Use marked to parse markdown content - await the result since marked can return a Promise
  const html = await marked(content)
  
  // Create a simple renderer for markdown without MDX dependencies
  return (
    <div 
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  )
}