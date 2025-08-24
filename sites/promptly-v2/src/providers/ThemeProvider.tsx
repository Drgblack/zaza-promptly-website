'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: 'light' | 'dark' // The resolved theme (light or dark only)
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'promptly-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Get stored theme or use default
    const storedTheme = localStorage.getItem(storageKey) as Theme || defaultTheme
    setTheme(storedTheme)
  }, [defaultTheme, storageKey])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark')
    
    let resolvedTheme: 'light' | 'dark'
    
    if (theme === 'system') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light'
    } else {
      resolvedTheme = theme
    }
    
    root.classList.add(resolvedTheme)
    setActualTheme(resolvedTheme)
  }, [theme, mounted])

  useEffect(() => {
    if (!mounted) return

    // Listen to system theme changes when using system theme
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleChange = (e: MediaQueryListEvent) => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        
        const newTheme = e.matches ? 'dark' : 'light'
        root.classList.add(newTheme)
        setActualTheme(newTheme)
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme, mounted])

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem(storageKey, newTheme)
  }

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{
          theme: defaultTheme,
          setTheme: () => {},
          actualTheme: 'light',
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: updateTheme,
        actualTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
