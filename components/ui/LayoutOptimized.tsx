'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

// Optimized container that prevents layout shifts
interface ResponsiveContainerProps {
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

export function ResponsiveContainer({ 
  children, 
  maxWidth = 'lg', 
  padding = 'md',
  className = '' 
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md', 
    lg: 'max-w-4xl',
    xl: 'max-w-5xl',
    '2xl': 'max-w-6xl',
    '4xl': 'max-w-7xl',
    '6xl': 'max-w-8xl',
    full: 'max-w-full'
  }

  const paddingClasses = {
    none: '',
    sm: 'px-3 py-2 sm:px-4 sm:py-3',
    md: 'px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8',
    lg: 'px-6 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-12'
  }

  return (
    <div className={cn(
      'mx-auto w-full',
      maxWidthClasses[maxWidth],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  )
}

// Fixed height container to prevent CLS
interface FixedHeightContainerProps {
  children: React.ReactNode
  minHeight: string
  className?: string
}

export function FixedHeightContainer({ children, minHeight, className = '' }: FixedHeightContainerProps) {
  return (
    <div 
      className={cn('w-full', className)}
      style={{ minHeight }}
    >
      {children}
    </div>
  )
}

// Optimized grid that maintains aspect ratios
interface ResponsiveGridProps {
  children: React.ReactNode
  cols?: {
    default: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ResponsiveGrid({ 
  children, 
  cols = { default: 1, sm: 2, lg: 3 },
  gap = 'md',
  className = '' 
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8'
  }

  const gridClasses = [
    `grid-cols-${cols.default}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`
  ].filter(Boolean).join(' ')

  return (
    <div className={cn(
      'grid',
      gridClasses,
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}

// Skeleton loader to prevent layout shifts during loading
interface SkeletonProps {
  className?: string
  width?: string
  height?: string
  rounded?: boolean
}

export function Skeleton({ className = '', width = 'w-full', height = 'h-4', rounded = true }: SkeletonProps) {
  return (
    <div 
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-gray-700',
        rounded && 'rounded',
        width,
        height,
        className
      )}
    />
  )
}

// Card skeleton for consistent loading states
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={cn('p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm', className)}>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Skeleton width="w-10" height="h-10" />
          <div className="space-y-2 flex-1">
            <Skeleton width="w-1/3" height="h-4" />
            <Skeleton width="w-1/2" height="h-3" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton width="w-full" height="h-3" />
          <Skeleton width="w-5/6" height="h-3" />
          <Skeleton width="w-4/6" height="h-3" />
        </div>
        <div className="flex space-x-2">
          <Skeleton width="w-20" height="h-8" />
          <Skeleton width="w-16" height="h-8" />
        </div>
      </div>
    </div>
  )
}

// Aspect ratio container to prevent layout shifts for images/videos
interface AspectRatioProps {
  children: React.ReactNode
  ratio?: '1:1' | '4:3' | '16:9' | '3:2' | '21:9'
  className?: string
}

export function AspectRatio({ children, ratio = '16:9', className = '' }: AspectRatioProps) {
  const ratioClasses = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-video', 
    '3:2': 'aspect-[3/2]',
    '21:9': 'aspect-[21/9]'
  }

  return (
    <div className={cn('relative overflow-hidden', ratioClasses[ratio], className)}>
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  )
}

// Optimized button that prevents layout shifts
interface StableButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function StableButton({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false,
  variant = 'primary',
  size = 'md',
  className = '' 
}: StableButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-purple-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-purple-500'
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md min-h-[32px]',
    md: 'px-4 py-2 text-sm rounded-md min-h-[40px]',
    lg: 'px-6 py-3 text-base rounded-lg min-h-[48px]'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      style={{ minWidth: '120px' }} // Prevents horizontal layout shifts
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}

// Text container that prevents layout shifts due to font loading
interface StableTextProps {
  children: React.ReactNode
  variant?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
}

export function StableText({ children, variant = 'p', className = '' }: StableTextProps) {
  const Component = variant as keyof JSX.IntrinsicElements

  const baseClasses = {
    h1: 'text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight',
    h2: 'text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight',
    h3: 'text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight',
    p: 'text-base sm:text-lg leading-relaxed',
    span: 'text-base leading-normal'
  }

  return (
    <Component 
      className={cn(
        baseClasses[variant],
        'font-display', // Ensures consistent font loading
        className
      )}
      style={{
        lineHeight: variant.startsWith('h') ? '1.2' : '1.6' // Consistent line heights
      }}
    >
      {children}
    </Component>
  )
}

// Mobile-optimized spacing utility
export function MobileSpacing({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn('space-y-4 sm:space-y-6 lg:space-y-8', className)}>
      {children}
    </div>
  )
}

// Viewport height that accounts for mobile browser bars
interface SafeViewportProps {
  children: React.ReactNode
  className?: string
}

export function SafeViewport({ children, className = '' }: SafeViewportProps) {
  const [viewportHeight, setViewportHeight] = useState('100vh')

  useEffect(() => {
    function updateViewportHeight() {
      // Use the actual viewport height, accounting for mobile browser bars
      setViewportHeight(`${window.innerHeight}px`)
    }

    updateViewportHeight()
    window.addEventListener('resize', updateViewportHeight)
    window.addEventListener('orientationchange', updateViewportHeight)

    return () => {
      window.removeEventListener('resize', updateViewportHeight)
      window.removeEventListener('orientationchange', updateViewportHeight)
    }
  }, [])

  return (
    <div 
      className={cn('w-full', className)}
      style={{ minHeight: viewportHeight }}
    >
      {children}
    </div>
  )
}