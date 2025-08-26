import Link from 'next/link'

interface InlineCTAProps {
  variant?: 'default' | 'tip' | 'success' | 'highlight'
  title: string
  description: string
  ctaText: string
  ctaLink: string
  icon?: React.ReactNode
  className?: string
}

export default function InlineCTA({
  variant = 'default',
  title,
  description,
  ctaText,
  ctaLink,
  icon,
  className = ''
}: InlineCTAProps) {
  const variantStyles = {
    default: 'bg-slate-800/40 border-brand-500/30',
    tip: 'bg-blue-900/20 border-blue-400/30',
    success: 'bg-green-900/20 border-green-400/30',
    highlight: 'bg-amber-900/20 border-amber-400/30'
  }

  const iconStyles = {
    default: 'text-brand-400',
    tip: 'text-blue-400',
    success: 'text-green-400',
    highlight: 'text-amber-400'
  }

  const defaultIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )

  return (
    <div className={`border rounded-2xl p-6 my-8 ${variantStyles[variant]} ${className}`}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`flex-shrink-0 ${iconStyles[variant]}`}>
          {icon || defaultIcon}
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-2 text-lg">
            {title}
          </h3>
          <p className="text-slate-300 mb-4 leading-relaxed">
            {description}
          </p>
          <Link
            href={ctaLink}
            className={`inline-flex items-center px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900`}
          >
            {ctaText}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Pre-configured CTA variants for common use cases
export function SaveTimeCTA({ className = '' }: { className?: string }) {
  return (
    <InlineCTA
      variant="tip"
      title="💡 Save Time Today"
      description="Join thousands of teachers who are already saving 3+ hours per week with Promptly's AI-powered writing assistant."
      ctaText="Try Promptly Free"
      ctaLink="/waitlist"
      className={className}
      icon={
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      }
    />
  )
}

export function GetStartedCTA({ className = '' }: { className?: string }) {
  return (
    <InlineCTA
      variant="success"
      title="🚀 Ready to Transform Your Teaching?"
      description="See how Promptly can help you write better reports, emails, and feedback in half the time."
      ctaText="Get Started Free"
      ctaLink="/waitlist"
      className={className}
      icon={
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      }
    />
  )
}

export function LearnMoreCTA({ title, description, className = '' }: { title?: string, description?: string, className?: string }) {
  return (
    <InlineCTA
      variant="highlight"
      title={title || "💭 Want to Learn More?"}
      description={description || "Discover more teacher-friendly AI tips and strategies in our learning centre."}
      ctaText="Explore Resources"
      ctaLink="/learning-centre"
      className={className}
      icon={
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      }
    />
  )
}