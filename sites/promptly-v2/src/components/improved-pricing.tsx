export default function Component() {
  if (process.env.NODE_ENV !== 'production') {
    return <div>Component: improved-pricing</div>
  }
  return null
}

// Named exports for flexibility
export const ImprovedpricingSection = Component
export const Improvedpricing = Component
export const ImprovedPricing = Component
