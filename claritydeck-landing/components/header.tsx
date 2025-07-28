"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
          <Image src="/images/zaza-logo.png" alt="Zaza Logo" width={36} height={36} className="rounded-lg" />
          <span className="text-text-primary font-bold text-xl">Zaza ClarityDeck</span>
        </a>

        <Button
          onClick={scrollToWaitlist}
          className="bg-primary-cta hover:bg-primary-cta/90 text-white px-6 py-2 rounded-full transition-all duration-200 hover:scale-105 shadow-soft-glow"
        >
          Join Waitlist
        </Button>
      </div>
    </header>
  )
}
