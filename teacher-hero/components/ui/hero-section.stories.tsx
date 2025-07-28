import type { Meta, StoryObj } from "@storybook/react"
import HeroSection from "./hero-section"

const meta: Meta<typeof HeroSection> = {
  title: "Components/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof HeroSection>

export const Default: Story = {}

export const WithCustomClassName: Story = {
  args: {
    className: "border-t-4 border-blue-600",
  },
}
