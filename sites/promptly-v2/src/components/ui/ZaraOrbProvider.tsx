'use client'

import { usePathname } from 'next/navigation'
import ZaraOrb from './ZaraOrb'

export default function ZaraOrbProvider() {
  const pathname = usePathname()
  
  // Don't show ZaraOrb on certain pages
  const excludedPaths = ['/privacy', '/terms', '/cookies']
  const shouldShowZara = !excludedPaths.some(path => pathname.startsWith(path))
  
  if (!shouldShowZara) {
    return null
  }
  
  // Detect if we're in the snippet tool area
  const isInSnippetTool = pathname === '/' && typeof window !== 'undefined'
  
  return <ZaraOrb isInSnippetTool={isInSnippetTool} />
}
