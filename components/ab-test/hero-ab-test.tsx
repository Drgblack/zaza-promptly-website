'use client';

import React from 'react';
import { useABTest } from '@/lib/ab-testing';
import { useAnalytics } from '@/hooks/useAnalytics';

interface HeroABTestProps {
  className?: string;
  onCTAClick?: (variantId: string, ctaText: string) => void;
}

export function HeroABTest({ className = '', onCTAClick }: HeroABTestProps) {
  const headlineTest = useABTest('hero_headline');
  const ctaTest = useABTest('cta_primary');
  const { trackCTAPrimaryClick, trackExperimentConversion } = useAnalytics();

  // Don't render anything while loading to prevent flashing
  if (headlineTest.isLoading || ctaTest.isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-16 bg-gray-200 rounded mb-4"></div>
        <div className="h-12 bg-gray-200 rounded w-48"></div>
      </div>
    );
  }

  const headlineContent = headlineTest.getContent();
  const ctaContent = ctaTest.getContent();

  const handleCTAClick = () => {
    // Track the specific CTA click
    trackCTAPrimaryClick(ctaContent, 'hero_section');
    
    // Track conversion for both experiments
    headlineTest.trackConversion('cta_click');
    ctaTest.trackConversion('cta_click');
    
    // Call parent handler if provided
    onCTAClick?.(ctaTest.assignment, ctaContent);
  };

  return (
    <div className={`hero-ab-test ${className}`}>
      <h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
        data-ab-test="hero_headline"
        data-ab-variant={headlineTest.assignment}
      >
        {headlineContent}
      </h1>
      
      <button
        onClick={handleCTAClick}
        className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        data-ab-test="cta_primary"
        data-ab-variant={ctaTest.assignment}
      >
        {ctaContent}
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>
  );
}

// Secondary CTA component for A/B testing
interface SecondaryCTAABTestProps {
  className?: string;
  onCTAClick?: (ctaText: string) => void;
}

export function SecondaryCTAABTest({ className = '', onCTAClick }: SecondaryCTAABTestProps) {
  const { trackCTASecondaryClick } = useAnalytics();
  
  const handleClick = () => {
    const ctaText = "Watch Demo";
    trackCTASecondaryClick(ctaText, 'hero_section');
    onCTAClick?.(ctaText);
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center px-6 py-3 text-lg font-medium text-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-200 ${className}`}
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Watch Demo
    </button>
  );
}