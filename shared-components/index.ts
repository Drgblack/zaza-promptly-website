// SEO Components
export { SEOComponent } from './seo/seo-component'
export { generateProductMetadata, generatePageMetadata } from './seo/metadata-config'
export { generateProductSitemap, generateComprehensiveSitemap } from './seo/sitemap-generator'
export { generateProductRobots, generateComprehensiveRobots } from './seo/robots-generator'

// UI Components
export { Header } from './ui/Header'
export { Footer } from './ui/Footer'
export { Layout } from './ui/Layout'

// Value-First Components
export { FreeResourcesHub } from './resources/free-resources-hub'
export { ProductivityCalculator } from './tools/productivity-calculator'
export { TestimonialsHub } from './social-proof/testimonials-hub'
export { BlogHub } from './content/blog-hub'
export { PricingOptimizer } from './pricing/pricing-optimizer'

// Demo Page
export { DemoPage } from './demo/demo-page'

// Utility Components
export { cn } from './lib/utils'

// Re-export types for external use
export type { Metadata } from 'next'
export type { MetadataRoute } from 'next' 