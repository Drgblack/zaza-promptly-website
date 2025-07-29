"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  School,
  GraduationCap,
  BookOpen,
  Users,
  Heart,
  Sparkles
} from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  school?: string
  grade?: string
  location: string
  content: string
  rating: number
  avatar: string
  resourceUsed?: string
  timesSaved?: string
  featured?: boolean
}

interface TestimonialsSectionProps {
  variant?: 'grid' | 'carousel' | 'marquee' | 'featured'
  showLogos?: boolean
  showStats?: boolean
  className?: string
}

export function TestimonialsSection({
  variant = 'grid',
  showLogos = true,
  showStats = true,
  className = ''
}: TestimonialsSectionProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching testimonials (in production, this would be an API call)
    const mockTestimonials: Testimonial[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        role: '3rd Grade Teacher',
        school: 'Maple Elementary',
        grade: '3rd Grade',
        location: 'California, USA',
        content: 'Zaza Promptly has completely transformed my lesson planning! The AI templates save me 6 hours every week. I can now focus on what really matters - teaching my students.',
        rating: 5,
        avatar: '👩‍🏫',
        resourceUsed: 'AI Lesson Planning Templates',
        timesSaved: '6 hours/week',
        featured: true
      },
      {
        id: '2',
        name: 'Michael Chen',
        role: 'High School Science Teacher',
        school: 'Lincoln High School',
        grade: '9th-12th Grade',
        location: 'Texas, USA',
        content: 'The parent communication templates are game-changers. Difficult conversations are now much easier to navigate, and parents appreciate the thoughtful approach.',
        rating: 5,
        avatar: '👨‍🔬',
        resourceUsed: 'Parent Communication Kit',
        timesSaved: '4 hours/week'
      },
      {
        id: '3',
        name: 'Emma Rodriguez',
        role: 'Elementary Teacher',
        school: 'Sunrise Elementary',
        grade: '2nd Grade',
        location: 'Florida, USA',
        content: 'As a new teacher, these resources have been invaluable. The AI feedback generator helps me provide meaningful comments on assignments without spending entire weekends grading.',
        rating: 5,
        avatar: '👩‍🎓',
        resourceUsed: 'AI Feedback Generator',
        timesSaved: '8 hours/week'
      },
      {
        id: '4',
        name: 'David Thompson',
        role: 'Middle School English',
        school: 'Roosevelt Middle School',
        grade: '6th-8th Grade',
        location: 'New York, USA',
        content: 'The differentiation templates have helped me create multiple versions of assignments effortlessly. Every student gets work that matches their level.',
        rating: 5,
        avatar: '👨‍🏫',
        resourceUsed: 'Differentiation Templates',
        timesSaved: '5 hours/week'
      },
      {
        id: '5',
        name: 'Lisa Park',
        role: 'Special Education Teacher',
        school: 'Valley View School',
        grade: 'K-12 SpEd',
        location: 'Oregon, USA',
        content: 'The IEP writing assistance is phenomenal. What used to take me hours now takes minutes, and the quality is consistently professional.',
        rating: 5,
        avatar: '👩‍💼',
        resourceUsed: 'IEP Writing Templates',
        timesSaved: '10 hours/week',
        featured: true
      },
      {
        id: '6',
        name: 'James Wilson',
        role: 'High School Math Teacher',
        school: 'Central High School',
        grade: '9th-12th Grade',
        location: 'Michigan, USA',
        content: 'The problem-solving scaffolds have transformed how I teach math. Students are more engaged and confident in tackling complex problems.',
        rating: 5,
        avatar: '👨‍💻',
        resourceUsed: 'Math Problem Scaffolds',
        timesSaved: '3 hours/week'
      }
    ]

    setTestimonials(mockTestimonials)
    setIsLoading(false)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const featuredTestimonials = testimonials.filter(t => t.featured)
  const displayTestimonials = variant === 'featured' ? featuredTestimonials : testimonials

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Loved by Teachers Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of educators who are already saving time and improving their teaching with our AI-powered tools.
          </p>
        </div>

        {/* Stats */}
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">1,200+</div>
              <div className="text-sm text-gray-600">Teachers Using</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">5.0</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">6.5hrs</div>
              <div className="text-sm text-gray-600">Average Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-sm text-gray-600">Free Resources</div>
            </div>
          </div>
        )}

        {/* School Logos */}
        {showLogos && (
          <div className="mb-16">
            <p className="text-center text-gray-500 mb-8">Trusted by educators at schools across the country</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Mock school logos - in production, these would be actual logos */}
              <div className="flex items-center space-x-2 text-gray-400">
                <School className="w-8 h-8" />
                <span className="font-semibold">Lincoln Elementary</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <GraduationCap className="w-8 h-8" />
                <span className="font-semibold">Roosevelt High</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <BookOpen className="w-8 h-8" />
                <span className="font-semibold">Maple Middle School</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Users className="w-8 h-8" />
                <span className="font-semibold">Sunrise Academy</span>
              </div>
            </div>
          </div>
        )}

        {/* Testimonials Display */}
        {variant === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}

        {variant === 'carousel' && (
          <div className="relative">
            <div className="max-w-4xl mx-auto">
              <TestimonialCard 
                testimonial={displayTestimonials[currentTestimonial]} 
                variant="large"
              />
            </div>
            
            <div className="flex justify-center items-center mt-8 space-x-4">
              <Button
                onClick={prevTestimonial}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex space-x-2">
                {displayTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                onClick={nextTestimonial}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {variant === 'featured' && (
          <div className="space-y-12">
            {featuredTestimonials.map((testimonial, index) => (
              <div key={testimonial.id} className={`${index % 2 === 0 ? '' : 'lg:flex-row-reverse'} flex flex-col lg:flex-row items-center gap-12`}>
                <div className="lg:w-1/2">
                  <TestimonialCard testimonial={testimonial} variant="featured" />
                </div>
                <div className="lg:w-1/2">
                  <div className="space-y-4">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      {testimonial.resourceUsed}
                    </Badge>
                    <div className="text-4xl font-bold text-purple-600">
                      {testimonial.timesSaved}
                    </div>
                    <div className="text-gray-600">
                      Time saved per week using our AI tools
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// Individual testimonial card component
function TestimonialCard({ 
  testimonial, 
  variant = 'default' 
}: { 
  testimonial: Testimonial
  variant?: 'default' | 'large' | 'featured'
}) {
  const isLarge = variant === 'large'
  const isFeatured = variant === 'featured'

  return (
    <Card className={`${isLarge ? 'max-w-2xl mx-auto' : ''} ${isFeatured ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50' : ''} relative overflow-hidden`}>
      <CardContent className={`${isLarge ? 'p-8' : 'p-6'} relative`}>
        {/* Quote icon */}
        <div className="absolute top-4 right-4 opacity-20">
          <Quote className={`${isLarge ? 'w-8 h-8' : 'w-6 h-6'} text-purple-600`} />
        </div>

        {/* Rating stars */}
        <div className="flex items-center mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>

        {/* Testimonial content */}
        <blockquote className={`${isLarge ? 'text-lg' : 'text-base'} text-gray-700 mb-6 leading-relaxed`}>
          "{testimonial.content}"
        </blockquote>

        {/* Author info */}
        <div className="flex items-start space-x-4">
          <div className={`${isLarge ? 'text-4xl' : 'text-2xl'} flex-shrink-0`}>
            {testimonial.avatar}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{testimonial.name}</div>
            <div className="text-sm text-gray-600">{testimonial.role}</div>
            {testimonial.school && (
              <div className="text-sm text-gray-500">{testimonial.school}</div>
            )}
            <div className="text-sm text-gray-500">{testimonial.location}</div>
          </div>
        </div>

        {/* Resource used badge */}
        {testimonial.resourceUsed && !isFeatured && (
          <div className="mt-4">
            <Badge variant="outline" className="text-xs">
              Used: {testimonial.resourceUsed}
            </Badge>
          </div>
        )}

        {/* Time saved indicator */}
        {testimonial.timesSaved && !isFeatured && (
          <div className="mt-2 flex items-center text-sm text-green-600">
            <Sparkles className="w-4 h-4 mr-1" />
            Saves {testimonial.timesSaved}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Compact testimonial component for sidebars or smaller spaces
export function CompactTestimonial({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center mb-2">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
        ))}
      </div>
      
      <p className="text-sm text-gray-700 mb-3 line-clamp-3">
        "{testimonial.content}"
      </p>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm">{testimonial.avatar}</span>
        <div>
          <div className="text-xs font-medium text-gray-900">{testimonial.name}</div>
          <div className="text-xs text-gray-500">{testimonial.role}</div>
        </div>
      </div>
    </div>
  )
}

// Testimonial submission form (for collecting new testimonials)
export function TestimonialSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1000)
  }

  if (submitted) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600">
            Your testimonial has been submitted and will be reviewed shortly.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Share Your Experience</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Experience
            </label>
            <textarea
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="How has Zaza Promptly helped you as a teacher?"
            />
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}