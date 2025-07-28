"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface DarkModeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
  mounted: boolean
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined)

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("darkMode")
    if (stored !== null) {
      setIsDarkMode(JSON.parse(stored))
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(prefersDark)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("darkMode", JSON.stringify(isDarkMode))
      if (isDarkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [isDarkMode, mounted])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, mounted }}>{children}</DarkModeContext.Provider>
}

export function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (context === undefined) {
    // Return a fallback object instead of throwing an error
    return {
      isDarkMode: false,
      toggleDarkMode: () => {},
      mounted: false,
    }
  }
  return context
}
