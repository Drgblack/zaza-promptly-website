'use client';

import { usePathname } from 'next/navigation';
import { ZaraButton } from './ZaraButton';

// Routes where Zara 2.0 should be available
const ALLOWED_ROUTES = ['/learn', '/support', '/pricing', '/promptly'];

export function ZaraRouteIntegration() {
  const pathname = usePathname();
  
  // Check if current path matches any allowed route (with locale support)
  const isAllowedRoute = ALLOWED_ROUTES.some(route => {
    // Support for locale prefixes like /en/pricing, /de/pricing, etc.
    const localePattern = /^\/[a-z]{2}(\/.*)?$/;
    const match = pathname.match(localePattern);
    
    if (match) {
      // Extract path without locale prefix
      const pathWithoutLocale = match[1] || '/';
      return pathWithoutLocale === route || pathWithoutLocale.startsWith(route + '/');
    }
    
    // Check direct path match
    return pathname === route || pathname.startsWith(route + '/');
  });

  // Only render Zara 2.0 on allowed routes
  if (!isAllowedRoute) {
    return null;
  }

  return <ZaraButton />;
}