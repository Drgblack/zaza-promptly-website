import type { Metadata } from 'next'
import { AboutFounderClient } from './AboutFounderClient'

export const metadata: Metadata = {
  title: 'About the Founder - Dr Greg Blackburn | Teacher-First AI',
  description: 'Meet Dr Greg Blackburn, PhD in Professional Education, who built Zaza after 20+ years helping educators. From Tasmania apprentice to AI founder - the authentic story behind teacher-first technology.',
  keywords: [
    'Dr Greg Blackburn',
    'PhD Professional Education', 
    'teacher-first AI',
    'education technology founder',
    'AI for teachers',
    'Zaza Technologies founder',
    '20 years education experience'
  ],
  openGraph: {
    title: 'About Dr Greg Blackburn - Teacher-First AI Founder',
    description: 'The authentic story of how a Tasmania apprentice became a PhD educator building AI tools that respect teachers and save time.',
    type: 'profile',
    url: 'https://zazapromptly.com/about-founder',
    images: [{
      url: 'https://zazapromptly.com/images/founder-gb-v1.jpg',
      width: 400,
      height: 400,
      alt: 'Dr Greg Blackburn — Founder of Zaza Technologies'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dr Greg Blackburn - Teacher-First AI Founder',
    description: 'From Tasmania apprentice to PhD educator building AI that respects teachers.',
    images: ['https://zazapromptly.com/images/founder-gb-v1.jpg'],
  },
  alternates: {
    canonical: 'https://zazapromptly.com/about-founder',
  },
}

export default function AboutFounderPage() {
  return (
    <>
      <AboutFounderClient />
      
      {/* Person Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Dr Greg Blackburn",
            "jobTitle": "Founder & CEO",
            "worksFor": {
              "@type": "Organization",
              "name": "Zaza Technologies",
              "url": "https://zazapromptly.com"
            },
            "alumniOf": [
              {
                "@type": "EducationalOrganization",
                "name": "City, University of London",
                "description": "PhD in Professional Education"
              },
              {
                "@type": "EducationalOrganization", 
                "name": "The University of Queensland",
                "description": "Master of Business Administration"
              },
              {
                "@type": "EducationalOrganization",
                "name": "University of Tasmania", 
                "description": "Information Systems Honours"
              }
            ],
            "knowsAbout": [
              "Educational Technology",
              "AI for Teachers", 
              "Professional Education",
              "Teacher Training",
              "Educational AI Ethics"
            ],
            "description": "PhD educator and founder building teacher-first AI tools. 20+ years experience in educational technology, focusing on reducing teacher workload through ethical AI design.",
            "url": "https://zazapromptly.com/about-founder",
            "image": "https://zazapromptly.com/images/founder-gb-v1.jpg"
          })
        }}
      />
    </>
  )
}