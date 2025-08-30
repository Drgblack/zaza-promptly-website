export default function Component() {
  if (process.env.NODE_ENV !== 'production') {
    return <div>Component: core-promises-section</div>
  }
  return null
}

// Named exports for flexibility
export const CorepromisessectionSection = Component
export const Corepromisessection = Component
export const CorePromisesSection = Component
