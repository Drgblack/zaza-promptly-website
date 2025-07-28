import type { UserInteraction, MiniResourceCard } from "@/types/recommendations"

export class RecommendationEngine {
  static generateRecommendations(
    userInteractions: UserInteraction[],
    allResources: MiniResourceCard[],
    limit = 8,
  ): MiniResourceCard[] {
    if (userInteractions.length < 2) {
      return []
    }

    // Analyze user preferences
    const categoryPreferences = this.analyzeCategoryPreferences(userInteractions)
    const accessLevelPreferences = this.analyzeAccessLevelPreferences(userInteractions)

    // Score all resources
    const scores = allResources.map((resource) => ({
      resource,
      score: this.calculateResourceScore(resource, categoryPreferences, accessLevelPreferences, userInteractions),
    }))

    // Sort by score and return top recommendations
    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.resource)
  }

  private static analyzeCategoryPreferences(interactions: UserInteraction[]): Record<string, number> {
    const categoryCount: Record<string, number> = {}

    interactions.forEach((interaction) => {
      categoryCount[interaction.category] = (categoryCount[interaction.category] || 0) + 1
    })

    // Normalize to percentages
    const total = interactions.length
    Object.keys(categoryCount).forEach((category) => {
      categoryCount[category] = categoryCount[category] / total
    })

    return categoryCount
  }

  private static analyzeAccessLevelPreferences(interactions: UserInteraction[]): Record<string, number> {
    const accessCount: Record<string, number> = {}

    interactions.forEach((interaction) => {
      accessCount[interaction.accessLevel] = (accessCount[interaction.accessLevel] || 0) + 1
    })

    const total = interactions.length
    Object.keys(accessCount).forEach((level) => {
      accessCount[level] = accessCount[level] / total
    })

    return accessCount
  }

  private static calculateResourceScore(
    resource: MiniResourceCard,
    categoryPreferences: Record<string, number>,
    accessLevelPreferences: Record<string, number>,
    userInteractions: UserInteraction[],
  ): number {
    let score = 0

    // Category match bonus
    const categoryScore = categoryPreferences[resource.category] || 0
    score += categoryScore * 40

    // Access level preference bonus
    const accessScore = accessLevelPreferences[resource.accessLevel] || 0
    score += accessScore * 20

    // Popularity bonus (download count)
    score += Math.min(resource.downloadCount / 1000, 10)

    // Recency bonus for newer interactions
    const recentInteractions = userInteractions.filter(
      (i) => Date.now() - i.timestamp < 24 * 60 * 60 * 1000, // Last 24 hours
    )
    if (recentInteractions.some((i) => i.category === resource.category)) {
      score += 15
    }

    // Avoid already interacted resources
    const hasInteracted = userInteractions.some((i) => i.resourceId === resource.id)
    if (hasInteracted) {
      score -= 50
    }

    return score
  }
}
