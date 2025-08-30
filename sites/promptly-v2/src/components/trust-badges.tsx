export default function Component() {
  if (process.env.NODE_ENV !== 'production') {
    return <div>Component: trust-badges</div>
  }
  return null
}

// Named exports for flexibility
export const TrustbadgesSection = Component
export const Trustbadges = Component
export const TrustBadges = Component
