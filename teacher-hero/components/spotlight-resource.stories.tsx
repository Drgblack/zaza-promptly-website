import type { Meta, StoryObj } from "@storybook/react"
import SpotlightResource from "./spotlight-resource"
import { currentSpotlightResource } from "@/data/spotlight-resource"

const meta: Meta<typeof SpotlightResource> = {
  title: "Components/SpotlightResource",
  component: SpotlightResource,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof SpotlightResource>

export const Default: Story = {
  args: {
    resource: currentSpotlightResource,
  },
}

export const WithoutThumbnail: Story = {
  args: {
    resource: {
      ...currentSpotlightResource,
      thumbnailUrl: undefined,
    },
  },
}

export const LowRating: Story = {
  args: {
    resource: {
      ...currentSpotlightResource,
      rating: 3,
      downloadCount: 156,
    },
  },
}
