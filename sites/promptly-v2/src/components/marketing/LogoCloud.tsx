'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import ScrollReveal from '@/components/animations/ScrollReveal'

interface Logo {
  name: string
  src: string
  alt: string
}

const logos: Logo[] = [
  {
    name: 'Greenfield Academy',
    src: '/images/logos/greenfield-academy.svg',
    alt: 'Greenfield Academy logo'
  },
  {
    name: 'Oaklands Secondary School',
    src: '/images/logos/oaklands-secondary.svg',
    alt: 'Oaklands Secondary School logo'
  },
  {
    name: "St. Mary's Primary School",
    src: '/images/logos/st-marys-primary.svg',
    alt: "St. Mary's Primary School logo"
  },
  {
    name: 'Riverside Academy',
    src: '/images/logos/riverside-academy.svg',
    alt: 'Riverside Academy logo'
  },
  {
    name: 'Phoenix High School',
    src: '/images/logos/phoenix-high.svg',
    alt: 'Phoenix High School logo'
  },
  {
    name: 'Elmwood Academy',
    src: '/images/logos/elmwood-academy.svg',
    alt: 'Elmwood Academy logo'
  }
]

interface LogoCloudProps {
  title?: string
  subtitle?: string
  className?: string
}

export default function LogoCloud({ 
  title = "Trusted by educators across the UK",
  subtitle,
  className 
}: LogoCloudProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <section className={cn('py-16', className)}>
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal duration={0.22}>
            {(title || subtitle) && (
              <div className="text-center mb-12">
                {title && (
                  <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
          </ScrollReveal>
          
          <ScrollReveal duration={0.28} delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {logos.map((logo, index) => (
              <div
                key={logo.name}
                className={cn(
                  'flex items-center justify-center p-4 rounded-lg',
                  'text-slate-500 hover:text-slate-300',
                  'grayscale hover:grayscale-0',
                  !prefersReducedMotion && 'transition-all duration-300 ease-in-out',
                  !prefersReducedMotion && 'hover:scale-105'
                )}
                style={{
                  animationDelay: !prefersReducedMotion ? `${index * 100}ms` : '0ms'
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={40}
                  className="max-w-full h-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
            </div>
          </ScrollReveal>
          
          {/* Stats */}
          <ScrollReveal duration={0.25} delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
              <div>
                <div className="text-3xl font-bold text-brand-400 mb-2">500+</div>
                <div className="text-slate-400">Schools using Promptly</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-400 mb-2">10,000+</div>
                <div className="text-slate-400">Teachers saving time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-400 mb-2">4.8/5</div>
                <div className="text-slate-400">Average teacher rating</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}