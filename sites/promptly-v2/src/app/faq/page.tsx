import { Metadata } from 'next'
import FAQPageComponent from '@/components/faq/FAQPageComponent'
import { 
  loadAllFAQs, 
  generateFAQPageJsonLD, 
  generateBreadcrumbJsonLD,
  groupFAQsByCategory 
} from '@/lib/faq-loader'

export const metadata: Metadata = {
  title: 'Promptly FAQ – Answers for Teachers & Schools | Zaza Promptly',
  description: 'Get answers about AI for teachers, data privacy, pricing, school licences, and how Promptly helps reduce workload while improving student communication.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Promptly FAQ – Answers for Teachers & Schools',
    description: 'Get answers about AI for teachers, data privacy, pricing, school licences, and how Promptly helps reduce workload while improving student communication.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Promptly FAQ – Answers for Teachers & Schools',
    description: 'Get answers about AI for teachers, data privacy, pricing, school licences, and how Promptly helps reduce workload while improving student communication.',
  },
}

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
