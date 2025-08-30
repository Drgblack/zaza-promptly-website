export default function Component() {
  if (process.env.NODE_ENV !== 'production') {
    return <div>Component: accessibility-announcer</div>
  }
  return null
}

// Named exports for flexibility
export const AccessibilityannouncerSection = Component
export const Accessibilityannouncer = Component
export const AccessibilityAnnouncer = Component
