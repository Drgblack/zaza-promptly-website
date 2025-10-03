'use client'

import { TESTIMONIALS, QUICK_TESTIMONIALS } from '@/content/testimonials'
import TestimonialCard from './TestimonialCard'
import ScrollReveal from '@/components/animations/ScrollReveal'

interface TestimonialsSectionProps {
  variant?: 'full' | 'quick' | 'featured'
  title?: string
  subtitle?: string
  className?: string
  limit?: number
}

export default function TestimonialsSection({ 
  variant = 'full',
  title = "Trusted by Teachers Worldwide",
  subtitle = "Real educators sharing their experience with Draft",
  className = '',
  limit
}: TestimonialsSectionProps) {
  
  if (variant === 'quick') {
    return (
      <section className={`py-12 ${className}`}>
        <div className="container">
          <ScrollReveal duration={0.22}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
              <p className="text-slate-400">{subtitle}</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal duration={0.26} delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {QUICK_TESTIMONIALS.map((testimonial, index) => (
                <div key={index} className="bg-slate-800/40 border border-slate-700/30 rounded-lg p-4 text-center">
                  <blockquote className="text-slate-300 text-sm mb-2">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <cite className="text-xs text-slate-500 font-medium">
                    {testimonial.author}
                  </cite>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    )
  }

  if (variant === 'featured') {
    const featured = TESTIMONIALS[0] // Use first testimonial as featured
    return (
      <section className={`py-16 ${className}`}>
        <div className="container">
          <ScrollReveal duration={0.22}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-white mb-4">{title}</h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">{subtitle}</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal duration={0.28} delay={0.1}>
            <div className="max-w-4xl mx-auto">
              <TestimonialCard testimonial={featured} variant="featured" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    )
  }

  // Full variant with all testimonials
  const testimonials = limit ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS

  return (
    <section className={`py-20 ${className}`}>
      <div className="container">
        <ScrollReveal duration={0.22}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-white mb-4">{title}</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">{subtitle}</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal duration={0.26} delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                variant="default"
              />
            ))}
          </div>
        </ScrollReveal>
        
        <ScrollReveal duration={0.24} delay={0.2}>
          <div className="text-center mt-12">
            <p className="text-slate-400 text-sm mb-4">
              Join over 12,000 educators saving time with Draft
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/waitlist"
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
              >
                Start Your Free Trial
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/#snippet"
                className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-400 hover:bg-purple-600/10 font-semibold rounded-lg transition-colors"
              >
                Try Demo Tool
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
