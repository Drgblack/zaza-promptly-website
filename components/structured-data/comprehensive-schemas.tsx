"use client"

export function ComprehensiveSchemas({ url = 'https://zazapromptly.com' }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}#organization`,
    "name": "Zaza Technologies",
    "url": url,
    "logo": {
      "@type": "ImageObject",
      "url": `${url}/og-image.png`,
      "width": 1200,
      "height": 630
    },
    "description": "AI-powered teaching tools that help educators save time and improve student outcomes. Built by PhD educator Dr. Greg Blackburn.",
    "foundingDate": "2023",
    "founder": {
      "@type": "Person",
      "name": "Dr. Greg Blackburn",
      "jobTitle": "Founder & CEO",
      "description": "PhD in Professional Education with 20+ years of teaching experience"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "support@zazapromptly.com",
        "availableLanguage": ["English", "German"]
      }
    ],
    "sameAs": [
      "https://linkedin.com/company/zaza-technologies",
      "https://twitter.com/zazateachapp",
      "https://www.facebook.com/zazapromptly"
    ],
    "areaServed": [
      {
        "@type": "Country",
        "name": "United States"
      },
      {
        "@type": "Country", 
        "name": "United Kingdom"
      },
      {
        "@type": "Country",
        "name": "Germany"
      },
      {
        "@type": "Country",
        "name": "Australia"
      },
      {
        "@type": "Country",
        "name": "Canada"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Teaching Assistant Products",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "SoftwareApplication",
            "name": "Zaza Promptly",
            "applicationCategory": "EducationalApplication"
          }
        }
      ]
    }
  }

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    "name": "Zaza Promptly",
    "applicationCategory": "EducationalApplication",
    "applicationSubCategory": "Teacher Productivity Tool",
    "operatingSystem": "Web Browser",
    "url": url,
    "description": "PhD-designed AI teaching assistant that helps 12,000+ teachers write professional parent communications, student comments & reports 10x faster. Built by Dr. Greg Blackburn with GDPR compliance and hallucination-safe AI.",
    "softwareVersion": "2.1",
    "datePublished": "2023-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "creator": {
      "@type": "Person",
      "name": "Dr. Greg Blackburn",
      "jobTitle": "PhD in Professional Education",
      "description": "PhD-qualified educator with 20+ years of teaching experience",
      "sameAs": [
        "https://linkedin.com/in/drgregblackburn"
      ]
    },
    "publisher": {
      "@id": `${url}#organization`
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Plan",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "Free trial with 5 AI comments per month",
        "eligibleRegion": "Worldwide",
        "priceValidUntil": "2025-12-31"
      },
      {
        "@type": "Offer",
        "name": "Pro Plan",
        "price": "14.99",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "Unlimited AI comments and advanced features for individual teachers",
        "eligibleRegion": "Worldwide",
        "billingIncrement": "monthly",
        "priceValidUntil": "2025-12-31"
      },
      {
        "@type": "Offer",
        "name": "School Plan", 
        "price": "8",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "Enterprise features for schools and districts (minimum 5 teachers)",
        "eligibleRegion": "Worldwide",
        "billingIncrement": "monthly",
        "priceValidUntil": "2025-12-31"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1200",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Thompson"
        },
        "reviewBody": "I got my Sunday nights back! What used to be three hours of report writing is now 45 minutes. The comments are more thoughtful than what I wrote before — parents have actually thanked me for the clarity."
      },
      {
        "@type": "Review", 
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Dr. Priya Patel"
        },
        "reviewBody": "The GDPR compliance and data protection features give me complete confidence. I can use Promptly knowing student privacy is never compromised - essential in today's educational landscape."
      }
    ],
    "featureList": [
      "AI-powered comment generation for student reports",
      "Professional parent communication templates", 
      "GDPR-compliant data handling",
      "Hallucination-safe AI technology",
      "Multi-language support",
      "PhD educator-designed prompts",
      "12,000+ teacher community",
      "5+ hours weekly time savings"
    ],
    "screenshot": `${url}/app-screenshot.png`,
    "installUrl": url,
    "downloadUrl": url,
    "memoryRequirements": "512MB",
    "storageRequirements": "0MB",
    "permissions": "Internet access for AI processing"
  }

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}#founder`,
    "name": "Dr. Greg Blackburn",
    "givenName": "Greg",
    "familyName": "Blackburn",
    "honorificPrefix": "Dr.",
    "jobTitle": "Founder & CEO",
    "description": "PhD-qualified educator, EdTech expert, and founder of Zaza Technologies. With over 20 years of experience in digital learning and instructional design, Greg has built AI tools trusted by 12,000+ teachers worldwide.",
    "url": `${url}/about-founder`,
    "image": `${url}/images/founder-gb-v1.jpg`,
    "worksFor": {
      "@id": `${url}#organization`
    },
    "knowsAbout": [
      "Educational Technology",
      "Artificial Intelligence in Education", 
      "Professional Education",
      "Teacher Training",
      "Instructional Design",
      "Digital Learning"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University"
    },
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "PhD in Professional Education"
    },
    "sameAs": [
      "https://linkedin.com/in/drgregblackburn",
      "https://twitter.com/drgregblackburn"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}#website`,
    "name": "Zaza Promptly",
    "url": url,
    "description": "AI Teaching Assistant Built by PhD Educator - Join 12,000+ teachers using GDPR-compliant, hallucination-safe AI for professional parent communications & student reports",
    "publisher": {
      "@id": `${url}#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://linkedin.com/company/zaza-technologies",
      "https://twitter.com/zazateachapp"
    ],
    "mainEntity": {
      "@id": `${url}#software`
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is using Promptly cheating?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not at all. Promptly is like having a teaching assistant who helps you draft ideas — but you're always the decision-maker. Every suggestion can be reviewed, adapted, and personalised by you. It's your professional judgement and classroom knowledge that matters."
        }
      },
      {
        "@type": "Question",
        "name": "How does Promptly keep my data safe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your privacy is our priority. We use bank-level encryption, never share your data with third parties, and you can delete your information anytime. Built by teachers, for teachers — we understand how sensitive classroom information is."
        }
      },
      {
        "@type": "Question",
        "name": "Can I trust Promptly's suggestions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Think of Promptly as a colleague who offers starting points — you decide what works for your students. Every suggestion can be edited or ignored. You stay in complete control of what goes to parents and in reports."
        }
      },
      {
        "@type": "Question",
        "name": "How is Promptly different from ChatGPT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ChatGPT is a general tool. Promptly is built specifically for teachers, with classroom-tested prompts, educational guardrails, and deep understanding of school communication needs. It speaks your language from day one."
        }
      },
      {
        "@type": "Question",
        "name": "Can I trust Promptly's suggestions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Promptly gives you helpful starting points, but you're always the one in charge. Every suggestion can be edited, tweaked, or ignored — nothing is locked in. Think of it as a colleague who throws out ideas, but you decide what actually goes home to parents or into your reports."
        }
      }
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": url
      }
    ]
  }

  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Main Navigation",
    "url": [
      {
        "@type": "WebPage",
        "name": "Products",
        "url": `${url}/products`
      },
      {
        "@type": "WebPage", 
        "name": "Pricing",
        "url": `${url}/pricing`
      },
      {
        "@type": "WebPage",
        "name": "Blog", 
        "url": `${url}/blog`
      },
      {
        "@type": "WebPage",
        "name": "Free Resources",
        "url": `${url}/free-resources`
      },
      {
        "@type": "WebPage",
        "name": "FAQs",
        "url": `${url}/faqs`
      },
      {
        "@type": "WebPage",
        "name": "About the Founder", 
        "url": `${url}/about-founder`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
      />
    </>
  )
}