"use client"

import { Shield, Lock, GraduationCap, CheckCircle, Globe, Users, Award, BookOpen, Heart, Zap } from 'lucide-react'

interface TrustBadge {
  id: string
  icon: React.ComponentType<any>
  title: string
  description: string
}

const trustBadges: TrustBadge[] = [
  {
    id: 'phd-educator-built',
    icon: GraduationCap,
    title: 'Built by a PhD Educator',
    description: 'Dr. Greg Blackburn: PhD in Professional Education, 20+ years teaching experience'
  },
  {
    id: 'hallucination-safe',
    icon: Shield,
    title: 'Hallucination-Safe AI',
    description: 'Never invents false information about students - guaranteed accuracy'
  },
  {
    id: 'teacher-trusted',
    icon: Users,
    title: '12,000+ Teachers Worldwide',
    description: 'Educators in UK, US, Germany, Australia trust our safe AI'
  },
  {
    id: 'gdpr-compliant',
    icon: Lock,
    title: 'GDPR Compliant & School-Safe',
    description: 'EU privacy standards, never trains on your data, school-approved'
  },
  {
    id: 'professional-education',
    icon: CheckCircle,
    title: 'Professional Education Focus',
    description: 'Understands curriculum, pedagogy, and professional communication standards'
  },
  {
    id: 'backed-by-educators',
    icon: Globe,
    title: 'Backed by Educators',
    description: 'Designed with input from teachers, head teachers, and education professionals'
  },
  {
    id: 'education-research-based',
    icon: BookOpen,
    title: 'Education Research-Based',
    description: 'Built on proven pedagogical principles and evidence-based teaching practices'
  },
  {
    id: 'safe-for-teachers',
    icon: Heart,
    title: 'Safe for Teachers',
    description: 'Designed specifically for educators with built-in classroom safety features'
  },
  {
    id: 'pedagogically-sound',
    icon: Award,
    title: 'Pedagogically Sound',
    description: 'Every feature aligned with best practices in professional education and student development'
  },
  {
    id: 'teacher-time-saver',
    icon: Zap,
    title: 'Proven Time Saver',
    description: '12,000+ teachers save 5+ hours weekly with our educator-focused AI tools'
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