"use client"
import * as Mod from "@/components/teacher-testimonials"
const Real = (Mod as any).default ?? (Mod as any).TeacherTestimonials ?? Mod

type Props = {
  limit?: number
  [key: string]: any
}

export default function TeacherTestimonialsAdapter(props: Props) {
  return <Real {...props} />
}