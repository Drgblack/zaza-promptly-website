import { Metadata } from 'next'
import FAQPageComponent from '@/components/faq/FAQPageComponent'
import { 
  loadAllFAQs, 
  generateFAQPageJsonLD, 
  generateBreadcrumbJsonLD,
  groupFAQsByCategory 
} from '@/lib/faq-loader'
import { generateSEOMetadata, seoConfigs } from '@/lib/seo/metadata'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

export const metadata: Metadata = generateSEOMetadata(seoConfigs.faq)

export default async function FAQPage() {
  const faqs = await loadAllFAQs()
  const faqSchema = generateFAQPageJsonLD(faqs)
  const breadcrumbSchema = generateBreadcrumbJsonLD()
  const categories = groupFAQsByCategory(faqs)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FAQPageComponent faqs={faqs} categories={categories} />
    </>
  )
}
