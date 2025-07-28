"use client"

import { useState } from "react"

export default function SchwoopFooter() {
  const [hoveredEmoji, setHoveredEmoji] = useState<string | null>(null)

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <footer className="bg-[#1E1F4A] border-t border-white/10 py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-6">
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleLinkClick("https://discord.gg/schwoop")}
              className="group relative px-6 py-2 bg-gradient-to-r from-[#86BA90] to-[#86BA90]/80 text-[#1E1F4A] font-semibold rounded-full text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#86BA90]/25 overflow-hidden"
            >
              <span className="relative z-10">→ Join the Discord</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

            <button
              onClick={() => handleLinkClick("https://tiktok.com/@schwoopapp")}
              className="group relative px-6 py-2 bg-gradient-to-r from-[#B57EDC] to-[#B57EDC]/80 text-white font-semibold rounded-full text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#B57EDC]/25 overflow-hidden"
            >
              <span className="relative z-10">→ Follow @schwoopapp</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 border-t border-white/5">
          <div className="flex items-center gap-6">
            {[
              { label: "Privacy", url: "/privacy" },
              { label: "Contact", url: "/contact" },
              { label: "About Zaza", url: "/about-zaza" },
            ].map((link, index) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.url)}
                className="group relative text-gray-400 hover:text-[#F9B87F] text-sm transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#F9B87F]/20 to-[#B57EDC]/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-1"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F9B87F] to-[#B57EDC] group-hover:w-full transition-all duration-300"></div>
              </button>
            ))}
          </div>

          {/* Fun little separator */}
          <div className="hidden sm:block text-gray-600">•</div>

          {/* Extra fun element */}
          <div className="text-gray-500 text-xs animate-pulse">Made with chaos & caffeine ⚡</div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center pt-6 mt-6 border-t border-white/5">
          <p className="text-gray-400 text-sm">
            © 2025 Schwoop. Built by{" "}
            <span className="text-[#B57EDC] hover:text-[#F9B87F] transition-colors duration-300 cursor-pointer font-medium">
              Zaza Technologies
            </span>{" "}
            with{" "}
            <span
              className="inline-block cursor-pointer transition-transform duration-300 hover:scale-125"
              onMouseEnter={() => setHoveredEmoji("brain")}
              onMouseLeave={() => setHoveredEmoji(null)}
            >
              🧠{hoveredEmoji === "brain" && <span className="absolute ml-1 animate-ping text-yellow-400">✨</span>}
            </span>{" "}
            +{" "}
            <span
              className="inline-block cursor-pointer transition-transform duration-300 hover:scale-125"
              onMouseEnter={() => setHoveredEmoji("coffee")}
              onMouseLeave={() => setHoveredEmoji(null)}
            >
              ☕{hoveredEmoji === "coffee" && <span className="absolute ml-1 animate-ping text-yellow-400">✨</span>}
            </span>
          </p>
        </div>

        {/* Floating sparkles for extra fun */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce text-yellow-400/30 text-xs"
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 10}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: "3s",
              }}
            >
              ✨
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
