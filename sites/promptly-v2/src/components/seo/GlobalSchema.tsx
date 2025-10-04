interface GlobalSchemaProps {
  type?: string;
}

export default function GlobalSchema({ type = "website" }: GlobalSchemaProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zaza Technologies",
    "alternateName": "Zaza Draft",
    "description": "The writing partner for teachers. Beat the blank page, save hours, and stay in control with the world's first safe AI built for education.",
    "url": "https://zazadraft.com",
    "logo": "https://zazadraft.com/images/logo/zaza-logo.png",
    "founder": {
      "@type": "Person",
      "name": "Dr. Greg Blackburn",
      "jobTitle": "Founder & PhD Professional Education",
      "url": "https://zazadraft.com/about-founder"
    },
    "sameAs": [
      "https://www.linkedin.com/company/zaza-technologies",
      "https://x.com/zazateachapp",
      "https://www.tiktok.com/@zazatechnologies"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "help@zazatechnologies.com"
    }
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Zaza Draft",
    "description": "The writing partner for teachers. Rewrite & polish in one click with built-in tone & style guide. GDPR-compliant with instant translations."
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
