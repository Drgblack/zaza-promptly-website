import { marked } from 'marked'
import { mdxComponents } from './mdx-components'
import type { ReactElement } from 'react'

interface MDXRendererProps {
  content: string
}

export function MDXRenderer({ content }: MDXRendererProps): ReactElement {
  // Use marked to parse markdown content
  const html = marked(content)
  
  // Create a simple renderer for markdown without MDX dependencies
  return (
    <div 
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  )
}