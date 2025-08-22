'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import testimonials from '@/../../content/testimonials.json'

interface Testimonial {
  quote: string
  author: string
  role: string
  school: string
  rating: number
}

interface TestimonialsProps {
  title?: string
  subtitle?: string
  maxTestimonials?: number
  className?: string
}

function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-1', className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={cn(
            'w-4 h-4',
            star <= rating ? 'text-yellow-400 fill-current' : 'text-slate-600'
          )}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial, className }: { testimonial: Testimonial; className?: string }) {
  return (
    <div className={cn(
      'rounded-2xl shadow-card border border-white/10 bg-slate-900/60 p-6',
      'hover:bg-slate-900/80 transition-colors duration-200',
      className
    )}>
      <StarRating rating={testimonial.rating} className="mb-4" />
      
      <blockquote className="text-slate-300 mb-6 leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-brand-800 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-sm">
            {testimonial.author.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <div className="font-semibold text-white text-sm">
            {testimonial.author}
          </div>
          <div className="text-slate-400 text-xs">
            {testimonial.role} • {testimonial.school}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials({ 
  title = "What educators are saying",
  subtitle,
  maxTestimonials = 6,
  className 
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  const displayedTestimonials = testimonials.slice(0, maxTestimonials)
  const totalTestimonials = displayedTestimonials.length

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Auto-advance testimonials (respecting reduced motion)
  useEffect(() => {
    if (prefersReducedMotion || totalTestimonials <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalTestimonials)
    }, 5000)

    return () => clearInterval(interval)
  }, [totalTestimonials, prefersReducedMotion])

  const handlePrevious = () => {
    setCurrentIndex((prev) => prev === 0 ? totalTestimonials - 1 : prev - 1)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalTestimonials)
  }

  if (totalTestimonials === 0) {
    return null
  }

  return (
    <section className={cn('py-16', className)}>
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {(title || subtitle) && (
            <div className="text-center mb-12">
              {title && (
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedTestimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={`${testimonial.author}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </div>

          {/* Mobile Carousel View */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <div 
                className={cn(
                  'flex transition-transform duration-300 ease-in-out',
                  prefersReducedMotion && 'transition-none'
                )}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {displayedTestimonials.map((testimonial, index) => (
                  <div key={`${testimonial.author}-${index}`} className="w-full flex-shrink-0 px-2">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            {totalTestimonials > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={handlePrevious}
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalTestimonials }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={cn(
                        'w-2 h-2 rounded-full transition-colors',
                        index === currentIndex ? 'bg-brand-500' : 'bg-slate-600 hover:bg-slate-500'
                      )}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
                  aria-label="Next testimonial"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}