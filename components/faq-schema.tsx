'use client'

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQ[];
  className?: string;
}

export function FAQSchema({ faqs, className }: FAQSchemaProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "AI for Teachers FAQ - Zaza Promptly",
    "description": "Frequently asked questions about safe AI tools for teachers, including hallucination-safe AI for teacher reports and parent communication.",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      className={className}
    />
  );
}

// Semantic HTML wrapper for FAQs optimized for AI search
export function SemanticFAQ({ faqs, title, className }: { faqs: FAQ[], title: string, className?: string }) {
  return (
    <section className={className} role="region" aria-labelledby={`faq-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <h3 id={`faq-${title.replace(/\s+/g, '-').toLowerCase()}`} className="text-xl font-bold text-gray-900 mb-6">
        {title}
      </h3>
      <dl className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
        {faqs.map((faq, index) => (
          <div key={index} itemScope itemType="https://schema.org/Question">
            <dt className="text-lg font-semibold text-gray-900 mb-2" itemProp="name">
              {faq.question}
            </dt>
            <dd 
              className="text-gray-700 leading-relaxed" 
              itemScope 
              itemType="https://schema.org/Answer"
              itemProp="acceptedAnswer"
            >
              <div itemProp="text">{faq.answer}</div>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}