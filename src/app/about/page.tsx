import { SEOHead } from "@/components/seo-head"

export default function AboutPlaceholder() {
  return (
    <>
      <SEOHead pageType="about" />
      <div style={{ padding: 32, textAlign: 'center' }}>
        <h1>About</h1>
        <p>This page is only available on the main Zaza Technologies site.</p>
        <a href="https://zazatechnologies.com/about" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed', textDecoration: 'underline' }}>
          Go to About
        </a>
      </div>
    </>
  );
} 