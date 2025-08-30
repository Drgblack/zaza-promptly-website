export default function Component() {
  if (process.env.NODE_ENV !== 'production') {
    return <div>Component: trust-block</div>
  }
  return null
}

// Named exports for flexibility
export const TrustblockSection = Component
export const Trustblock = Component
export const TrustBlock = Component
