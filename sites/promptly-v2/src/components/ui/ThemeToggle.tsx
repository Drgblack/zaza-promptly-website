'use client'

import { useTheme } from '@/providers/ThemeProvider'

interface ThemeToggleProps {
  variant?: 'default' | 'mobile'
}

export default function ThemeToggle({ variant = 'default' }: ThemeToggleProps) {
  const { theme, setTheme, actualTheme } = useTheme()

  const cycleTheme = () => {
    switch (theme) {
      case 'light':
        setTheme('dark')
        break
      case 'dark':
        setTheme('system')
        break
      case 'system':
        setTheme('light')
        break
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark theme'
      case 'dark':
        return 'Switch to system theme'
      case 'system':
        return 'Switch to light theme'
    }
  }

  const getThemeIcon = () => {
    if (actualTheme === 'dark') {
      return (
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
          />
        </svg>
      )
    }
    
    return (
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
        />
      </svg>
    )
  }

  if (variant === 'mobile') {
    return (
      <button
        onClick={cycleTheme}
        className="flex items-center w-full text-slate-300 hover:text-white font-medium py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
        aria-label={getThemeLabel()}
      >
        <span className="mr-2">{getThemeIcon()}</span>
        <span>
          {theme === 'system' ? `Auto (${actualTheme})` : theme.charAt(0).toUpperCase() + theme.slice(1)} theme
        </span>
      </button>
    )
  }

  return (
    <button
      onClick={cycleTheme}
      className="p-2 text-white/70 hover:text-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg border border-white/20 hover:border-white/30 bg-white/5 hover:bg-white/10"
      aria-label={getThemeLabel()}
      title={`Current: ${theme === 'system' ? `Auto (${actualTheme})` : theme}`}
    >
      {getThemeIcon()}
    </button>
  )
}