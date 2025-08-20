import { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { ProductsHero } from '@/components/products/ProductsHero'
import { ProductGrid } from '@/components/products/ProductGrid'
import { ProductsComparison } from '@/components/products/ProductsComparison'
import { ProductsCTA } from '@/components/products/ProductsCTA'
import { TestimonialsSection } from '@/components/testimonials-section'
import { TrustBadges } from '@/components/trust-badges'

export const metadata: Metadata = {
  title: 'All Zaza Tools - AI for Teachers | Zaza Products',
  description: 'Discover all Zaza AI tools: Promptly for parent communication, Teach for lesson planning, AutoPlanner for advanced workflows. Save 5+ hours weekly.',
  keywords: [
    'AI tools for teachers',
    'Zaza Promptly parent communication',
    'Zaza Teach lesson planning',
    'teacher productivity tools',
    'educational AI assistant',
    'classroom management software',
    'teaching workflow automation'
  ].join(', '),
  openGraph: {
    title: 'All Zaza Tools - AI for Teachers | Save 5+ Hours Weekly',
    description: 'Compare Zaza AI tools: Promptly for communication, Teach for planning, AutoPlanner for advanced workflows. Trusted by 12,000+ teachers.',
    type: 'website',
    url: 'https://www.zazapromptly.com/products',
    images: [{
      url: 'https://www.zazapromptly.com/og-products.png',
      width: 1200,
      height: 630,
      alt: 'Zaza AI Tools for Teachers - Product Overview'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Zaza Tools - AI for Teachers | Save 5+ Hours Weekly',
    description: 'Compare Zaza AI tools: Promptly for communication, Teach for planning, AutoPlanner for advanced workflows.',
    images: ['https://www.zazapromptly.com/og-products.png']
  },
  alternates: {
    canonical: 'https://www.zazapromptly.com/products'
  }
}


export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with gradient background */}
      <Section background="gradient" fullBleed>
        <ProductsHero />
      </Section>

      {/* Product Grid Section */}
      <Section background="soft" className="py-20">
        <ProductGrid />
      </Section>

      {/* Products Comparison Section */}
      <Section className="py-20">
        <ProductsComparison />
      </Section>

      {/* Trust Badges Section */}
      <Section background="soft" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Educators Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with teacher safety, privacy, and pedagogy at the core.
            </p>
          </div>
          <TrustBadges layout="grid" limit={6} />
        </div>
      </Section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Bottom CTA Section */}
      <Section background="none" fullBleed>
        <ProductsCTA />
      </Section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Zaza AI Tools for Teachers",
            "description": "Complete suite of AI tools designed specifically for teachers: communication, lesson planning, and advanced workflow automation.",
            "url": "https://www.zazapromptly.com/products",
            "mainEntity": [
              {
                "@type": "SoftwareApplication",
                "name": "Zaza Promptly",
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "Web",
                "description": "AI-powered assistant for parent communications and student reports. Trusted by 12,000+ teachers worldwide.",
                "url": "https://www.zazapromptly.com/promptly",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                  "description": "Free trial available"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "bestRating": "5",
                  "ratingCount": "12000"
                }
              },
              {
                "@type": "SoftwareApplication",
                "name": "Zaza Teach",
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "Web", 
                "description": "Smart lesson planning that saves 3-5 hours per week with curriculum-aligned content and export capabilities.",
                "url": "https://www.zazapromptly.com/teach"
              },
              {
                "@type": "SoftwareApplication",
                "name": "Zaza AutoPlanner",
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "Web",
                "description": "Advanced AI agent for comprehensive lesson planning with multimodal capabilities and adaptive workflows.",
                "url": "https://www.zazapromptly.com/autoplanner"
              }
            ]
          })
        }}
      />
    </div>
  )
}