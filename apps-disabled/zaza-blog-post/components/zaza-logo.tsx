import Image from "next/image"
import Link from "next/link"

interface ZazaLogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  href?: string
  className?: string
  darkMode?: boolean
}

export function ZazaLogo({ size = "md", showText = true, href, className = "", darkMode = false }: ZazaLogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  const textColorClass = darkMode ? "text-white" : "text-gray-900"

  const logoContent = (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image
        src="/zaza-logo.png"
        alt="Zaza"
        width={size === "sm" ? 24 : size === "md" ? 32 : 48}
        height={size === "sm" ? 24 : size === "md" ? 32 : 48}
        className={`${sizeClasses[size]} rounded-lg`}
      />
      {showText && <span className={`${textSizeClasses[size]} font-bold ${textColorClass}`}>Zaza</span>}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className={className}>
        <div className="flex items-center space-x-2">
          <Image
            src="/zaza-logo.png"
            alt="Zaza"
            width={size === "sm" ? 24 : size === "md" ? 32 : 48}
            height={size === "sm" ? 24 : size === "md" ? 32 : 48}
            className={`${sizeClasses[size]} rounded-lg`}
          />
          {showText && <span className={`${textSizeClasses[size]} font-bold ${textColorClass}`}>Zaza</span>}
        </div>
      </Link>
    )
  }

  return logoContent
}
