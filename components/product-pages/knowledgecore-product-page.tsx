import { ProductPageTemplate } from './product-page-template';

export function KnowledgeCoreProductPage() {
  return (
    <ProductPageTemplate
      title="Zaza KnowledgeCore"
      tagline="Your teaching wisdom, organised and always accessible."
      problemTitle="Your Best Ideas Are Getting Lost"
      problemText="That brilliant lesson from five years ago. The perfect parent email template. The behaviour strategy that actually worked. Your career is full of hard-won wisdom, but it's scattered across folders, memory, and forgotten notebooks."
      solutionTitle="Capture and Resurface Your Expertise"
      solutionText="KnowledgeCore becomes your professional memory, organising and connecting your best teaching moments. Never lose a good idea again. Build on your successes. Grow your expertise systematically across your entire career."
      benefitsTitle="Your Teaching Legacy, Organised:"
      benefits={[
        { icon: "Archive", text: "Capture everything — lessons, strategies, communications, insights", color: "text-blue-600" },
        { icon: "Search", text: "Find it instantly when you need inspiration or solutions", color: "text-green-600" },
        { icon: "TrendingUp", text: "Build on success by connecting related ideas and approaches", color: "text-purple-600" },
        { icon: "Share", text: "Share selectively with colleagues while keeping personal insights private", color: "text-yellow-600" },
        { icon: "Trophy", text: "Grow professionally by seeing patterns in your teaching journey", color: "text-red-600" },
        { icon: "Zap", text: "Never start from zero — your experience becomes your superpower", color: "text-indigo-600" },
      ]}
      testimonialQuote="It's like having a conversation with my best teaching self from every year of my career. I wish I'd had this tool from day one."
      testimonialAuthor="David K., 15-year Teaching Veteran"
      credibilityText="<strong>Respects Your Professionalism</strong><br/>Built by Dr. Greg Blackburn, understanding that your teaching wisdom deserves tools as sophisticated as your expertise."
      ctaTitle="Ready to unlock your teaching legacy?"
      ctaDescription="Join the waitlist to build your personal teaching knowledge base."
      ctaButtonText="Join the Waitlist"
      ctaProcessingText="Joining Waitlist..."
      ctaSecondaryText="🧠 Your wisdom • 🔍 Instantly searchable • ⚡ Early access"
      backgroundColor="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50"
      isDark={false}
      productSource="zaza_knowledgecore_product_page"
    />
  );
}