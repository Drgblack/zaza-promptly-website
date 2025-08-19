import { ProductPageTemplate } from './product-page-template';
import { Clock, Users, MessageCircle, Calendar, CheckCircle, School } from 'lucide-react';

export function SparkProductPage() {
  return (
    <ProductPageTemplate
      title="Zaza Spark (HR)"
      tagline="HR workflows that actually work for schools."
      problemTitle="School HR Is Uniquely Challenging"
      problemText="Teacher onboarding during term time. Training schedules around classroom commitments. Communication that balances professionalism with the collaborative school culture. Generic HR tools don't get education."
      solutionTitle="HR Solutions Built for Schools"
      solutionText="Zaza Spark understands the rhythms of school life. Streamline onboarding for mid-year hires, create training that teachers can actually attend, and communicate with the warmth and professionalism that school communities need."
      benefitsTitle="Simplify Your School HR:"
      benefits={[
        { icon: Clock, text: "Faster onboarding that works around teaching schedules", color: "text-blue-600" },
        { icon: Calendar, text: "Flexible training designed for busy educators", color: "text-green-600" },
        { icon: MessageCircle, text: "Clear communication that maintains school culture", color: "text-purple-600" },
        { icon: Users, text: "Reduced admin burden on leadership teams", color: "text-yellow-600" },
        { icon: CheckCircle, text: "Better teacher experience from day one", color: "text-indigo-600" },
        { icon: School, text: "Professional workflows that respect educational environments", color: "text-red-600" },
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