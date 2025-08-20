import { ProductPageTemplate } from './product-page-template';

export function NotablyProductPage() {
  return (
    <ProductPageTemplate
      title="Zaza Notably Suite"
      tagline="Professional writing for educators, minus the stress."
      problemTitle="The Administrative Writing Burden"
      problemText="Policy documents. Funding proposals. Meeting minutes. Professional reports. The writing never stops, but you became a teacher to teach, not to be buried in paperwork."
      solutionTitle="Write Better, Faster, With Confidence"
      solutionText="Notably Suite handles the heavy lifting of professional writing. Draft policies that sound authoritative, proposals that get approved, and reports that communicate clearly — all while maintaining your professional voice."
      benefitsTitle="Transform Your Professional Communication:"
      benefits={[
        { icon: "Clock", text: "Save hours on policy drafts and professional documents", color: "text-blue-600" },
        { icon: "Trophy", text: "Sound more confident in formal writing situations", color: "text-yellow-600" },
        { icon: "Target", text: "Reduce stress around administrative deadlines", color: "text-green-600" },
        { icon: "Users", text: "Maintain consistency across all school communications", color: "text-purple-600" },
        { icon: "Briefcase", text: "Focus on leadership instead of wrestling with words", color: "text-indigo-600" },
        { icon: "FileText", text: "Build your reputation with clear, professional documentation", color: "text-red-600" },
      ]}
      testimonialQuote="I used to dread writing funding applications. Now I can draft a compelling proposal in an hour instead of an entire weekend."
      testimonialAuthor="Dr. Sarah M., Curriculum Director"
      credibilityText="<strong>Trust the Process</strong><br/>Created by Dr. Greg Blackburn, whose PhD in Professional Education ensures every tool respects educational leadership principles and professional writing standards."
      ctaTitle="Ready to elevate your professional voice?"
      ctaDescription="Join the waitlist to get early access to writing tools that understand education."
      ctaButtonText="Join the Waitlist"
      ctaProcessingText="Joining Waitlist..."
      ctaSecondaryText="🔒 Secure • 📧 No spam • ⚡ Early access"
      backgroundColor="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
      isDark={false}
      productSource="zaza_notably_product_page"
    />
  );
}