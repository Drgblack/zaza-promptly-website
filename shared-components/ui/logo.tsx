import { Sparkles } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "default" | "white" | "gradient"
  product?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Logo({ variant = "default", product, size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-sm",
    md: "w-8 h-8 text-xl",
    lg: "w-10 h-10 text-2xl"
  }

  const textColor = variant === "white" 
    ? "text-white" 
    : variant === "gradient"
    ? "bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
    : "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"

  const iconGradient = variant === "white"
    ? "from-white to-gray-200"
    : "from-purple-600 to-pink-600"

  return (
    <Link href="/" className={cn("flex items-center gap-2 hover:opacity-80 transition-opacity", className)}>
      <div className={cn(
        "rounded-lg flex items-center justify-center",
        `bg-gradient-to-r ${iconGradient}`,
        sizeClasses[size].split(" ")[0],
        sizeClasses[size].split(" ")[1]
      )}>
        <Sparkles className={cn(
          "text-white",
          size === "sm" ? "w-3 h-3" : size === "md" ? "w-5 h-5" : "w-6 h-6"
        )} />
      </div>
      <span className={cn("font-bold", textColor, sizeClasses[size].split(" ")[2])}>
        Zaza {product && product !== "default" ? product : "Technologies"}
      </span>
    </Link>
  )
} 