'use client'

import { useState, useEffect } from 'react'
import { Star, Clock, Users, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Testimonial {
  id: string
  name: string
  role: string
  school?: string
  grade?: string
  subject?: string
  timeframe: string
  timeSaved: string
  rating: number
  quote: string
  beforeAfter: {
    before: string
    after: string
  }
  results: string[]
  location: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Primary Teacher',
    grade: 'Year 3',
    school: 'Oakwood Primary School',
    timeframe: 'Using Promptly for 8 months',
    timeSaved: '6.5 hours per week',
    rating: 5,
    quote: "I used to spend entire Sunday afternoons writing report comments. Now I finish them in an hour while my kids are still playing outside. Promptly doesn't just save time - it helps me write better feedback than I ever could on my own.",
    beforeAfter: {
      before: "Sunday afternoons: 4-6 hours writing 28 report comments, constantly worried about repetitive language",
      after: "Sunday morning: 45 minutes generating personalized comments, afternoon free for family activities"
    },
    results: [
      'Report writing time reduced from 6 hours to 45 minutes',
      'Parents commenting on improved feedback quality',
      'No more Sunday afternoon stress'
    ],
    location: 'Birmingham, UK'
  },
  {
    id: '2', 
    name: 'Marcus Thompson',
    role: 'Secondary Maths Teacher',
    grade: 'Years 7-11',
    school: 'Riverside Academy',
    timeframe: 'Using Promptly for 1 year',
    timeSaved: '4.2 hours per week',
    rating: 5,
    quote: "As a maths teacher, I struggled to articulate students' progress in ways parents could understand. Promptly transforms my technical observations into clear, supportive feedback that actually helps families support learning at home.",
    beforeAfter: {
      before: "Generic comments: 'Good progress in algebra' repeated across multiple reports",
      after: "Specific feedback: 'James shows strong algebraic thinking but benefits from visual representations when solving multi-step equations. Try using drawings or manipulatives at home.'"
    },
    results: [
      'Parent-teacher conference preparation time cut by 60%',
      'Parents report feeling more confident helping with homework',
      'Increased parent engagement in mathematics learning'
    ],
    location: 'Manchester, UK'
  },
  {
    id: '3',
    name: 'Dr. Jennifer Walsh',
    role: 'SENCO & Year 5 Teacher',
    grade: 'Year 5 + SEN Support',
    school: 'Meadowbrook Community School',
    timeframe: 'Using Promptly for 6 months',
    timeSaved: '8+ hours per week',
    rating: 5,
    quote: "Writing IEP updates and differentiated feedback was overwhelming. Promptly helps me capture each child's unique progress and translate complex educational jargon into language parents actually understand and can act on.",
    beforeAfter: {
      before: "IEP updates: 'Student requires continued support with literacy skills development'",
      after: "'Emma has made excellent progress with phonics blending and can now read CVC words independently. She benefits from multisensory approaches and responds well to tactile letter formation practice. Continue using sandpaper letters at home.'"
    },
    results: [
      'IEP writing time reduced from 3 hours to 30 minutes per student',
      'Parents implementing more strategies at home',
      'Improved collaboration between home and school'
    ],
    location: 'Leeds, UK'
  },
  {
    id: '4',
    name: 'Tom Harrison',
    role: 'Head of English',
    grade: 'Years 7-13',
    school: 'Westfield Secondary College',
    timeframe: 'Using Promptly for 10 months',
    timeSaved: '5.5 hours per week',
    rating: 5,
    quote: "I was skeptical about AI feedback until I realized it wasn't replacing my expertise - it was amplifying it. I can now give every student the detailed, personalized feedback they deserve without sacrificing my weekends.",
    beforeAfter: {
      before: "Marking 120 essays: 'Good use of imagery, work on paragraph structure' - same comment variations",
      after: "Each essay gets specific feedback: 'Your metaphor of the storm representing internal conflict is powerful. To strengthen your argument, try connecting this imagery to the character's decision in paragraph 4.'"
    },
    results: [
      'Student writing quality improved by 23% (internal assessment)',
      'Feedback turnaround time reduced from 2 weeks to 3 days',
      'Work-life balance dramatically improved'
    ],
    location: 'Bristol, UK'
  }
]

export function EnhancedTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4 mr-2 fill-current" />
            Real Teacher Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Teachers Are Getting Their Lives Back
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of teachers who've transformed their feedback process and reclaimed their personal time.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Testimonial Content */}
                <div className="lg:col-span-2">
                  <div className="flex items-center mb-6">
                    <Quote className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {currentTestimonial.name}
                      </h3>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {currentTestimonial.role}
                        {currentTestimonial.grade && ` • ${currentTestimonial.grade}`}
                      </div>
                      {currentTestimonial.school && (
                        <div className="text-sm text-gray-500 dark:text-gray-500">
                          {currentTestimonial.school} • {currentTestimonial.location}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {currentTestimonial.timeframe}
                    </span>
                  </div>

                  <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic">
                    "{currentTestimonial.quote}"
                  </blockquote>

                  {/* Before/After */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">
                      The Transformation:
                    </h4>
                    <div className="grid gap-4">
                      <div className="flex items-start">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <div>
                          <div className="text-xs font-medium text-red-700 dark:text-red-400 mb-1">Before Promptly:</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{currentTestimonial.beforeAfter.before}</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <div>
                          <div className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">With Promptly:</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{currentTestimonial.beforeAfter.after}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">
                      Measurable Results:
                    </h4>
                    <ul className="space-y-2">
                      {currentTestimonial.results.map((result, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Stats Sidebar */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 h-fit">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {currentTestimonial.timeSaved}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Time saved weekly
                    </div>
                  </div>

                  <div className="space-y-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">5★</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {currentTestimonial.timeframe.split(' ')[2]}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Months using Promptly
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-6 gap-4">
            <Button variant="outline" size="sm" onClick={prevTestimonial}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={nextTestimonial}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Aggregate Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            The Numbers Don't Lie
          </h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">12,000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Teachers using Promptly</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">5.2 hrs</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average weekly time saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">94%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Report improved work-life balance</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">4.9/5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average teacher rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}