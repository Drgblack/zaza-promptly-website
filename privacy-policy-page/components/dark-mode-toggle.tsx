"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before accessing localStorage
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      toggleDarkMode()
    }
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className="w-12 h-6 bg-gray-200 rounded-full animate-pulse"></div>
  }

  return (
    <div className="relative group">
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        Toggle Dark Mode
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
      </div>

      {/* Toggle Switch */}
      <button
        onClick={toggleDarkMode}
        onKeyDown={handleKeyDown}
        className={`
          relative inline-flex items-center w-12 h-6 rounded-full transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900
          ${isDark ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-300 hover:bg-gray-400"}
        `}
        aria-label="Toggle dark mode"
        aria-pressed={isDark}
        role="switch"
      >
        {/* Sliding Circle */}
        <span
          className={`
            inline-block w-5 h-5 bg-white rounded-full shadow-lg transform transition-all duration-300 ease-in-out
            flex items-center justify-center
            ${isDark ? "translate-x-6" : "translate-x-0.5"}
          `}
        >
          {/* Icon */}
          {isDark ? <Moon className="w-3 h-3 text-purple-600" /> : <Sun className="w-3 h-3 text-yellow-500" />}
        </span>
      </button>
    </div>
  )
}
