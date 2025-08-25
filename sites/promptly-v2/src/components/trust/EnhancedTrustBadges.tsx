import React from 'react'

interface TrustBadgeProps {
  className?: string
  variant?: 'compact' | 'full'
}

export default function EnhancedTrustBadges({ 
  className = '', 
  variant = 'full' 
}: TrustBadgeProps) {
  const badges = [
    {
      id: 'gdpr-compliant',
      icon: (
        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      title: 'GDPR Compliant',
      subtitle: 'UK & EU Data Protection'
    },
    {
      id: 'hallucination-safe',
      icon: (
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Hallucination-Safe',
      subtitle: 'No False Information'
    },
    {
      id: 'phd-designed',
      icon: (
        <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      ),
      title: 'PhD-Designed Pedagogy',
      subtitle: 'Education Research-Backed'
    },
    {
      id: 'built-for-teachers',
      icon: (
        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Built for Teachers',
      subtitle: 'By Educators, For Educators'
    }
  ]

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-full border border-slate-700/30"
          >
            {badge.icon}
            <span className="text-slate-300 text-sm font-medium">
              {badge.title}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <section className={`py-12 ${className}`}>
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-white mb-2">
              Trusted AI for Education
            </h2>
            <p className="text-slate-400 text-sm">
              Designed with teacher safety, student privacy, and educational excellence in mind
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="text-center p-6 bg-slate-800/30 rounded-lg border border-slate-700/20"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-700/50 rounded-lg mb-3">
                  {badge.icon}
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">
                  {badge.title}
                </h3>
                <p className="text-slate-400 text-xs">
                  {badge.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}