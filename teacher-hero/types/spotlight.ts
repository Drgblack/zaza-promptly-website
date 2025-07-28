export interface SpotlightResource {
  id: string
  title: string
  description: string
  downloadUrl: string
  category: string
  fileType: "pdf" | "docx" | "pptx" | "zip"
  thumbnailUrl?: string
  month: string
  year: number
  rating: number // 1-5 stars
  downloadCount?: number
  testimonial?: {
    quote: string
    author: string
    school?: string
  }
}

export interface SpotlightResourceProps {
  resource: SpotlightResource
  className?: string
}
