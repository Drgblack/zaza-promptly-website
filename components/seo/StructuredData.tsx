interface ProductSchema {
  name: string;
  description: string;
  brand: string;
  category: string;
  offers: {
    price: string;
    priceCurrency: string;
    availability: string;
    priceRange?: string;
    geoNote?: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  features: string[];
}

interface FAQItem {
  question: string;
  answer: string;
}

interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description: string;
  founder: {
    name: string;
    jobTitle: string;
    education: string;
  };
  contactPoint: {
    telephone?: string;
    email: string;
    contactType: string;
  };
}

export function ProductStructuredData({ product }: { product: ProductSchema }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product.name,
    "description": product.description,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "price": product.offers.price,
      "priceCurrency": product.offers.priceCurrency,
      "availability": product.offers.availability,
      "priceSpecification": product.offers.priceRange ? {
        "@type": "PriceSpecification",
        "price": product.offers.price,
        "priceCurrency": product.offers.priceCurrency,
        "valueAddedTaxIncluded": "true"
      } : undefined,
      "description": product.offers.geoNote
    },
    "aggregateRating": product.aggregateRating ? {
      "@type": "AggregateRating",
      "ratingValue": product.aggregateRating.ratingValue,
      "reviewCount": product.aggregateRating.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "featureList": product.features,
    "screenshot": "https://zazapromptly.com/images/promptly-screenshot.png",
    "softwareHelp": "https://zazapromptly.com/support",
    "softwareRequirements": "Modern web browser with JavaScript enabled",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "teacher"
    },
    "educationalUse": [
      "Student assessment",
      "Parent communication", 
      "Report writing",
      "Classroom management"
    ],
    "interactivityType": "active",
    "learningResourceType": "tool",
    "educationalLevel": ["K-12", "Primary", "Secondary"],
    "inLanguage": ["en", "fr", "de", "es", "it"],
    "accessibilityFeature": [
      "alternativeText",
      "readingOrder", 
      "structuralNavigation"
    ],
    "accessibilityControl": [
      "fullKeyboardControl",
      "fullMouseControl"
    ],
    "accessMode": ["textual", "visual"],
    "accessModeSufficient": "textual"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

export function FAQStructuredData({ faqs, mainEntity }: { faqs: FAQItem[]; mainEntity?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq, index) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      },
      "position": index + 1
    })),
    ...(mainEntity && {
      "about": {
        "@type": "SoftwareApplication",
        "name": mainEntity
      }
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

export function OrganizationStructuredData({ org }: { org: OrganizationSchema }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": org.name,
    "url": org.url,
    "logo": {
      "@type": "ImageObject",
      "url": org.logo,
      "width": "400",
      "height": "400"
    },
    "description": org.description,
    "founder": {
      "@type": "Person",
      "name": org.founder.name,
      "jobTitle": org.founder.jobTitle,
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": org.founder.education
      }
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": org.contactPoint.telephone,
      "email": org.contactPoint.email,
      "contactType": org.contactPoint.contactType,
      "availableLanguage": ["English", "French", "German", "Spanish", "Italian"]
    },
    "sameAs": [
      "https://linkedin.com/company/zaza-technologies",
      "https://twitter.com/zazatechnologies"
    ],
    "industry": "Educational Technology",
    "numberOfEmployees": "1-10",
    "foundingDate": "2020",
    "knowsAbout": [
      "Educational Technology",
      "Artificial Intelligence in Education",
      "Teacher Productivity Tools",
      "Student Assessment",
      "Parent Communication"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

export function WebSiteStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Zaza Promptly",
    "url": "https://zazapromptly.com",
    "description": "AI Teaching Assistant that saves teachers 5+ hours weekly. Generate professional student comments, parent messages, and reports instantly.",
    "publisher": {
      "@type": "Organization",
      "name": "Zaza Technologies",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zazapromptly.com/images/logo.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://zazapromptly.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "inLanguage": ["en", "fr", "de", "es", "it"],
    "audience": {
      "@type": "EducationalAudience", 
      "educationalRole": "teacher"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

// Performance optimization component for lazy loading images
export function LazyImage({ 
  src, 
  alt, 
  className, 
  width, 
  height,
  priority = false 
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  width?: number; 
  height?: number;
  priority?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={{ 
        aspectRatio: width && height ? `${width}/${height}` : undefined 
      }}
    />
  );
}