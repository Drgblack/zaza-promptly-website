"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

interface Author {
  name: string
  bio: string
  avatar: string
}

interface AuthorBoxProps {
  author: Author
}

export function AuthorBox({ author }: AuthorBoxProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Use the uploaded photo for Greg Blackburn, fallback to provided avatar or placeholder
  const getAvatarSrc = () => {
    if (author.name === "Dr. Greg Blackburn" || author.name === "Greg Blackburn") {
      return "/images/greg-headshot.jpg"
    }
    return author.avatar || "/placeholder.svg"
  }

  return (
    <div
      ref={sectionRef}
      className={`my-16 p-8 bg-gray-50 rounded-2xl border border-gray-100 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Enhanced Avatar with Purple Gradient Border and Animations */}
        <div className="relative group">
          {/* Pulsing Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 opacity-75 animate-pulse blur-sm"></div>

          {/* Main Border Container */}
          <div className="relative p-1 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Inner Container for Image */}
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white p-0.5">
              <Image
                src={getAvatarSrc() || "/placeholder.svg"}
                alt={author.name}
                width={80}
                height={80}
                className="w-full h-full rounded-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Additional Glow on Hover */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{author.name}</h3>
          <p className="text-gray-700 leading-relaxed mb-4">{author.bio}</p>
          <Link
            href={`/authors/${author.name.toLowerCase().replace(/\s+/g, "-").replace("dr.-", "")}`}
            className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 hover:underline"
          >
            More from this author →
          </Link>
        </div>
      </div>
    </div>
  )
}
