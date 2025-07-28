"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Mail, Star } from "lucide-react"
import type { MiniResourceCardProps, UserInteraction } from "@/types/recommendations"

const fileTypeIcons = {
  pdf: "📄",
  docx: "📝",
  pptx: "📊",
  zip: "📦",
}

const topicTagIcons = {
  ks3: "🎓",
  ks4: "🎓",
  ks5: "🎓",
  wellbeing: "💝",
  differentiation: "🔄",
  assessment: "📊",
  "creative-arts": "🎨",
  stem: "🔢",
}

const accessLevelIcons = {
  instant: Download,
  email: Mail,
  enhanced: Star,
}

export default function MiniResourceCard({ resource, onInteraction, className = "" }: MiniResourceCardProps) {
  const { id, title, category, fileType, downloadUrl, downloadCount, accessLevel, topicTags } = resource
  const AccessIcon = accessLevelIcons[accessLevel]

  const handleQuickDownload = (e: React.MouseEvent) => {
    e.stopPropagation()

    // Track interaction
    const interaction: UserInteraction = {
      resourceId: id,
      category,
      accessLevel,
      timestamp: Date.now(),
      action: "download",
    }
    onInteraction(interaction)

    if (accessLevel === "instant") {
      window.open(downloadUrl, "_blank")
    } else {
      console.log("Redirect to access flow for:", id)
    }
  }

  const handleCardHover = () => {
    const interaction: UserInteraction = {
      resourceId: id,
      category,
      accessLevel,
      timestamp: Date.now(),
      action: "hover",
    }
    onInteraction(interaction)
  }

  const handleCardView = () => {
    const interaction: UserInteraction = {
      resourceId: id,
      category,
      accessLevel,
      timestamp: Date.now(),
      action: "view",
    }
    onInteraction(interaction)
  }

  return (
    <Card
      className={`w-64 h-32 flex-shrink-0 group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${className}`}
      onMouseEnter={handleCardHover}
      onClick={handleCardView}
    >
      <CardContent className="p-3 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {title}
            </h4>
          </div>
          <span className="text-lg flex-shrink-0">{fileTypeIcons[fileType]}</span>
        </div>

        {/* Tags and Category */}
        <div className="flex items-center gap-1 flex-wrap">
          <Badge variant="outline" className="text-xs px-1 py-0">
            {category}
          </Badge>
          {topicTags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs" title={tag}>
              {topicTagIcons[tag]}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Download className="h-3 w-3" />
            <span>{downloadCount.toLocaleString()}</span>
          </div>

          <Button
            onClick={handleQuickDownload}
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700"
          >
            <AccessIcon className="h-3 w-3 mr-1" />
            Quick
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
