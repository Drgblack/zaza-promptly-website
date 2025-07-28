import type { Meta, StoryObj } from "@storybook/react"
import TestimonialCarousel from "./testimonial-carousel"
import { sampleTestimonials } from "@/data/testimonials"

const meta: Meta<typeof TestimonialCarousel> = {
  title: "Components/TestimonialCarousel",
  component: TestimonialCarousel,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof TestimonialCarousel>

export const Default: Story = {
  args: {
    testimonials: sampleTestimonials,
  },
}

export const FewTestimonials: Story = {
  args: {
    testimonials: sampleTestimonials.slice(0, 3),
  },
}
