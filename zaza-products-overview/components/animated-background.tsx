"use client"

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Rich Purple/Pink Lava Lamp Blobs */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-purple-600/40 to-pink-600/40 rounded-full blur-2xl lava-lamp-1"></div>
      <div className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-br from-pink-600/35 to-purple-700/35 rounded-full blur-2xl lava-lamp-2"></div>
      <div className="absolute bottom-1/4 left-1/4 w-88 h-88 bg-gradient-to-br from-purple-700/30 to-pink-500/30 rounded-full blur-2xl lava-lamp-3"></div>
      <div
        className="absolute top-1/2 right-1/3 w-72 h-72 bg-gradient-to-br from-pink-700/40 to-purple-600/40 rounded-full blur-2xl lava-lamp-1"
        style={{ animationDelay: "10s" }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-br from-purple-500/45 to-pink-700/45 rounded-full blur-2xl lava-lamp-2"
        style={{ animationDelay: "15s" }}
      ></div>

      {/* Additional rich floating elements */}
      <div className="absolute top-1/4 left-1/2 w-48 h-48 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full blur-xl float-animation"></div>
      <div
        className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-pink-600/35 to-purple-600/35 rounded-full blur-xl float-animation"
        style={{ animationDelay: "3s" }}
      ></div>

      {/* Extra rich accent blobs */}
      <div className="absolute top-10 right-1/4 w-56 h-56 bg-gradient-to-br from-purple-800/25 to-pink-800/25 rounded-full blur-xl lava-lamp-3"></div>
      <div
        className="absolute bottom-10 left-10 w-60 h-60 bg-gradient-to-br from-pink-700/30 to-purple-800/30 rounded-full blur-xl lava-lamp-1"
        style={{ animationDelay: "8s" }}
      ></div>
    </div>
  )
}
