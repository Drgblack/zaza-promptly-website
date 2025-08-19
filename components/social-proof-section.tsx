"use client"

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAnalytics } from '@/hooks/useAnalytics'

const testimonials = [
  {
    id: 1,
    quote: "Saved me 1-2 hours every reports night.",
    author: "Year 6 teacher"
  },
  {
    id: 2,
    quote: "Parent emails feel kinder and clearer.",
    author: "Secondary English"
  },
  {
    id: 3,
    quote: "Finally consistent, professional comments.",
    author: "School Head of Year"
  },
  {
    id: 4,
    quote: "My feedback sounds like me, just better organized.",
    author: "Primary teacher"
  },
  {
    id: 5,
    quote: "No more staring at blank comment boxes.",
    author: "Year 9 coordinator"
  }
]

export function SocialProofSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const { trackEvent } = useAnalytics()

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    trackEvent('button_click', { button_text: 'carousel_dot', section: 'social_proof', value: index })
  }

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
    setCurrentIndex(newIndex)
    trackEvent('button_click', { button_text: 'carousel_prev', section: 'social_proof', value: newIndex })
  }

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % testimonials.length
    setCurrentIndex(newIndex)
    trackEvent('button_click', { button_text: 'carousel_next', section: 'social_proof', value: newIndex })
  }

  return (
    <section 
      className="py-16 bg-gradient-to-b from-slate-50 to-white"
      aria-label="Teacher testimonials"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">Trusted by teachers</h2>
        
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Carousel container */}
          <div 
            className="overflow-hidden rounded-2xl"
            role="region" 
            aria-roledescription="carousel"
            aria-label="Teacher testimonials carousel"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${testimonial.author} testimonial`}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                    <blockquote className="text-lg sm:text-xl text-slate-900 font-medium mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <cite className="text-slate-600 font-normal">
                      — {testimonial.author}
                    </cite>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 border-slate-300 hover:bg-white shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 border-slate-300 hover:bg-white shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Dot indicators */}
          <div className="flex justify-center mt-6 space-x-2" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex 
                    ? 'bg-blue-600' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                role="tab"
                aria-selected={index === currentIndex}
                tabIndex={index === currentIndex ? 0 : -1}
              />
            ))}
          </div>

          {/* Live region for screen readers */}
          <div 
            className="sr-only" 
            aria-live="polite" 
            aria-atomic="true"
          >
            {`Testimonial ${currentIndex + 1} of ${testimonials.length}: ${testimonials[currentIndex].quote} by ${testimonials[currentIndex].author}`}
          </div>
        </div>
      </div>
    </section>
  )
}