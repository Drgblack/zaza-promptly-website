"use client"

export function SkipLinks() {
  return (
    <nav className="sr-only focus-within:not-sr-only" aria-label="Skip navigation links">
      <ul className="fixed top-0 left-0 z-[9999] p-2 bg-white border border-gray-300 shadow-lg">
        <li>
          <a
            href="#main-content"
            className="inline-block px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-blue-50"
          >
            Skip to main content
          </a>
        </li>
        <li className="mt-2">
          <a
            href="#main-navigation"
            className="inline-block px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-blue-50"
          >
            Skip to navigation
          </a>
        </li>
        <li className="mt-2">
          <a
            href="#footer"
            className="inline-block px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-blue-50"
          >
            Skip to footer
          </a>
        </li>
      </ul>
    </nav>
  )
}