import { Sparkles } from "lucide-react"
import Link from "next/link"

export function Logo({ variant = "default" }: { variant?: "default" | "white" }) {
  const textColor =
    variant === "white" ? "text-white" : "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"

  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <span className={`text-xl font-bold ${textColor}`}>Zaza Spark</span>
    </Link>
  )
}
