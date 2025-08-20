import { Metadata } from 'next'
import { StructuredData } from '@/components/structured-data'
import { generateWebsiteSchema } from '@/lib/structured-data'
import { ProductsPageClient } from './ProductsPageClient'
import { products } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Zaza Products - AI-Powered Tools for Teachers | Zaza',
  description: 'AI-powered tools that help teachers thrive — from lesson planning to student feedback. Join 12,000+ teachers saving 5+ hours weekly with Zaza AI tools.',
  keywords: [
    'AI tools for teachers',
    'teacher productivity tools', 
    'AI lesson planning',
    'AI student feedback',
    'educational AI assistant',
    'classroom management software',
    'teaching workflow automation',
    'teacher time saving tools',
    'AI for education'
  ].join(', '),
  openGraph: {
    title: 'Zaza Products - AI-Powered Tools for Teachers',
    description: 'AI-powered tools that help teachers thrive — from lesson planning to student feedback. Join 12,000+ teachers saving time.',
    type: 'website',
    url: 'https://www.zazapromptly.com/products',
    images: [{
      url: 'https://www.zazapromptly.com/og-products.png',
      width: 1200,
      height: 630,
      alt: 'Zaza Products - AI Tools for Teachers'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Products - AI-Powered Tools for Teachers',
    description: 'AI-powered tools that help teachers thrive — from lesson planning to student feedback.',
    images: ['https://www.zazapromptly.com/og-products.png']
  },
  alternates: {
    canonical: 'https://www.zazapromptly.com/products'
  }
}


export default function ProductsPage() {
  const siteUrl = 'https://www.zazapromptly.com'
  
  // Generate structured data for products page
  const productsSchema = generateWebsiteSchema({
    name: 'Zaza Products - AI Tools for Teachers',
    url: `${siteUrl}/products`,
    description: 'AI-powered tools that help teachers thrive — from lesson planning to student feedback.'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <StructuredData data={productsSchema} />
      <ProductsPageClient products={products} />
      
      {/* Enhanced Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Zaza AI Tools for Teachers",
            "description": "AI-powered tools that help teachers thrive — from lesson planning to student feedback. Join 12,000+ teachers saving time.",
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