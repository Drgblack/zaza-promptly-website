export default function Component() {
  if (process.env.NODE_ENV !== 'production') {
    return <div>Component: snippet-demo</div>
  }
  return null
}

// Named exports for flexibility
export const SnippetdemoSection = Component
export const Snippetdemo = Component
export const SnippetDemo = Component
