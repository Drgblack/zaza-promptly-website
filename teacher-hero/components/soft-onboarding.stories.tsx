import type { Meta, StoryObj } from "@storybook/react"
import SoftOnboarding from "./soft-onboarding"

const meta: Meta<typeof SoftOnboarding> = {
  title: "Components/SoftOnboarding",
  component: SoftOnboarding,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof SoftOnboarding>

export const Visible: Story = {
  args: {
    isVisible: true,
    onDismiss: () => console.log("Dismissed"),
    onSignUp: () => console.log("Sign up clicked"),
  },
}

export const Hidden: Story = {
  args: {
    isVisible: false,
    onDismiss: () => console.log("Dismissed"),
    onSignUp: () => console.log("Sign up clicked"),
  },
}
