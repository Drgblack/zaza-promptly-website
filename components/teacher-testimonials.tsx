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
    quote: "I got my Sunday nights back! What used to be three hours of report writing is now 45 minutes. The comments are more thoughtful than what I wrote before — parents have actually thanked me for the clarity.",
    author: "Sarah Thompson",
    location: "Manchester, UK",
    role: "Year 6 Teacher, 8 years experience"
  },
  {
    id: 'michael-california',
    quote: "As a department head, I was drowning in parent emails about grades and behavior. Promptly helps me respond professionally and empathetically without spending my entire evening crafting responses.",
    author: "Michael Chen",
    location: "San Francisco, CA",
    role: "Math Department Head"
  },
  {
    id: 'jenny-london',
    quote: "I was skeptical about AI in education, but Promptly is different. It understands SEND requirements and helps me write IEP comments that are both professional and caring. Game changer for inclusion.",
    author: "Jennifer Matthews",
    location: "London, UK",
    role: "SENCO & Year 3 Teacher"
  },
  {
    id: 'david-chicago',
    quote: "After 15 years teaching, parent conferences still stressed me out. Promptly helps me prepare talking points and follow-up emails that keep parents engaged and supportive of their child's learning.",
    author: "David Rodriguez",
    location: "Chicago, IL",
    role: "5th Grade Teacher"
  },
  {
    id: 'lisa-birmingham',
    quote: "I teach in a challenging area where parent communication is crucial. Promptly helps me write messages that build bridges rather than create barriers. My head teacher has noticed the improvement.",
    author: "Lisa Ahmed",
    location: "Birmingham, UK",
    role: "Secondary English Teacher"
  },
  {
    id: 'amanda-texas',
    quote: "Between lesson planning, grading, and parent emails, I was working 70-hour weeks. Promptly gave me back quality time with my own family while improving my professional communication.",
    author: "Amanda Parker",
    location: "Austin, TX",
    role: "Elementary Teacher & Mum of 2"
  },
  {
    id: 'jake-texas',
    quote: "Built by Dr. Greg Blackburn, a PhD educator, Promptly understands the nuances of school communication better than any generic AI tool. It's like having a colleague who's also a writing expert.",
    author: "Jake Morrison",
    location: "Dallas, TX",
    role: "High School History Teacher"
  },
  {
    id: 'emma-sydney',
    quote: "As a new teacher, I struggled with professional tone in parent emails. Promptly's suggestions helped me build confidence and communicate with the authority parents expect from their child's teacher.",
    author: "Emma Clarke",
    location: "Sydney, Australia", 
    role: "Primary School Teacher, 2nd year"
  },
  {
    id: 'priya-oxford',
    quote: "The GDPR compliance and data protection features give me complete confidence. I can use Promptly knowing student privacy is never compromised - essential in today's educational landscape.",
    author: "Dr. Priya Patel",
    location: "Oxford, UK",
    role: "Deputy Head & Safeguarding Lead"
  },
  {
    id: 'thomas-munich',
    quote: "Promptly works seamlessly in multiple languages. When communicating with our diverse parent community, it helps me maintain professionalism while being culturally sensitive.",
    author: "Thomas Mueller",
    location: "Munich, Germany",
    role: "International School Coordinator"
  },
  {
    id: 'maria-madrid',
    quote: "After using ChatGPT and other AI tools, Promptly stands out because it's specifically designed for education. The prompts understand classroom context and student development stages.",
    author: "María González",
    location: "Madrid, Spain",
    role: "Secondary Science Teacher"
  },
  {
    id: 'robert-canada',
    quote: "Promptly has transformed how our whole department communicates with parents. The consistency and professionalism across all teachers has improved parent satisfaction significantly.",
    author: "Robert Williams",
    location: "Toronto, Canada",
    role: "English Department Head"
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
          {displayTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex-shrink-0 w-80">
              {testimonialCard(testimonial, 0)}
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