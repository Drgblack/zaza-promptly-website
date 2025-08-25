import React from 'react'
import { TeacherTestimonial } from '@/data/teacherTestimonials'

interface EnhancedTestimonialsProps {
  testimonials: TeacherTestimonial[]
  title: string
  subtitle?: string
  className?: string
  variant?: 'grid' | 'carousel'
}

export default function EnhancedTestimonials({
  testimonials,
  title,
  subtitle,
  className = '',
  variant = 'grid'
}: EnhancedTestimonialsProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-slate-400 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className={`${variant === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}`}>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-6 hover:bg-slate-800/60 transition-colors"
              >
                {/* Quote */}
                <blockquote className="text-slate-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Author Info */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm">
                      {testimonial.author}
                    </div>
                    <div className="text-slate-400 text-sm">
                      {testimonial.role}
                    </div>
                    <div className="text-slate-500 text-xs mt-1">
                      {testimonial.location} • {testimonial.experience}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Trust indicators */}
          <div className="text-center mt-12 pt-8 border-t border-slate-700/30">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                12,000+ teachers worldwide
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.8/5 average rating
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                GDPR compliant & safe
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}