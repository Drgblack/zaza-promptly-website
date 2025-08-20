'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AccessibleCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered' | 'gradient';
  badge?: {
    text: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  announcement?: string; // For screen readers
  focusable?: boolean;
  reducedMotion?: boolean;
}

export function AccessibleCard({
  title,
  description,
  children,
  className,
  variant = 'default',
  badge,
  announcement,
  focusable = false,
  reducedMotion = false
}: AccessibleCardProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [announced, setAnnounced] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches || reducedMotion);

    // Check for high contrast preference
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    setHighContrast(contrastQuery.matches);

    // Listen for changes
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    const handleContrastChange = (e: MediaQueryListEvent) => setHighContrast(e.matches);

    mediaQuery.addEventListener('change', handleMotionChange);
    contrastQuery.addEventListener('change', handleContrastChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, [reducedMotion]);

  // Announce content for screen readers when card comes into focus
  const handleFocus = () => {
    if (announcement && !announced) {
      const announcer = document.createElement('div');
      announcer.setAttribute('role', 'status');
      announcer.setAttribute('aria-live', 'polite');
      announcer.className = 'sr-only';
      announcer.textContent = announcement;
      document.body.appendChild(announcer);
      
      setTimeout(() => {
        document.body.removeChild(announcer);
      }, 1000);
      
      setAnnounced(true);
    }
  };

  const getVariantClasses = () => {
    const baseClasses = 'transition-all duration-200';
    
    switch (variant) {
      case 'elevated':
        return cn(
          baseClasses,
          'shadow-lg hover:shadow-xl',
          !prefersReducedMotion && 'hover:transform hover:-translate-y-1',
          highContrast && 'border-2 border-gray-900'
        );
      case 'bordered':
        return cn(
          baseClasses,
          'border-2 border-gray-200',
          highContrast && 'border-gray-900 border-4'
        );
      case 'gradient':
        return cn(
          baseClasses,
          'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200',
          !prefersReducedMotion && 'hover:from-purple-100 hover:to-pink-100',
          highContrast && 'from-white to-gray-100 border-gray-900 border-2'
        );
      default:
        return cn(
          baseClasses,
          !prefersReducedMotion && 'hover:shadow-md',
          highContrast && 'border border-gray-900'
        );
    }
  };

  const getTextClasses = () => ({
    title: cn(
      'text-lg font-semibold',
      highContrast ? 'text-black' : 'text-gray-900'
    ),
    description: cn(
      'text-sm',
      highContrast ? 'text-gray-800' : 'text-gray-600'
    ),
    content: cn(
      highContrast ? 'text-black' : 'text-gray-700'
    )
  });

  const textClasses = getTextClasses();

  return (
    <Card
      className={cn(getVariantClasses(), className)}
      tabIndex={focusable ? 0 : -1}
      onFocus={handleFocus}
      role={focusable ? 'button' : undefined}
      aria-label={focusable ? `${title}${description ? `, ${description}` : ''}` : undefined}
    >
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className={textClasses.title}>
              {title}
              {/* Screen reader only text for context */}
              <span className="sr-only">
                {badge ? `, ${badge.text}` : ''}
              </span>
            </CardTitle>
            {description && (
              <CardDescription className={textClasses.description}>
                {description}
              </CardDescription>
            )}
          </div>
          
          {badge && (
            <Badge 
              variant={badge.variant} 
              className={cn(
                'ml-2 flex-shrink-0',
                highContrast && 'bg-black text-white border-black'
              )}
              aria-label={`Status: ${badge.text}`}
            >
              {badge.text}
            </Badge>
          )}
        </div>

        {/* High contrast mode indicator (hidden from screen readers as it's visual only) */}
        {highContrast && (
          <div 
            className="absolute top-2 right-2 opacity-50"
            aria-hidden="true"
          >
            <Eye className="w-4 h-4" />
          </div>
        )}
      </CardHeader>

      <CardContent className={textClasses.content}>
        {children}
        
        {/* Skip link for keyboard navigation */}
        {focusable && (
          <a 
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white p-2 rounded border-2 border-black"
          >
            Skip to main content
          </a>
        )}
      </CardContent>

      {/* Live region for dynamic content announcements */}
      <div 
        id={`card-announcements-${title.replace(/\s+/g, '-').toLowerCase()}`}
        role="status" 
        aria-live="polite" 
        className="sr-only"
      />

      {/* CSS for enhanced accessibility */}
      <style jsx>{`
        /* Focus indicators */
        .focus\\:not-sr-only:focus {
          position: absolute !important;
          width: auto !important;
          height: auto !important;
          clip: auto !important;
          white-space: normal !important;
        }

        /* High contrast mode adjustments */
        @media (prefers-contrast: high) {
          .bg-gradient-to-br {
            background: white !important;
          }
          
          .shadow-lg,
          .shadow-xl {
            box-shadow: 0 0 0 2px black !important;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .transition-all,
          .hover\\:transform {
            transition: none !important;
            transform: none !important;
          }
        }

        /* Screen reader only class */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </Card>
  );
}