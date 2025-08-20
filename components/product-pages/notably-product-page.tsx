import { ProductPageTemplate } from './product-page-template';

export function NotablyProductPage() {
  return (
    <ProductPageTemplate
      title="Stop Staring at the Blank Page"
      tagline="Professional writing AI that understands the pressure you're under as an educational leader."
      problemTitle="You're Not a Writer. You're an Educator."
      problemText="It's 6 PM. The board meeting is tomorrow and you're staring at a blank document titled 'Budget_Proposal_FINAL_v7.docx'. You know what you want to say, but finding the right words that sound professional and persuasive? That's the hard part. You went into education to impact students, not to become a corporate writer overnight."
      solutionTitle="Write With The Authority You Deserve"
      solutionText="Notably Suite understands the unique language of education. Built by Dr. Greg Blackburn (PhD in Professional Education), it helps you draft policies, proposals, and reports that sound like they came from someone who's been in education leadership for decades — because they did. You bring the educational expertise, we handle the professional polish."
      benefitsTitle="Finally Write With The Confidence You Deserve:"
      benefits={[
        { icon: "Clock", text: "Turn weekend writing marathons into 30-minute focused sessions", color: "text-blue-600" },
        { icon: "Trophy", text: "Sound like the educational leader you are — not someone pretending", color: "text-yellow-600" },
        { icon: "Target", text: "Never miss a deadline because you're stuck finding the right words", color: "text-green-600" },
        { icon: "Users", text: "Speak with one authoritative voice across all school communications", color: "text-purple-600" },
        { icon: "Briefcase", text: "Focus on educational impact, not fighting with document formatting", color: "text-indigo-600" },
        { icon: "FileText", text: "Build your reputation as a leader who communicates with clarity and purpose", color: "text-red-600" },
      ]}
      testimonialQuote="I was spending entire weekends on grant proposals and still felt uncertain about the language. Notably Suite helped me write like the 20-year education veteran I am, not like someone trying to sound corporate. My proposal success rate has doubled."
      testimonialAuthor="Dr. Sarah Matthews, Assistant Superintendent, California"
      credibilityText="<strong>Built by Someone Who Gets It</strong><br/>Dr. Greg Blackburn (PhD in Professional Education, 20+ years in education) knows the unique pressure of educational leadership writing. Every template and suggestion respects the professional standards and nuanced language of education — because it comes from education."
      ctaTitle="Ready to write with the authority you've earned?"
      ctaDescription="Join 12,000+ educators who've discovered professional writing doesn't have to be painful."
      ctaButtonText="Join the Waitlist"
      ctaProcessingText="Joining Waitlist..."
      ctaSecondaryText="🔒 Secure • 📧 No spam • ⚡ Early access"
      backgroundColor="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
      isDark={false}
      productSource="zaza_notably_product_page"
    />
  );
}