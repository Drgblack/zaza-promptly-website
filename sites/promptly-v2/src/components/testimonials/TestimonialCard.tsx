'use client'

import Image from 'next/image'
import { Testimonial } from '@/content/testimonials'

interface TestimonialCardProps {
  testimonial: Testimonial
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

export default function TestimonialCard({ 
  testimonial, 
  variant = 'default',
  className = '' 
}: TestimonialCardProps) {
  if (variant === 'compact') {
    return (
      <div className={`bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-[120ms] ease-out ${className}`}>
        <blockquote className="text-slate-300 text-sm mb-3 leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <div className="flex items-center gap-2">
          <Image
            src={testimonial.avatar}
            alt={`${testimonial.name} headshot`}
            width={24}
            height={24}
            className="rounded-full"
          />
          <div className="text-xs text-slate-400">
            <span className="font-medium text-slate-300">{testimonial.name}</span>
            <span className="mx-1">•</span>
            <span>{testimonial.role}</span>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'featured') {
    return (
      <div className={`bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-[120ms] ease-out ${className}`}>
        {/* Quote Icon */}
        <div className="mb-6">
          <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>

        <blockquote className="text-xl text-white mb-6 leading-relaxed font-medium">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <div className="flex items-start gap-4">
          <Image
            src={testimonial.avatar}
            alt={`${testimonial.name} headshot`}
            width={64}
            height={64}
            className="rounded-full flex-shrink-0"
          />
          <div className="flex-1">
            <div className="font-semibold text-white text-lg">{testimonial.name}</div>
            <div className="text-purple-400 font-medium">{testimonial.role}</div>
            <div className="text-slate-400 text-sm">{testimonial.location}</div>
            <div className="mt-2 text-right text-sm text-slate-400">
              <div className="font-medium text-purple-400">{testimonial.impact}</div>
              <div>{testimonial.timeframe}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className={`bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-[120ms] ease-out ${className}`}>
      <blockquote className="text-slate-300 mb-4 leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      
      <div className="flex items-start gap-3">
        <Image
          src={testimonial.avatar}
          alt={`${testimonial.name} headshot`}
          width={48}
          height={48}
          className="rounded-full flex-shrink-0"
        />
        <div className="flex-1">
          <div className="font-semibold text-white">{testimonial.name}</div>
          <div className="text-slate-400 text-sm">{testimonial.role}</div>
          <div className="text-slate-500 text-xs">{testimonial.location}</div>
          <div className="mt-2 text-xs text-slate-500">
            <div className="font-medium text-slate-400">{testimonial.impact}</div>
            <div>{testimonial.timeframe}</div>
          </div>
        </div>
      </div>
      
      {testimonial.context && (
        <div className="mt-4 pt-4 border-t border-slate-700/50 text-xs text-slate-500">
          {testimonial.context}
        </div>
      )}
    </div>
  )
}
