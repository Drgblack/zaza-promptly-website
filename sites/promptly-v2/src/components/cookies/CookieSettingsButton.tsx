'use client'

export default function CookieSettingsButton() {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('promptly-cookie-consent')
      window.location.reload()
    }
  }

  return (
    <button
      onClick={handleClick}
      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-left"
    >
      Cookie Settings
    </button>
  )
}
