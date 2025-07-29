'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty' | 'skeleton'
  blurDataURL?: string
  sizes?: string
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'skeleton',
  blurDataURL,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px 0px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [priority, isInView])

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc: string) => {
    const formats = ['webp', 'avif']
    const sizes = [320, 640, 768, 1024, 1280, 1920]
    
    // For demo purposes, we'll simulate different sizes
    // In a real app, you'd use a service like Cloudinary or Next.js Image Optimization
    return sizes.map(size => `${baseSrc}?w=${size}&q=${quality} ${size}w`).join(', ')
  }

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // Skeleton placeholder
  const SkeletonPlaceholder = () => (
    <div 
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-gray-700 rounded',
        width && height ? '' : 'aspect-video',
        className
      )}
      style={{ width, height }}
    />
  )

  // Blur placeholder
  const BlurPlaceholder = () => (
    <div
      className={cn('overflow-hidden rounded', className)}
      style={{ width, height }}
    >
      <img
        src={blurDataURL || `data:image/svg+xml;base64,${btoa('<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#f3f4f6"/></svg>')}`}
        alt=""
        className="w-full h-full object-cover filter blur-sm scale-110"
      />
    </div>
  )

  return (
    <div 
      ref={containerRef}
      className={cn('relative overflow-hidden', !isLoaded && 'bg-gray-100 dark:bg-gray-800')}
      style={{ width, height }}
    >
      {/* Show placeholder while not in view or loading */}
      {(!isInView || (!isLoaded && !hasError)) && (
        <div className="absolute inset-0 z-10">
          {placeholder === 'skeleton' && <SkeletonPlaceholder />}
          {placeholder === 'blur' && <BlurPlaceholder />}
          {placeholder === 'empty' && <div className="w-full h-full bg-gray-100 dark:bg-gray-800" />}
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className={cn(
          'flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 text-sm',
          className
        )}>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            Failed to load image
          </div>
        </div>
      )}

      {/* Main image - only render when in view */}
      {isInView && !hasError && (
        <>
          {/* Modern format images with fallback */}
          <picture>
            {/* AVIF format for modern browsers */}
            <source
              srcSet={generateSrcSet(src.replace(/\.(jpg|jpeg|png)$/, '.avif'))}
              sizes={sizes}
              type="image/avif"
            />
            
            {/* WebP format for broader support */}
            <source
              srcSet={generateSrcSet(src.replace(/\.(jpg|jpeg|png)$/, '.webp'))}
              sizes={sizes}
              type="image/webp"
            />
            
            {/* Fallback to original format */}
            <img
              ref={imgRef}
              src={src}
              srcSet={generateSrcSet(src)}
              sizes={sizes}
              alt={alt}
              width={width}
              height={height}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              onLoad={handleLoad}
              onError={handleError}
              className={cn(
                'object-cover transition-opacity duration-300',
                isLoaded ? 'opacity-100' : 'opacity-0',
                className
              )}
              style={{
                width: width || '100%',
                height: height || 'auto'
              }}
            />
          </picture>
        </>
      )}
    </div>
  )
}

// Gallery component with optimized images
interface ImageGalleryProps {
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
  columns?: number
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ImageGallery({ 
  images, 
  columns = 3, 
  gap = 'md',
  className = '' 
}: ImageGalleryProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  }

  return (
    <div 
      className={cn(
        'grid',
        `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}`,
        gapClasses[gap],
        className
      )}
    >
      {images.map((image, index) => (
        <div key={index} className="space-y-2">
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            className="rounded-lg"
            priority={index < 3} // Prioritize first 3 images
          />
          {image.caption && (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {image.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

// Hero image component
interface HeroImageProps {
  src: string
  alt: string
  overlay?: boolean
  className?: string
  children?: React.ReactNode
}

export function HeroImage({ 
  src, 
  alt, 
  overlay = false, 
  className = '',
  children 
}: HeroImageProps) {
  return (
    <div className={cn('relative', className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        priority={true}
        className="w-full h-full object-cover"
        placeholder="blur"
      />
      
      {overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      )}
      
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
}

// Avatar component with optimized loading
interface AvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fallback?: string
  className?: string
}

export function Avatar({ 
  src, 
  alt, 
  size = 'md', 
  fallback,
  className = '' 
}: AvatarProps) {
  const [hasError, setHasError] = useState(false)

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (hasError && fallback) {
    return (
      <div className={cn(
        'rounded-full bg-purple-600 text-white flex items-center justify-center font-medium text-sm',
        sizeClasses[size],
        className
      )}>
        {getInitials(fallback)}
      </div>
    )
  }

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={cn('rounded-full object-cover', sizeClasses[size], className)}
      onError={() => setHasError(true)}
      priority={size === 'xl'} // Prioritize larger avatars
    />
  )
}

// Logo component with SVG optimization
interface LogoProps {
  src?: string
  alt?: string
  text?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ src, alt, text, size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  }

  if (src) {
    return (
      <OptimizedImage
        src={src}
        alt={alt || 'Logo'}
        className={cn(sizeClasses[size], 'w-auto', className)}
        priority={true}
      />
    )
  }

  return (
    <div className={cn('font-bold text-purple-600', className)}>
      {text || 'Zaza Promptly'}
    </div>
  )
}

// Background image component
interface BackgroundImageProps {
  src: string
  alt: string
  overlay?: 'light' | 'dark' | 'gradient'
  children: React.ReactNode
  className?: string
}

export function BackgroundImage({ 
  src, 
  alt, 
  overlay, 
  children, 
  className = '' 
}: BackgroundImageProps) {
  const overlayClasses = {
    light: 'bg-white bg-opacity-80',
    dark: 'bg-black bg-opacity-40',
    gradient: 'bg-gradient-to-r from-black/60 to-black/30'
  }

  return (
    <div className={cn('relative', className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        priority={true}
      />
      
      {overlay && (
        <div className={cn('absolute inset-0', overlayClasses[overlay])} />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}