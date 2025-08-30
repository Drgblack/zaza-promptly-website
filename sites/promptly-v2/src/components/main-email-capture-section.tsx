export default function Component() {
  if (process.env.NODE_ENV !== 'production') {
    return <div>Component: main-email-capture-section</div>
  }
  return null
}

// Named exports for flexibility
export const MainemailcapturesectionSection = Component
export const Mainemailcapturesection = Component
export const MainEmailCaptureSection = Component
