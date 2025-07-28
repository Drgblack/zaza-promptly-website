export interface UserInteraction {
  resourceId: string
  category: string
  accessLevel: "instant" | "email" | "enhanced"
  timestamp: number
  action: "view" | "download" | "hover"
}

export interface RecommendationScore {
  resourceId: string
  score: number
  reasons: string[]
}

export interface MiniResourceCard {
  id: string
  title: string
  category: string
  fileType: "pdf" | "docx" | "pptx" | "zip"
  downloadUrl: string
  downloadCount: number
  accessLevel: "instant" | "email" | "enhanced"
  topicTags: TopicTag[]
}

export type TopicTag = "ks3" | "ks4" | "ks5" | "wellbeing" | "differentiation" | "assessment" | "creative-arts" | "stem"

export interface RecommendationsSectionProps {
  userInteractions: UserInteraction[]
  allResources: MiniResourceCard[]
  onResourceInteraction: (interaction: UserInteraction) => void
  className?: string
}

export interface MiniResourceCardProps {
  resource: MiniResourceCard
  onInteraction: (interaction: UserInteraction) => void
  className?: string
}
