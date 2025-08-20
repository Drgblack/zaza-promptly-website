"use client"

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  fill?: boolean
  quality?: number
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  onError?: () => void
  fallback?: string
  aspectRatio?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  fill = false,
  quality = 85,
  loading = 'lazy',
  onLoad,
  onError,
  fallback,
  aspectRatio = '16/9',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!imgRef.current || priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [priority])

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }

  // Generate a simple blur placeholder if none provided
  const defaultBlurDataURL = `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
    </svg>`
  ).toString('base64')}`

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden',
        !fill && 'inline-block',
        className
      )}
      style={!fill ? { aspectRatio } : undefined}
    >
      <AnimatePresence>
        {/* Loading skeleton */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center"
          >
            <svg
              className="w-8 h-8 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </motion.div>
        )}

        {/* Error state */}
        {hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300"
          >
            {fallback ? (
              <Image
                src={fallback}
                alt={alt}
                fill={fill}
                width={!fill ? width : undefined}
                height={!fill ? height : undefined}
                onLoad={handleLoad}
                className="object-cover"
              />
            ) : (
              <div className="text-center text-gray-500">
                <svg
                  className="w-8 h-8 mx-auto mb-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 5v6.59l-3-3.01-4 4.01-4-4-4 4-3-3.01V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42l3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l3 2.99 4-4 4 4 4-3.99z" />
                </svg>
                <p className="text-sm">Failed to load image</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Actual image */}
        {isInView && !hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={src}
              alt={alt}
              fill={fill}
              width={!fill ? width : undefined}
              height={!fill ? height : undefined}
              priority={priority}
              placeholder={placeholder}
              blurDataURL={blurDataURL || defaultBlurDataURL}
              sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
              quality={quality}
              loading={priority ? 'eager' : loading}
              onLoad={handleLoad}
              onError={handleError}
              className="object-cover"
              {...props}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progressive enhancement: Add fade-in animation for non-priority images */}
      {!priority && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView && !isLoading ? 1 : 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-0 pointer-events-none"
        />
      )}
    </div>
  )
}

// Optimized icon loader for better performance
export function OptimizedIcon({
  icon: IconComponent,
  className,
  size = 24,
  loading = 'lazy',
  ...props
}: {
  icon: React.ComponentType<any>
  className?: string
  size?: number
  loading?: 'lazy' | 'eager'
  [key: string]: any
}) {
  const [isInView, setIsInView] = useState(loading === 'eager')
  const iconRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!iconRef.current || loading === 'eager') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '20px' }
    )

    observer.observe(iconRef.current)
    return () => observer.disconnect()
  }, [loading])

  return (
    <span
      ref={iconRef}
      className={cn('inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      {isInView && (
        <IconComponent
          width={size}
          height={size}
          className="w-full h-full"
          {...props}
        />
      )}
    </span>
  )
}

export default OptimizedImage