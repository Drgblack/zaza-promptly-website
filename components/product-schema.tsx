'use client'

interface ProductSchemaProps {
  name: string;
  description: string;
  category: string;
  brand: string;
  manufacturer: string;
  url: string;
  image?: string;
  price?: string;
  currency?: string;
  offers?: {
    price: string;
    currency: string;
    availability: string;
    validFrom?: string;
  }[];
  features?: string[];
  reviews?: {
    author: string;
    rating: number;
    reviewBody: string;
    datePublished: string;
  }[];
  className?: string;
}

export function ProductSchema({ 
  name, 
  description, 
  category, 
  brand, 
  manufacturer, 
  url, 
  image,
  price,
  currency = "GBP",
  offers,
  features,
  reviews,
  className 
}: ProductSchemaProps) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "applicationCategory": category,
    "operatingSystem": "Web Browser",
    "url": url,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "manufacturer": {
      "@type": "Organization",
      "name": manufacturer,
      "url": "https://zazapromptly.com"
    },
    ...(image && { "image": image }),
    ...(offers && {
      "offers": offers.map(offer => ({
        "@type": "Offer",
        "price": offer.price,
        "priceCurrency": offer.currency,
        "availability": offer.availability,
        ...(offer.validFrom && { "validFrom": offer.validFrom })
      }))
    }),
    ...(features && { "featureList": features }),
    ...(reviews && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1),
        "reviewCount": reviews.length,
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": reviews.map(review => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": review.author
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating,
          "bestRating": "5",
          "worstRating": "1"
        },
        "reviewBody": review.reviewBody,
        "datePublished": review.datePublished
      }))
    }),
    "applicationSubCategory": "Educational Technology",
    "targetAudience": {
      "@type": "EducationalAudience",
      "educationalRole": "teacher"
    },
    "educationalUse": "Professional Development",
    "typicalAgeRange": "18+",
    "learningResourceType": "Software Application",
    "interactivityType": "active",
    "educationalLevel": "Professional Development"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      className={className}
    />
  );
}