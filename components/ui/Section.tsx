import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  background?: 'none' | 'gradient' | 'soft' | 'dark'
  fullBleed?: boolean
}

export function Section({ 
  children, 
  className = '', 
  background = 'none',
  fullBleed = false
}: SectionProps) {
  const backgroundClasses = {
    none: '',
    gradient: 'bg-gradient-to-br from-blue-900 via-blue-800 to-amber-500',
    soft: 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50',
    dark: 'bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950'
  }

  if (fullBleed) {
    return (
      <section className={`relative w-full overflow-hidden ${backgroundClasses[background]}`}>
        {background !== 'none' && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        )}
        <div className={`relative ${className}`}>
          {children}
        </div>
      </section>
    )
  }

  return (
    <section className={`py-16 md:py-20 ${backgroundClasses[background]} ${className}`}>
      {children}
    </section>
  )
}