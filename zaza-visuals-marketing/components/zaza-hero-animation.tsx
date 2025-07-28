"use client"

import { useState, useEffect } from "react"

const ZazaHeroAnimation = () => {
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-purple-50 to-orange-50 rounded-xl overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-16 h-12 bg-gray-300 rounded"></div>
        <div className="absolute top-4 right-4 w-20 h-3 bg-gray-300 rounded"></div>
        <div className="absolute bottom-4 left-4 w-12 h-8 bg-gray-300 rounded"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {/* Teacher Character */}
        <div className="relative">
          {/* Teacher Figure */}
          <div className="relative">
            {/* Head */}
            <div className="w-16 h-16 bg-amber-200 rounded-full mx-auto mb-2 relative">
              {/* Hair */}
              <div className="absolute -top-2 -left-2 w-20 h-12 bg-amber-800 rounded-full"></div>
              {/* Eyes */}
              <div className="absolute top-5 left-4 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute top-5 right-4 w-2 h-2 bg-black rounded-full"></div>
              {/* Mouth - changes based on animation phase */}
              <div
                className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-3 h-1 rounded-full transition-all duration-500 ${
                  animationPhase >= 2 ? "bg-black rotate-180" : "bg-gray-600"
                }`}
              ></div>
            </div>

            {/* Body */}
            <div className="w-12 h-20 bg-blue-400 rounded-lg mx-auto relative">
              {/* Arms */}
              <div className="absolute -left-3 top-2 w-6 h-3 bg-blue-400 rounded-full"></div>
              <div className="absolute -right-3 top-2 w-6 h-3 bg-blue-400 rounded-full"></div>

              {/* Lesson Plan in left hand */}
              <div className="absolute -left-6 top-0 w-4 h-6 bg-white border border-gray-300 rounded shadow-sm">
                <div className="w-3 h-1 bg-gray-400 mx-auto mt-1"></div>
                <div className="w-2 h-1 bg-gray-400 mx-auto mt-1"></div>
              </div>

              {/* Phone in right hand */}
              <div className="absolute -right-6 top-0 w-3 h-5 bg-gray-800 rounded-sm">
                <div className="w-2 h-3 bg-purple-400 mx-auto mt-1 rounded-sm relative overflow-hidden">
                  {/* Tap effect */}
                  {animationPhase === 1 && (
                    <div className="absolute inset-0 bg-white opacity-50 animate-ping rounded-sm"></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Magical Particles */}
          {animationPhase >= 1 && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-1 h-1 bg-purple-400 rounded-full animate-bounce transition-all duration-1000 ${
                    animationPhase >= 2 ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    left: `${30 + i * 10}px`,
                    top: `${20 + (i % 3) * 15}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>

        {/* Generated Educational Content */}
        <div className="absolute inset-0 pointer-events-none">
          {animationPhase >= 2 && (
            <>
              {/* Solar System Diagram */}
              <div
                className={`absolute top-16 left-16 transition-all duration-1000 ${
                  animationPhase >= 3 ? "scale-75 opacity-80" : "scale-100 opacity-100"
                }`}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
              </div>

              {/* Math Equation */}
              <div
                className={`absolute top-20 right-20 bg-white p-2 rounded shadow-lg transition-all duration-1000 ${
                  animationPhase >= 3 ? "scale-75 opacity-80" : "scale-100 opacity-100"
                }`}
              >
                <div className="text-xs font-bold text-purple-600">2 + 2 = 4</div>
              </div>

              {/* Digestive System */}
              <div
                className={`absolute bottom-20 left-20 transition-all duration-1000 ${
                  animationPhase >= 3 ? "scale-75 opacity-80" : "scale-100 opacity-100"
                }`}
              >
                <div className="w-6 h-12 bg-pink-300 rounded-full relative">
                  <div className="absolute top-2 left-1 w-4 h-2 bg-pink-400 rounded"></div>
                  <div className="absolute bottom-2 left-1 w-4 h-2 bg-pink-400 rounded"></div>
                </div>
              </div>

              {/* World Map */}
              <div
                className={`absolute bottom-16 right-16 bg-green-200 p-2 rounded transition-all duration-1000 ${
                  animationPhase >= 3 ? "scale-75 opacity-80" : "scale-100 opacity-100"
                }`}
              >
                <div className="w-8 h-4 bg-green-400 rounded-sm relative">
                  <div className="absolute top-1 left-1 w-2 h-2 bg-green-600 rounded-sm"></div>
                  <div className="absolute bottom-1 right-1 w-2 h-1 bg-green-600 rounded-sm"></div>
                </div>
              </div>

              {/* Story Characters */}
              <div
                className={`absolute top-32 left-32 transition-all duration-1000 ${
                  animationPhase >= 3 ? "scale-75 opacity-80" : "scale-100 opacity-100"
                }`}
              >
                <div className="flex space-x-1">
                  <div className="w-3 h-4 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-4 bg-blue-400 rounded-full"></div>
                </div>
              </div>
            </>
          )}

          {/* Organized Materials (Final Phase) */}
          {animationPhase >= 3 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000">
              <div className="flex space-x-2">
                <div className="w-12 h-16 bg-white border-2 border-purple-200 rounded shadow-lg">
                  <div className="w-8 h-2 bg-purple-400 mx-auto mt-2"></div>
                  <div className="w-6 h-1 bg-gray-400 mx-auto mt-1"></div>
                </div>
                <div className="w-12 h-16 bg-white border-2 border-orange-200 rounded shadow-lg">
                  <div className="w-8 h-2 bg-orange-400 mx-auto mt-2"></div>
                  <div className="w-6 h-1 bg-gray-400 mx-auto mt-1"></div>
                </div>
                <div className="w-12 h-16 bg-white border-2 border-green-200 rounded shadow-lg">
                  <div className="w-8 h-2 bg-green-400 mx-auto mt-2"></div>
                  <div className="w-6 h-1 bg-gray-400 mx-auto mt-1"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sparkle Effects */}
        {animationPhase >= 1 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute text-yellow-400 animate-pulse"
                style={{
                  left: `${20 + i * 50}px`,
                  top: `${30 + (i % 2) * 100}px`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                ✨
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[0, 1, 2, 3].map((phase) => (
          <div
            key={phase}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              animationPhase >= phase ? "bg-purple-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default ZazaHeroAnimation
