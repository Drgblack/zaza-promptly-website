import { ProductPageTemplate } from './product-page-template';

export function SparkProductPage() {
  return (
    <ProductPageTemplate
      title="HR Shouldn't Be This Hard"
      tagline="Finally, HR workflows that understand the chaos of school life."
      problemTitle="When a Teacher Starts Mid-Term and Everything Falls Apart"
      problemText="It's November. Your Year 3 teacher just resigned, and you've found a replacement who can start Monday. But your HR system wants them to complete 40 hours of online training, attend a full-day orientation (during teaching hours), and somehow get IT access sorted before they meet their new class. Sound familiar? School HR isn't corporate HR, but nobody seems to have told the systems that."
      solutionTitle="HR That Gets the Real World of Schools" 
      solutionText="Zaza Spark was built by Dr. Greg Blackburn after watching countless schools struggle with HR systems designed for 9-to-5 office workers. It understands that teachers need to be onboarded during lunch breaks, training has to happen after school or during holidays, and communication needs to be warm but professional — because schools are communities, not corporations."
      benefitsTitle="Simplify Your School HR:"
      benefits={[
        { icon: "Clock", text: "Faster onboarding that works around teaching schedules", color: "text-blue-600" },
        { icon: "Calendar", text: "Flexible training designed for busy educators", color: "text-green-600" },
        { icon: "MessageCircle", text: "Clear communication that maintains school culture", color: "text-purple-600" },
        { icon: "Users", text: "Reduced admin burden on leadership teams", color: "text-yellow-600" },
        { icon: "CheckCircle", text: "Better teacher experience from day one", color: "text-indigo-600" },
        { icon: "School", text: "Professional workflows that respect educational environments", color: "text-red-600" },
      ]}
      testimonialQuote="Finally, HR tools that understand teachers don't have time for lengthy onboarding during the school day. The flexibility is game-changing."
      testimonialAuthor="Jennifer R., Deputy Head"
      credibilityText="<strong>Education-First Design</strong><br/>Built by Dr. Greg Blackburn, who combines educational leadership expertise with a deep understanding of school operational needs."
      ctaTitle="Transform your school's HR approach."
      ctaDescription="Join the waitlist for HR tools designed specifically for educational environments."
      ctaButtonText="Join the Waitlist"
      ctaProcessingText="Joining Waitlist..."
      ctaSecondaryText="🏫 School-focused • 👥 Teacher-friendly • ⚡ Early access"
      backgroundColor="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
      isDark={false}
      productSource="zaza_spark_product_page"
    />
  );
}