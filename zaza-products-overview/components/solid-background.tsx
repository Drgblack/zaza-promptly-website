"use client"

export default function SolidBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Solid Purple/Pink Background with subtle overlay patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-800 dark:to-pink-800"></div>

      {/* Subtle geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-pink-600/20 to-transparent"></div>
      </div>
    </div>
  )
}
