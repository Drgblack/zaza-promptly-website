# Feature Flags System

A simple, environment-based feature flags system for Zaza Promptly that enables controlled feature rollouts and A/B testing without external services.

## Overview

The feature flags system provides:
- Environment-based feature control (development/production)
- Percentage-based rollouts for A/B testing
- Local overrides for development testing
- React components for conditional rendering
- Admin interface for development

## Usage

### Basic Flag Check

```typescript
import { isFeatureEnabled } from '@/lib/feature-flags'

if (isFeatureEnabled('NEW_FEATURE')) {
  // Show new feature
}
```

### React Component

```tsx
import { FeatureFlag } from '@/components/feature-flags'

function MyComponent() {
  return (
    <FeatureFlag flag="NEW_UI" fallback={<OldUI />}>
      <NewUI />
    </FeatureFlag>
  )
}
```

### React Hook

```tsx
import { useFeatureFlag } from '@/components/feature-flags'

function MyComponent() {
  const showNewFeature = useFeatureFlag('NEW_FEATURE')
  
  return (
    <div>
      {showNewFeature ? <NewFeature /> : <OldFeature />}
    </div>
  )
}
```

### Higher-Order Component

```tsx
import { withFeatureFlag } from '@/components/feature-flags'

const NewFeatureComponent = withFeatureFlag('NEW_FEATURE', MyComponent, FallbackComponent)
```

## Feature Flag Configuration

Feature flags are defined in `src/lib/feature-flags.ts`:

```typescript
export const DEFAULT_FEATURE_FLAGS: FeatureFlagConfig = {
  NEW_FEATURE: {
    name: 'New Feature',
    description: 'Enable the new feature',
    enabled: true,
    environment: 'development', // 'development' | 'production' | 'all'
    rolloutPercentage: 50 // Optional: 0-100% rollout
  }
}
```

### Flag Properties

- `name`: Human-readable feature name
- `description`: Description of what the feature does
- `enabled`: Whether the flag is enabled globally
- `environment`: Which environment(s) the flag applies to
- `rolloutPercentage`: Optional percentage-based rollout (0-100)

## Development Tools

### Admin Interface

In development, use the floating admin panel:

```tsx
import { FeatureFlagAdmin } from '@/components/feature-flags'

// Add to your layout (development only)
<FeatureFlagAdmin />
```

The admin interface allows you to:
- View all feature flags and their status
- Toggle local overrides for testing
- See environment and rollout information
- Clear all local overrides

### Debug Panel

Show current flag status:

```tsx
import { FeatureFlagDebug } from '@/components/feature-flags'

// Shows debug info in development
<FeatureFlagDebug />
```

## Current Feature Flags

### Demo and Onboarding
- `INTERACTIVE_DEMO`: Interactive AI demo page
- `DEMO_TYPING_ANIMATION`: Realistic typing animation in demo

### Resources
- `PDF_RESOURCES`: PDF downloads on resources page
- `RESOURCE_PREVIEW_IMAGES`: Preview images for resources

### Navigation
- `ENHANCED_NAVIGATION`: Updated navigation with Resources and Demo
- `MOBILE_MENU_V2`: Improved mobile navigation

### Content
- `BLOG_PAGINATION`: Pagination on blog pages
- `CASE_STUDY_COMMENTS`: Comments on case studies (dev only)

### Marketing
- `PRICING_COMPARISON`: Competitor comparison (50% rollout)
- `FREE_TRIAL_BANNER`: Free trial promotion banner

### Experimental
- `AI_CHAT_SUPPORT`: AI chat widget (dev only)
- `DARK_MODE`: Dark theme toggle (dev only)

### Performance
- `IMAGE_OPTIMIZATION`: Optimized images and lazy loading
- `ADVANCED_CACHING`: Advanced caching strategies (production only)

## Best Practices

1. **Naming**: Use SCREAMING_SNAKE_CASE for flag names
2. **Descriptions**: Provide clear, actionable descriptions
3. **Environment**: Set appropriate environment restrictions
4. **Rollouts**: Start with small percentages for new features
5. **Cleanup**: Remove flags after full rollout or feature removal
6. **Testing**: Use local overrides for development testing

## Rollout Strategy

1. **Development**: Test with flag enabled locally
2. **Staging**: Enable for testing environment
3. **Production Rollout**:
   - Start with 10% rollout
   - Monitor metrics and errors
   - Gradually increase to 25%, 50%, 100%
4. **Full Release**: Set `enabled: true` and remove rolloutPercentage
5. **Cleanup**: Remove flag after stable release

## Examples

### Simple Feature Toggle

```tsx
<FeatureFlag flag="NEW_DASHBOARD">
  <NewDashboard />
</FeatureFlag>
```

### A/B Testing

```typescript
// 50% of users see new pricing page
const showNewPricing = isFeatureEnabled('NEW_PRICING_PAGE', userId)
```

### Environment-Specific

```typescript
// Only enabled in development
EXPERIMENTAL_FEATURE: {
  enabled: true,
  environment: 'development'
}
```

### Gradual Rollout

```typescript
// Gradually rolled out to 25% of users
BETA_FEATURE: {
  enabled: true,
  rolloutPercentage: 25
}
```