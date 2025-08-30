export default function Component() {
  if (process.env.NODE_ENV !== 'production') {
    return <div>Component: skip-link</div>
  }
  return null
}

// Named exports for flexibility
export const SkiplinkSection = Component
export const Skiplink = Component
export const SkipLink = Component
