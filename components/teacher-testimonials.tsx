"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'

interface Testimonial {
  id: string
  quote: string
  author: string
  location: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    id: 'sarah-manchester',
    quote: "I got my evenings back. What used to be two hours of report writing is now 30 minutes, and the comments are actually better than what I wrote before.",
    author: "Sarah M.",
    location: "Manchester",
    role: "Year 4 Teacher"
  },
  {
    id: 'jake-texas',
    quote: "My principal noticed the improvement in my parent communication — Promptly helps me sound more professional while keeping my authentic voice.",
    author: "Jake Rodriguez",
    location: "Texas",
    role: "High School English"
  },
  {
    id: 'frau-weber',
    quote: "Finally, an AI tool that understands educational context. It writes in proper German school style and respects our formal communication standards.",
    author: "Frau Weber",
    location: "Munich", 
    role: "Gymnasium Teacher"
  },
  {
    id: 'carmen-madrid',
    quote: "Perfect for bilingual communication. It helps me write clear parent messages in both Spanish and English without losing the meaning.",
    author: "Carmen López",
    location: "Madrid",
    role: "Spanish Language Teacher"
  },
  {
    id: 'emma-sydney',
    quote: "As a new teacher, Promptly gave me confidence in parent communication. I sound experienced even when I'm still learning.",
    author: "Emma Chen",
    location: "Sydney",
    role: "First-Year Teacher"
  }
]

interface TeacherTestimonialsProps {
  className?: string
  limit?: number
  layout?: 'grid' | 'carousel' | 'stacked'
}

export function TeacherTestimonials({ 
  className = "", 
  limit,
  layout = 'grid' 
}: TeacherTestimonialsProps) {
  const displayTestimonials = limit ? testimonials.slice(0, limit) : testimonials

  const testimonialCard = (testimonial: Testimonial, index: number) => (
    <Card 
      key={testimonial.id} 
      className="bg-white/90 backdrop-blur border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Quote className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <blockquote className="text-slate-700 leading-relaxed mb-3 italic">
              "{testimonial.quote}"
            </blockquote>
            <div className="text-sm">
              <div className="font-semibold text-slate-900">{testimonial.author}</div>
              <div className="text-slate-600">{testimonial.role}, {testimonial.location}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (layout === 'stacked') {
    return (
      <div className={`space-y-4 ${className}`.trim()}>
        {displayTestimonials.map(testimonialCard)}
      </div>
    )
  }

  if (layout === 'carousel') {
    return (
      <div className={`overflow-x-auto ${className}`.trim()}>
        <div className="flex space-x-4 pb-4">
          {displayTestimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="flex-shrink-0 w-80">
              {testimonialCard(testimonial, index)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Default grid layout
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`.trim()}>
      {displayTestimonials.map(testimonialCard)}
    </div>
  )
}

// Component for individual testimonial (for flexible placement)
export function SingleTestimonial({ 
  testimonialId, 
  className = "",
  compact = false 
}: { 
  testimonialId: string
  className?: string
  compact?: boolean 
}) {
  const testimonial = testimonials.find(t => t.id === testimonialId)
  
  if (!testimonial) return null

  if (compact) {
    return (
      <div className={`bg-slate-50 rounded-lg p-4 border-l-4 border-blue-500 ${className}`.trim()}>
        <blockquote className="text-slate-700 text-sm italic mb-2">
          "{testimonial.quote}"
        </blockquote>
        <cite className="text-xs text-slate-600 not-italic">
          — {testimonial.author}, {testimonial.location}
        </cite>
      </div>
    )
  }

  return (
    <Card className={`bg-white/90 backdrop-blur border border-slate-200 ${className}`.trim()}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Quote className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <blockquote className="text-slate-700 text-sm leading-relaxed mb-2 italic">
              "{testimonial.quote}"
            </blockquote>
            <cite className="text-xs text-slate-600 not-italic">
              — {testimonial.author}, {testimonial.role}, {testimonial.location}
            </cite>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}