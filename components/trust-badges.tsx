"use client"

import { Shield, Lock, GraduationCap, CheckCircle, Globe, Users } from 'lucide-react'

interface TrustBadge {
  id: string
  icon: React.ComponentType<any>
  title: string
  description: string
}

const trustBadges: TrustBadge[] = [
  {
    id: 'hallucination-safe',
    icon: Shield,
    title: 'Hallucination-Safe AI',
    description: 'Never invents false information about students'
  },
  {
    id: 'phd-designed',
    icon: GraduationCap,
    title: 'PhD-Designed Pedagogy',
    description: 'Created by Dr. Greg Blackburn, 20+ years teaching'
  },
  {
    id: 'gdpr-compliant',
    icon: Lock,
    title: 'GDPR Compliant',
    description: 'EU privacy standards for school data protection'
  },
  {
    id: 'teacher-trusted',
    icon: Users,
    title: '12,000+ Teachers Trust Us',
    description: 'Educators worldwide choose safe AI for teachers'
  },
  {
    id: 'no-training',
    icon: CheckCircle,
    title: 'Never Trains on Your Data',
    description: 'Your student information stays completely private'
  },
  {
    id: 'education-specific',
    icon: Globe,
    title: 'Education-Specific AI',
    description: 'Built for teachers, not generic chatbots'
  }
]

interface TrustBadgesProps {
  className?: string
  layout?: 'row' | 'grid' | 'minimal'
  showDescriptions?: boolean
  limit?: number
}

export function TrustBadges({ 
  className = "", 
  layout = 'row',
  showDescriptions = true,
  limit
}: TrustBadgesProps) {
  const displayBadges = limit ? trustBadges.slice(0, limit) : trustBadges

  if (layout === 'minimal') {
    return (
      <div className={`flex flex-wrap justify-center items-center gap-4 ${className}`.trim()}>
        {displayBadges.map((badge) => {
          const IconComponent = badge.icon
          return (
            <div 
              key={badge.id}
              className="group flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors"
              title={badge.description}
            >
              <IconComponent className="w-4 h-4" />
              <span className="text-sm font-medium">{badge.title}</span>
            </div>
          )
        })}
      </div>
    )
  }

  if (layout === 'grid') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-6 ${className}`.trim()}>
        {displayBadges.map((badge) => {
          const IconComponent = badge.icon
          return (
            <div key={badge.id} className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">{badge.title}</h4>
              {showDescriptions && (
                <p className="text-sm text-slate-600">{badge.description}</p>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // Default row layout
  return (
    <div className={`flex flex-wrap justify-center items-center gap-6 ${className}`.trim()}>
      {displayBadges.map((badge) => {
        const IconComponent = badge.icon
        return (
          <div 
            key={badge.id}
            className="group flex flex-col items-center text-center max-w-[120px]"
          >
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-slate-200 transition-colors">
              <IconComponent className="w-5 h-5 text-slate-600" />
            </div>
            <div className="text-xs font-medium text-slate-700 mb-1">{badge.title}</div>
            {showDescriptions && (
              <div className="text-xs text-slate-500 leading-tight">{badge.description}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Individual badge component for flexible placement
export function TrustBadge({ 
  badgeId, 
  className = "",
  variant = 'default'
}: { 
  badgeId: string
  className?: string
  variant?: 'default' | 'compact' | 'icon-only'
}) {
  const badge = trustBadges.find(b => b.id === badgeId)
  
  if (!badge) return null

  const IconComponent = badge.icon

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`.trim()} title={badge.description}>
        <IconComponent className="w-5 h-5 text-slate-600" />
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center space-x-2 text-slate-600 ${className}`.trim()}>
        <IconComponent className="w-4 h-4" />
        <span className="text-sm font-medium">{badge.title}</span>
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`.trim()}>
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
        <IconComponent className="w-4 h-4 text-white" />
      </div>
      <div>
        <div className="font-medium text-slate-900">{badge.title}</div>
        <div className="text-sm text-slate-600">{badge.description}</div>
      </div>
    </div>
  )
}