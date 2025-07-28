// Utility functions for structured data (JSON-LD)

export function getFAQPageStructuredData(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}

export function getProductStructuredData(product: {
  name: string;
  description: string;
  image?: string;
  brand?: string;
  offers?: { price: string; priceCurrency: string; availability?: string };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    ...product,
  };
}

export function getHowToStructuredData(howTo: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    step: howTo.steps.map(s => ({ '@type': 'HowToStep', name: s.name, text: s.text })),
  };
} 