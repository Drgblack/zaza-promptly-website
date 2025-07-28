export interface ResourceCard {
  id: string
  title: string
  description: string
  downloadUrl: string
  accessLevel: "instant" | "email" | "enhanced"
  category: string
  fileType: "pdf" | "docx" | "pptx" | "zip"
}

export interface ResourceGridProps {
  resources: ResourceCard[]
  className?: string
}

export interface ResourceCardProps {
  resource: ResourceCard
  className?: string
}
