"use client"

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight, Star } from 'lucide-react'
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
  },
  {
    id: 6,
    quote: "Perfect for differentiated feedback without the extra workload.",
    author: "SEN coordinator"
  },
  {
    id: 7,
    quote: "My students' parents love the detailed, caring comments.",
    author: "Reception teacher"
  },
  {
    id: 8,
    quote: "Before Promptly, I would spend hours after school re-writing parent messages to get the tone right. Now it takes me two minutes, and I feel more confident hitting send.",
    author: "Sarah L., Primary Teacher, UK"
  },
  {
    id: 9,
    quote: "Report writing week used to be the worst. Promptly helped me get through it without staying up past midnight. My comments were thoughtful and consistent, and I finally had my weekend back.",
    author: "James R., High School English Teacher, US"
  },
  {
    id: 10,
    quote: "What I love most is that it doesn't feel generic. Promptly 'gets' how teachers actually speak and lets me focus on the student, not the admin.",
    author: "Anita K., Year 6 Teacher, Australia"
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

  const handleCTAClick = (action: string) => {
    trackEvent('button_click', { button_text: action, section: 'social_proof' })
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

        {/* Strong CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 text-yellow-500 fill-current" />
            ))}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Join 12,000+ teachers saving hours weekly
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Safe, GDPR-compliant AI built by Dr. Greg Blackburn (PhD in Professional Education) specifically for classroom professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => {
                handleCTAClick('save_time_lesson_plans')
                // Scroll to demo or signup section
                const demoSection = document.getElementById('demo-section')
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Save time on your next lesson plan
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleCTAClick('view_more_testimonials')}
              className="w-full sm:w-auto border-2 border-green-300 text-green-700 hover:bg-green-50 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-200"
            >
              See more teacher stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}