interface LazyContentProps {
  children: React.ReactNode;
}

export default function Component({ children }: LazyContentProps) {
  return <>{children}</>
}

// Named exports for flexibility
export const LazyloadingSection = Component
export const Lazyloading = Component
export const LazyLoading = Component
export const LazyContent = Component
