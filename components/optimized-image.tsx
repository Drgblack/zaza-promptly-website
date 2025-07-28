"use client"

import { useState, useEffect, useRef } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
  quality?: number
  placeholder?: string
  blurDataURL?: string
}

export function OptimizedImage({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  sizes = "100vw",
  quality = 75,
  placeholder,
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState<string>("")
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  useEffect(() => {
    if (!isInView) return

    // Generate optimized image URLs
    const generateImageSrc = () => {
      if (!src) return placeholder || "/placeholder.svg"
      
      // If it's already a data URL or external URL, return as is
      if (src.startsWith('data:') || src.startsWith('http')) {
        return src
      }

      // For local images, generate optimized versions
      const baseUrl = src.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '')
      const extension = src.match(/\.(jpg|jpeg|png|webp|avif)$/i)?.[1] || 'png'
      
      // Generate responsive image sources
      const generateSrcSet = (format: string) => {
        const sizes = [320, 640, 768, 1024, 1280, 1920]
        return sizes
          .map(size => `${baseUrl}-${size}w.${format} ${size}w`)
          .join(', ')
      }

      // Set the main image source
      setImageSrc(src)
    }

    generateImageSrc()
  }, [isInView, src, placeholder])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
    // Fallback to original source or placeholder
    if (src !== imageSrc) {
      setImageSrc(src)
    } else {
      setImageSrc(placeholder || "/placeholder.svg")
    }
  }

  // Generate WebP and AVIF sources for better compression
  const generateOptimizedSources = () => {
    if (!imageSrc || imageSrc.startsWith('data:') || imageSrc.startsWith('http')) {
      return null
    }

    const baseUrl = imageSrc.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '')
    const extension = imageSrc.match(/\.(jpg|jpeg|png|webp|avif)$/i)?.[1] || 'png'
    
    const sources = []
    
    // AVIF source (best compression)
    if (extension !== 'avif') {
      sources.push({
        srcSet: `${baseUrl}.avif`,
        type: 'image/avif',
        sizes
      })
    }
    
    // WebP source (good compression, wide support)
    if (extension !== 'webp') {
      sources.push({
        srcSet: `${baseUrl}.webp`,
        type: 'image/webp',
        sizes
      })
    }

    return sources
  }

  const optimizedSources = generateOptimizedSources()

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Loading placeholder with blur effect */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{ width, height }}
          aria-hidden="true"
        >
          {blurDataURL && (
            <img
              src={blurDataURL}
              alt=""
              className="w-full h-full object-cover blur-sm scale-110"
              aria-hidden="true"
            />
          )}
        </div>
      )}

      {/* Error fallback */}
      {hasError && (
        <div
          className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 text-sm rounded"
          style={{ width, height }}
          role="img"
          aria-label={alt}
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Optimized image with multiple formats */}
      {isInView && !hasError && (
        <picture>
          {optimizedSources?.map((source, index) => (
            <source
              key={index}
              srcSet={source.srcSet}
              type={source.type}
              sizes={source.sizes}
            />
          ))}
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={alt}
            className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
            width={width}
            height={height}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            sizes={sizes}
            crossOrigin="anonymous"
            style={{
              width: width ? `${width}px` : 'auto',
              height: height ? `${height}px` : 'auto',
            }}
          />
        </picture>
      )}
    </div>
  )
}
