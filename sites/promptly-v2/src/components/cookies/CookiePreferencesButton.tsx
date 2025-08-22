'use client'

export default function CookiePreferencesButton() {
  const handleClick = () => {
    // Trigger cookie banner
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cookie-consent')
      window.location.reload()
    }
  }

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
    >
      Update Cookie Preferences
    </button>
  )
}