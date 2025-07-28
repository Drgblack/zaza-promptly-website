export interface Testimonial {
  id: string
  teacherName: string
  school: string
  subject: string
  quote: string
  resourceUsed: string
  avatarUrl?: string
}

export interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  className?: string
}
