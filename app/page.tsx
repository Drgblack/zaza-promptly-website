// SEO meta tags injected by automation
import Head from "next/head";
import { HeroSection } from "@/components/hero-section"
import { EmailSignupSection } from "@/components/email-signup-section"
import { PainRecognitionSection } from "@/components/pain-recognition-section"
import { TransformationSection } from "@/components/transformation-section"
import { FeaturesSection } from "@/components/features-section"
import { ComparisonSection } from "@/components/comparison-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { DemoSection } from "@/components/demo-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { StickyCTA } from "@/components/sticky-cta"
import { MobileOptimizations } from "@/components/mobile-optimizations"
import { SEOHead } from "@/components/seo-head"
import { SkipLink } from "@/components/skip-link"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { AccessibilityAnnouncer } from "@/components/accessibility-announcer"

export default function Home() {
  return (
    <>
      <Head>
        <title>Zaza Promptly</title>
        <meta name="description" content="Zaza Promptly: AI-powered feedback and prompt generation for educators." />
        <meta property="og:title" content="Zaza Promptly" />
        <meta property="og:description" content="Zaza Promptly: AI-powered feedback and prompt generation for educators." />
        {/* Add a static OG image or remove if not available */}
        {/* <meta property="og:image" content="/og-image.png" /> */}
        {/* <meta property="og:url" content="https://yourdomain.com/zaza-promptly-site" /> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zaza Promptly" />
        <meta name="twitter:description" content="Zaza Promptly: AI-powered feedback and prompt generation for educators." />
        {/* <meta name="twitter:image" content="/og-image.png" /> */}
      </Head>
      <SEOHead pageType="home" />
      <SkipLink />
      <AccessibilityAnnouncer />
      <PerformanceMonitor />
      {/* Main Content */}
      <main className="min-h-screen">
        <HeroSection />
        <EmailSignupSection />
        <PainRecognitionSection />
        <TransformationSection />
        <FeaturesSection />
        <ComparisonSection />
        <TestimonialsSection />
        <DemoSection />
        <FinalCTASection />
      </main>
      <MobileOptimizations />
      <StickyCTA />
    </>
  )
}
