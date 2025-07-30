"use client"

import Image from 'next/image'
import { useState } from 'react'

interface FounderImageProps {
  src: string
  alt: string
  className?: string
}

export function FounderImage({ src, alt, className = "" }: FounderImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc("/images/placeholder-avatar.svg")
    }
  }

  return (
    <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={className}
        priority
        onError={handleError}
      />
      {/* Fallback gradient background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 -z-10" />
    </div>
  )
}