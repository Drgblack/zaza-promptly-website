import { Metadata } from 'next'
import { StructuredData } from '@/components/structured-data'
import { generateWebsiteSchema } from '@/lib/structured-data'
import { FreeResourcesClientNew } from './FreeResourcesClientNew'

export const metadata: Metadata = {
  title: 'Free Teaching Resources - AI Prompts, Templates & Guides',
  description: 'Download free AI prompts, email templates, and teaching guides. Over 50 resources tested by teachers to save you time.',
  alternates: {
    canonical: 'https://zazapromptly.com/free-resources',
  },
  openGraph: {
    title: 'Free Teaching Resources - AI Prompts, Templates & Guides',
    description: 'Download free AI prompts, email templates, and teaching guides. Over 50 resources tested by teachers to save you time.',
    url: 'https://zazapromptly.com/free-resources',
    siteName: 'Zaza Promptly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ZazaPromptly',
    title: 'Free Teaching Resources - AI Prompts, Templates & Guides',
    description: 'Download free AI prompts, email templates, and teaching guides. Over 50 resources tested by teachers to save you time.',
  }
};

export default function FreeResourcesPage() {
  const siteUrl = 'https://zazapromptly.com'
  
  // Generate structured data for free resources page
  const resourcesSchema = generateWebsiteSchema({
    name: 'Free Teaching Resources - AI Prompts, Templates & Guides',
    url: `${siteUrl}/free-resources`,
    description: 'Download free AI prompts, email templates, and teaching guides. Over 50 resources tested by teachers to save you time.'
  })

  return (
    <div>
      <StructuredData data={resourcesSchema} />
      <FreeResourcesClientNew />
      
      {/* Enhanced Structured Data for Resources */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Free Teaching Resources",
            "description": "Download free AI prompts, email templates, and teaching guides. Over 50 resources tested by teachers to save you time.",
            "url": "https://zazapromptly.com/free-resources",
            "mainEntity": [
              {
                "@type": "DigitalDocument",
                "name": "AI Prompts Collection",
                "description": "Ready-to-use AI prompts for lesson planning, parent communication, and classroom management",
                "url": "https://zazapromptly.com/downloads/AI_Prompt_Templates_for_Teachers.docx",
                "encodingFormat": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "license": "https://creativecommons.org/licenses/by/4.0/",
                "isAccessibleForFree": true
              },
              {
                "@type": "DigitalDocument", 
                "name": "Assessment Rubrics and Templates",
                "description": "Complete rubrics, templates, and report card comment banks for all subjects",
                "url": "https://zazapromptly.com/downloads/Assessment_Rubrics_and_Templates.docx",
                "encodingFormat": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "license": "https://creativecommons.org/licenses/by/4.0/",
                "isAccessibleForFree": true
              },
              {
                "@type": "DigitalDocument",
                "name": "Teacher Time Management Guide", 
                "description": "Step-by-step strategies to reclaim your evenings and weekends",
                "url": "https://zazapromptly.com/downloads/Teacher_Time_Management_Guide.docx",
                "encodingFormat": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "license": "https://creativecommons.org/licenses/by/4.0/",
                "isAccessibleForFree": true
              }
            ]
          })
        }}
      />
    </div>
  );
}