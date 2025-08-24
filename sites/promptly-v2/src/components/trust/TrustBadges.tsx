'use client'

interface TrustBadge {
  id: string
  icon: string
  title: string
  subtitle: string
  color?: 'green' | 'blue' | 'purple' | 'orange'
}

const TRUST_BADGES: TrustBadge[] = [
  {
    id: 'gdpr-compliant',
    icon: '🔒',
    title: 'GDPR Compliant',
    subtitle: 'Full data protection compliance',
    color: 'blue'
  },
  {
    id: 'safe-for-teachers',
    icon: '🛡️',
    title: 'Safe for Teachers',
    subtitle: 'Hallucination-safe AI technology',
    color: 'green'
  },
  {
    id: 'built-by-educators',
    icon: '🎓',
    title: 'Built by Educators',
    subtitle: 'Designed by teachers for teachers',
    color: 'purple'
  },
  {
    id: 'phd-backed',
    icon: '🏆',
    title: 'PhD-Backed Research',
    subtitle: 'Grounded in educational expertise',
    color: 'orange'
  }
]

interface TrustBadgesProps {
  variant?: 'default' | 'compact' | 'inline'
  className?: string
  showTitle?: boolean
}

export default function TrustBadges({ 
  variant = 'default',
  className = '',
  showTitle = false
}: TrustBadgesProps) {
  
  const getColorClasses = (color?: string) => {
    switch (color) {
      case 'green':
        return 'border-green-500/30 bg-green-500/10 text-green-400'
      case 'blue':
        return 'border-blue-500/30 bg-blue-500/10 text-blue-400'
      case 'purple':
        return 'border-purple-500/30 bg-purple-500/10 text-purple-400'
      case 'orange':
        return 'border-orange-500/30 bg-orange-500/10 text-orange-400'
      default:
        return 'border-slate-600/30 bg-slate-800/40 text-slate-300'
    }
  }

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap justify-center gap-4 text-sm ${className}`}>
        {TRUST_BADGES.map((badge) => (
          <div key={badge.id} className="flex items-center gap-2 text-slate-400">
            <span className="text-lg">{badge.icon}</span>
            <span className="font-medium">{badge.title}</span>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`${className}`}>
        {showTitle && (
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            Trusted & Secure
          </h3>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TRUST_BADGES.map((badge) => (
            <div 
              key={badge.id} 
              className={`p-3 rounded-lg border text-center transition-colors hover:border-opacity-60 ${getColorClasses(badge.color)}`}
            >
              <div className="text-lg mb-1">{badge.icon}</div>
              <div className="text-xs font-medium text-white">{badge.title}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <section className={`py-12 ${className}`}>
      <div className="container">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-white mb-3">
              Built for Trust & Safety
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Promptly meets the highest standards for educational technology, 
              with built-in safeguards and compliance features.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {TRUST_BADGES.map((badge) => (
            <div 
              key={badge.id} 
              className={`p-6 rounded-xl border text-center transition-all duration-200 hover:border-opacity-60 hover:scale-105 ${getColorClasses(badge.color)}`}
            >
              <div className="text-3xl mb-4">{badge.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{badge.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{badge.subtitle}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            Created by{' '}
            <a 
              href="/about/founder" 
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Dr Greg Blackburn, PhD in Professional Education
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
