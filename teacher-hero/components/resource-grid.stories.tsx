import type { Meta, StoryObj } from "@storybook/react"
import ResourceGrid from "./resource-grid"
import { sampleResources } from "@/data/sample-resources"

const meta: Meta<typeof ResourceGrid> = {
  title: "Components/ResourceGrid",
  component: ResourceGrid,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof ResourceGrid>

export const Default: Story = {
  args: {
    resources: sampleResources,
  },
}

export const Empty: Story = {
  args: {
    resources: [],
  },
}

export const SingleColumn: Story = {
  args: {
    resources: sampleResources.slice(0, 3),
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
}
