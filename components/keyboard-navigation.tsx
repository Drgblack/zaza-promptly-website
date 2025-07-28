"use client"

import { useEffect, useRef, useState } from "react"

interface KeyboardNavigationProps {
  children: React.ReactNode
  onNavigate?: (direction: "up" | "down" | "left" | "right") => void
  onSelect?: () => void
  onEscape?: () => void
  onTab?: (direction: "forward" | "backward") => void
}

export function KeyboardNavigation({ 
  children, 
  onNavigate, 
  onSelect, 
  onEscape, 
  onTab 
}: KeyboardNavigationProps) {
  const [isKeyboardMode, setIsKeyboardMode] = useState(false)
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Detect keyboard mode
      if (event.key === "Tab" || event.key.startsWith("Arrow") || event.key === "Enter" || event.key === "Escape") {
        setIsKeyboardMode(true)
      }

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault()
          onNavigate?.("up")
          break
        case "ArrowDown":
          event.preventDefault()
          onNavigate?.("down")
          break
        case "ArrowLeft":
          event.preventDefault()
          onNavigate?.("left")
          break
        case "ArrowRight":
          event.preventDefault()
          onNavigate?.("right")
          break
        case "Enter":
        case " ":
          event.preventDefault()
          onSelect?.()
          break
        case "Escape":
          event.preventDefault()
          onEscape?.()
          break
        case "Tab":
          if (event.shiftKey) {
            onTab?.("backward")
          } else {
            onTab?.("forward")
          }
          break
      }
    }

    const handleMouseDown = () => {
      setIsKeyboardMode(false)
    }

    const handleFocus = (event: FocusEvent) => {
      setFocusedElement(event.target as HTMLElement)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("focus", handleFocus, true)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("focus", handleFocus, true)
    }
  }, [onNavigate, onSelect, onEscape, onTab])

  return (
    <div 
      className={isKeyboardMode ? "keyboard-mode" : ""}
      data-keyboard-mode={isKeyboardMode}
    >
      {children}
    </div>
  )
}

// Hook for managing focus
export function useFocusManagement() {
  const [focusHistory, setFocusHistory] = useState<HTMLElement[]>([])
  const [currentFocusIndex, setCurrentFocusIndex] = useState(-1)

  const addToFocusHistory = (element: HTMLElement) => {
    setFocusHistory(prev => {
      const filtered = prev.filter(el => el !== element)
      return [...filtered, element]
    })
  }

  const focusNext = () => {
    if (focusHistory.length === 0) return
    
    const nextIndex = (currentFocusIndex + 1) % focusHistory.length
    setCurrentFocusIndex(nextIndex)
    focusHistory[nextIndex]?.focus()
  }

  const focusPrevious = () => {
    if (focusHistory.length === 0) return
    
    const prevIndex = currentFocusIndex <= 0 ? focusHistory.length - 1 : currentFocusIndex - 1
    setCurrentFocusIndex(prevIndex)
    focusHistory[prevIndex]?.focus()
  }

  const focusFirst = () => {
    if (focusHistory.length > 0) {
      setCurrentFocusIndex(0)
      focusHistory[0]?.focus()
    }
  }

  const focusLast = () => {
    if (focusHistory.length > 0) {
      const lastIndex = focusHistory.length - 1
      setCurrentFocusIndex(lastIndex)
      focusHistory[lastIndex]?.focus()
    }
  }

  return {
    addToFocusHistory,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
    focusHistory,
    currentFocusIndex
  }
}

// Component for focusable elements
interface FocusableElementProps {
  children: React.ReactNode
  onFocus?: () => void
  onBlur?: () => void
  tabIndex?: number
  className?: string
  role?: string
  "aria-label"?: string
  "aria-describedby"?: string
}

export function FocusableElement({ 
  children, 
  onFocus, 
  onBlur, 
  tabIndex = 0,
  className = "",
  role,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby
}: FocusableElementProps) {
  const { addToFocusHistory } = useFocusManagement()
  const elementRef = useRef<HTMLDivElement>(null)

  const handleFocus = () => {
    if (elementRef.current) {
      addToFocusHistory(elementRef.current)
    }
    onFocus?.()
  }

  return (
    <div
      ref={elementRef}
      tabIndex={tabIndex}
      onFocus={handleFocus}
      onBlur={onBlur}
      className={`focusable-element focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
      role={role}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
    >
      {children}
    </div>
  )
}

// Component for skip links
export function SkipLinks() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        setIsVisible(true)
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        // Keep visible for a short time to allow clicking
        setTimeout(() => setIsVisible(false), 1000)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="skip-links">
      <a 
        href="#main-content" 
        className="skip-link"
        onClick={() => setIsVisible(false)}
      >
        Skip to main content
      </a>
      <a 
        href="#navigation" 
        className="skip-link"
        onClick={() => setIsVisible(false)}
      >
        Skip to navigation
      </a>
      <a 
        href="#footer" 
        className="skip-link"
        onClick={() => setIsVisible(false)}
      >
        Skip to footer
      </a>
    </div>
  )
}

// Component for keyboard shortcuts help
export function KeyboardShortcutsHelp() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Show help on Ctrl/Cmd + /
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        event.preventDefault()
        setIsVisible(true)
      }

      // Hide help on Escape
      if (event.key === "Escape") {
        setIsVisible(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Keyboard Shortcuts</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Tab</span>
            <span>Navigate between elements</span>
          </div>
          <div className="flex justify-between">
            <span>Enter / Space</span>
            <span>Activate element</span>
          </div>
          <div className="flex justify-between">
            <span>Arrow Keys</span>
            <span>Navigate options</span>
          </div>
          <div className="flex justify-between">
            <span>Escape</span>
            <span>Close dialogs</span>
          </div>
          <div className="flex justify-between">
            <span>Ctrl/Cmd + /</span>
            <span>Show this help</span>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          Close
        </button>
      </div>
    </div>
  )
}

// Hook for keyboard shortcuts
export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: {
    ctrlKey?: boolean
    shiftKey?: boolean
    altKey?: boolean
    metaKey?: boolean
  } = {}
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === key &&
        !!event.ctrlKey === !!options.ctrlKey &&
        !!event.shiftKey === !!options.shiftKey &&
        !!event.altKey === !!options.altKey &&
        !!event.metaKey === !!options.metaKey
      ) {
        event.preventDefault()
        callback()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [key, callback, options])
} 