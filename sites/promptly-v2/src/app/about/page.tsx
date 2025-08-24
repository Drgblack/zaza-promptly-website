import type { Metadata } from 'next';
import Hero from '@/components/about/Hero';
import CredibilityStats from '@/components/about/CredibilityStats';
import TrustPrinciples from '@/components/about/TrustPrinciples';
import Journey from '@/components/about/Journey';
import Testimonial from '@/components/about/Testimonial';
import ActionBand from '@/components/about/ActionBand';

export const metadata: Metadata = {
  title: 'About the Founder – Dr. Greg Blackburn | Zaza Promptly',
  description:
    'PhD-qualified educator with 20+ years in EdTech, building teacher-first AI that reduces workload while protecting privacy and professional judgement.',
};

export default function FounderPage() {
  const stats = [
    { value: '20+', label: 'Years in EdTech' },
    { value: '12,000+', label: 'Teachers supported globally' },
    { value: 'PhD', label: 'Professional Education (City, University of London)' },
  ];

  const principles = [
    { title: 'School-safe', body: 'Built to meet school safeguards and compliance.' },
    { title: 'Built by educators', body: 'Co-designed with teachers; grounded in classroom practice.' },
    { title: 'Privacy-first', body: 'Student-safe by design; your data is not used to train public models.' },
    { title: 'No hallucinated facts', body: 'Guardrails reduce "made-up" output; teachers remain in control.' },
  ];


  return (
    <main id="main-content">
      <Hero
        title="Hi, I'm Dr. Greg Blackburn"
        lead="I'm a globally recognised EdTech expert and PhD-qualified educator. For 20+ years I've built tools that reduce teacher workload—without compromising professional judgement."
        imageSrc="/images/founder/portrait.jpg"
        imageAlt="Dr. Greg Blackburn"
        primaryCta={{ href: '/start', label: 'Start Free' }}
        secondaryCta={{ href: 'https://www.linkedin.com/in/gregblackburn', label: 'LinkedIn Profile' }}
      />

      <CredibilityStats items={stats} />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">Why I built Zaza Promptly</h2>
            <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              After decades of seeing EdTech that adds clicks and stress, I built Zaza Promptly to do the opposite. It's grounded in
              classroom realities and designed to save time, not create more work. Promptly suggests; teachers decide.
            </p>
          </div>
        </div>
      </section>

      <TrustPrinciples items={principles} />

      <section aria-labelledby="about-short" className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 id="about-short" className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">About the Founder</h2>
            <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              I grew up in Tasmania and started life as a painter's apprentice at Cascade Brewery. It taught me perseverance—and that my
              path lay elsewhere. Travel and study led me to educational technology: a discipline where good tools disappear into the
              background so teachers can focus on students. I've learned from a family of teachers—my sister, aunty, uncle, cousins, and
              many colleagues who chose this profession to make a difference.
            </p>
          </div>
        </div>
      </section>

      <Journey />

      <Testimonial
        quote="Finally, someone who understands what we actually need. Greg's tools feel like they were built by someone who's been in our shoes."
        author="Sarah M."
        role="Primary School Teacher"
      />

      <ActionBand
        title="Ready to save hours each week?"
        subtitle="Start with report writing & parent communication."
        primary={{ href: '/start', label: 'Start Free Trial' }}
        secondary={{ href: '/newsletter', label: 'Get teacher tips (100% free)' }}
      />
    </main>
  );
}