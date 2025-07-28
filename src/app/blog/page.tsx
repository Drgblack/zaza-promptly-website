import { SEOHead } from "@/components/seo-head"

export default function BlogPlaceholder() {
  return (
    <>
      <SEOHead pageType="blog" />
      <div style={{ padding: 32, textAlign: 'center' }}>
        <h1>Blog</h1>
        <p>This page is only available on the main Zaza Technologies site.</p>
        <a href="https://zazatechnologies.com/blog" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed', textDecoration: 'underline' }}>
          Go to Blog
        </a>
      </div>
    </>
  );
} 