'use client'

interface OrganizationSchemaProps {
  className?: string;
}

export function OrganizationSchema({ className }: OrganizationSchemaProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zaza Technologies",
    "alternateName": "Zaza Promptly",
    "description": "Developer of safe AI tools for teachers, including hallucination-safe AI for teacher reports and parent communication. GDPR compliant educational technology designed by PhD educators.",
    "url": "https://zazapromptly.com",
    "logo": "https://zazapromptly.com/logo.png",
    "image": "https://zazapromptly.com/og-image.png",
    "founder": {
      "@type": "Person",
      "name": "Dr. Greg Blackburn",
      "jobTitle": "Founder & CEO",
      "description": "PhD in Professional Education with 20+ years of teaching experience. Expert in AI for education and developer of hallucination-safe AI tools for teachers.",
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "University PhD Program"
      },
      "knowsAbout": [
        "AI for Teachers",
        "Educational Technology", 
        "Teacher Professional Development",
        "Safe AI in Education",
        "GDPR Compliance for Schools"
      ]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB",
      "addressRegion": "UK"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "support@zazapromptly.com",
        "availableLanguage": ["English", "German", "French", "Spanish", "Italian"]
      },
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "sales@zazapromptly.com",
        "availableLanguage": ["English"]
      }
    ],
    "sameAs": [
      "https://twitter.com/zazateachapp",
      "https://linkedin.com/company/zaza-technologies"
    ],
    "award": [
      "GDPR Compliant AI Design",
      "Safe AI for Education Certification"
    ],
    "areaServed": [
      {
        "@type": "Country",
        "name": "United Kingdom"
      },
      {
        "@type": "Country", 
        "name": "United States"
      },
      {
        "@type": "Country",
        "name": "Germany"
      },
      {
        "@type": "Country",
        "name": "France" 
      },
      {
        "@type": "Country",
        "name": "Spain"
      },
      {
        "@type": "Country",
        "name": "Italy"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 52.5,
        "longitude": -1.0
      },
      "geoRadius": "5000"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "SoftwareApplication",
          "name": "Zaza Promptly",
          "applicationCategory": "Educational Technology",
          "description": "Hallucination-safe AI tool for teacher reports and parent communication"
        },
        "price": "8",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "SoftwareApplication", 
          "name": "Zaza Teach",
          "applicationCategory": "Educational Technology",
          "description": "AI lesson planning assistant for teachers"
        },
        "availability": "https://schema.org/PreOrder"
      }
    ],
    "knowsAbout": [
      "AI for Teacher Reports",
      "AI for Parent Communication", 
      "Safe AI for Teachers",
      "Hallucination-Safe AI",
      "GDPR Compliant AI for Teachers",
      "Teacher Productivity Apps",
      "AI Lesson Planning Assistant",
      "Educational Technology",
      "Teacher Workload Reduction"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "PhD in Professional Education",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": "Accredited University"
        }
      }
    ],
    "slogan": "Safe AI Tools for Teachers - Reduce Workload, Maintain Quality",
    "mission": "To provide hallucination-safe AI tools that help teachers reduce administrative workload while maintaining the quality and professionalism of educational communications."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      className={className}
    />
  );
}