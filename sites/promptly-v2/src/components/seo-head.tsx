interface SEOHeadProps {
  pageType?: string;
}

export default function Component({ pageType = "default" }: SEOHeadProps) {
  return null // SEO head tags should be handled in Next.js metadata
}

// Named exports for flexibility
export const SeoheadSection = Component
export const Seohead = Component
export const SeoHead = Component
export const SEOHead = Component
