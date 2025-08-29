interface SEOInternalLinksProps {
  context?: string;
}

export default function Component({ context = "default" }: SEOInternalLinksProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 text-sm">
      <a href="/faq" className="text-blue-600 hover:text-blue-800">FAQ</a>
      <a href="/pricing" className="text-blue-600 hover:text-blue-800">Pricing</a>
      <a href="/blog" className="text-blue-600 hover:text-blue-800">Blog</a>
      <a href="/about-founder" className="text-blue-600 hover:text-blue-800">About Founder</a>
      <a href="/case-studies" className="text-blue-600 hover:text-blue-800">Case Studies</a>
    </div>
  )
}

// Named exports for flexibility
export const SeointernallinksSection = Component
export const Seointernallinks = Component
export const SeoInternalLinks = Component
export const SEOInternalLinks = Component
