import { SEOHead } from "@/components/seo-head"

export default function FaqsPlaceholder() {
  return (
    <>
      <SEOHead pageType="faqs" />
      <div style={{ padding: 32, textAlign: 'center' }}>
        <h1>FAQs</h1>
        <p>This page is only available on the main Zaza Technologies site.</p>
        <a href="https://zazatechnologies.com/faqs" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed', textDecoration: 'underline' }}>
          Go to FAQs
        </a>
      </div>
    </>
  );
} 