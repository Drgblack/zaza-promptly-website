"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Mail, Star } from "lucide-react"
import type { ResourceCardProps } from "@/types/resource"
import { useCallback } from "react"

const fileTypeIcons = {
  pdf: "📄",
  docx: "📝",
  pptx: "📊",
  zip: "📦",
}

const accessLevelConfig = {
  instant: {
    label: "Instant Download",
    icon: Download,
    variant: "default" as const,
    buttonText: "Download Now",
  },
  email: {
    label: "Email Required",
    icon: Mail,
    variant: "secondary" as const,
    buttonText: "Get Resource",
  },
  enhanced: {
    label: "Enhanced Access",
    icon: Star,
    variant: "outline" as const,
    buttonText: "Unlock Resource",
  },
}

export default function ResourceCard({ resource, onInteraction, className = "" }: ResourceCardProps) {
  const { title, description, category, fileType, accessLevel, downloadUrl } = resource
  const accessConfig = accessLevelConfig[accessLevel]
  const AccessIcon = accessConfig.icon

  const handleDownload = useCallback(() => {
    // Track interaction for onboarding
    onInteraction?.()

    if (accessLevel === "instant") {
      // Direct download
      window.open(downloadUrl, "_blank")
    } else if (accessLevel === "email") {
      // Redirect to email capture form
      console.log("Redirect to email capture for:", resource.id)
    } else {
      // Enhanced access - redirect to signup/login
      console.log("Redirect to enhanced access for:", resource.id)
    }
  }, [accessLevel, downloadUrl, resource.id, onInteraction])

  return (
    <Card
      className={`group h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${className}`}
      onClick={handleDownload}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
              {title}
            </CardTitle>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {category}
              </Badge>
              <span className="text-sm text-gray-500">
                {fileTypeIcons[fileType]} {fileType.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <CardDescription className="text-sm leading-relaxed text-gray-600">{description}</CardDescription>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex w-full flex-col gap-3">
          <div className="flex items-center gap-2">
            <AccessIcon className="h-4 w-4 text-gray-500" />
            <Badge variant={accessConfig.variant} className="text-xs">
              {accessConfig.label}
            </Badge>
          </div>

          <Button
            onClick={handleDownload}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            size="sm"
          >
            {accessConfig.buttonText}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
