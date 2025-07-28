"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeroCTAProps {
  title: string
  subtitle?: string
  description: string
  primaryButton: {
    text: string
    href?: string
    onClick?: () => void
    variant?: "default" | "gradient" | "purple"
  }
  secondaryButton?: {
    text: string
    href?: string
    onClick?: () => void
  }
  badge?: {
    text: string
    icon?: React.ReactNode
  }
  gradient?: "orange-pink" | "purple-pink" | "blue-purple"
  className?: string
}

export function HeroCTA({
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  badge,
  gradient = "orange-pink",
  className
}: HeroCTAProps) {
  const gradientClasses = {
    "orange-pink": "bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600",
    "purple-pink": "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-600",
    "blue-purple": "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-600"
  }

  const buttonVariants = {
    default: "bg-white text-orange-600 hover:bg-gray-100",
    gradient: "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white",
    purple: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
  }

  const handlePrimaryClick = () => {
    if (primaryButton.onClick) {
      primaryButton.onClick()
    } else if (primaryButton.href) {
      window.location.href = primaryButton.href
    }
  }

  const handleSecondaryClick = () => {
    if (secondaryButton?.onClick) {
      secondaryButton.onClick()
    } else if (secondaryButton?.href) {
      window.location.href = secondaryButton.href
    }
  }

  return (
    <section className={cn(
      "py-16 px-4 text-white",
      gradientClasses[gradient],
      className
    )}>
      <div className="max-w-4xl mx-auto text-center">
        {badge && (
          <div className="flex items-center justify-center gap-2 mb-6">
            {badge.icon || <Sparkles className="w-8 h-8 text-yellow-300" />}
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              {badge.text}
            </span>
          </div>
        )}

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {title}
          {subtitle && (
            <>
              <br />
              <span className="text-yellow-300">{subtitle}</span>
            </>
          )}
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handlePrimaryClick}
            size="lg"
            className={cn(
              "px-12 py-4 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105",
              buttonVariants[primaryButton.variant || "default"]
            )}
          >
            {primaryButton.text}
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          {secondaryButton && (
            <Button
              onClick={handleSecondaryClick}
              variant="outline"
              size="lg"
              className="px-8 py-4 rounded-2xl text-lg font-semibold border-white/20 text-white hover:bg-white/10"
            >
              {secondaryButton.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
} 