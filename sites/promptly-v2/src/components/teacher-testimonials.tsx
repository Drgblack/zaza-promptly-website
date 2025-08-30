export default function Component() {
  if (process.env.NODE_ENV !== 'production') {
    return <div>Component: teacher-testimonials</div>
  }
  return null
}

// Named exports for flexibility
export const TeachertestimonialsSection = Component
export const Teachertestimonials = Component
export const TeacherTestimonials = Component
