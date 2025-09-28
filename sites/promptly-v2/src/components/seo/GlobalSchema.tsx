interface GlobalSchemaProps {
  type?: string;
}

export default function GlobalSchema({ type = "website" }: GlobalSchemaProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zaza Technologies",
    "alternateName": "Zaza Promptly",
    "description": "AI-powered teaching assistant that helps teachers generate professional student comments, parent messages, and reports 10x faster.",
    "url": "https://promptly.zazatechnologies.com",
    "logo": "https://promptly.zazatechnologies.com/images/logo/zaza-logo.png",
    "founder": {
      "@type": "Person",
      "name": "Dr. Greg Blackburn",
      "jobTitle": "Founder & PhD Professional Education",
      "url": "https://promptly.zazatechnologies.com/about-founder"
    },
    "sameAs": [
      "https://www.linkedin.com/company/zaza-technologies"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@zazatechnologies.com"
    }
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Zaza Promptly",
    "description": "Hallucination-safe AI built for teachers. Write reports, parent messages, and professional emails faster.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "14.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "247"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Zaza Technologies"
    }
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
    </>
  );
}
