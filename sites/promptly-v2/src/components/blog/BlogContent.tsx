import { ReactNode } from 'react'

interface BlogContentProps {
  children: ReactNode
  className?: string
}

export default function BlogContent({ children, className = '' }: BlogContentProps) {
  return (
    <div className={`blog-content ${className}`}>
      {children}
    </div>
  )
}

// Pull Quote Component
interface PullQuoteProps {
  quote: string
  author?: string
  className?: string
}

export function PullQuote({ quote, author, className = '' }: PullQuoteProps) {
  return (
    <blockquote className={`relative bg-slate-800/30 border-l-4 border-brand-500 rounded-r-xl p-6 my-8 ${className}`}>
      <div className="absolute top-4 left-4 text-brand-400/20">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
        </svg>
      </div>
      <p className="text-lg text-white font-medium italic leading-relaxed pl-8">
        "{quote}"
      </p>
      {author && (
        <footer className="mt-4 pl-8">
          <cite className="text-slate-400 text-sm font-medium">
            — {author}
          </cite>
        </footer>
      )}
    </blockquote>
  )
}

// Highlight Box Component
interface HighlightBoxProps {
  children: ReactNode
  variant?: 'tip' | 'warning' | 'success' | 'info'
  title?: string
  className?: string
}

export function HighlightBox({ 
  children, 
  variant = 'info', 
  title, 
  className = '' 
}: HighlightBoxProps) {
  const variantStyles = {
    tip: 'bg-blue-900/20 border-blue-400/30 text-blue-400',
    warning: 'bg-amber-900/20 border-amber-400/30 text-amber-400',
    success: 'bg-green-900/20 border-green-400/30 text-green-400',
    info: 'bg-slate-800/40 border-slate-600/30 text-slate-400'
  }

  const icons = {
    tip: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.854-.833-2.624 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }

  return (
    <div className={`border rounded-2xl p-6 my-8 ${variantStyles[variant]} ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {icons[variant]}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold text-white mb-2 text-base">
              {title}
            </h4>
          )}
          <div className="text-slate-300 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// Section Divider
export function SectionDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center my-12 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
      <div className="px-4">
        <div className="w-2 h-2 rounded-full bg-brand-500"></div>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
    </div>
  )
}