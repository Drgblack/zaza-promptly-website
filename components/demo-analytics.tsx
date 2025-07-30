'use client';

import { useAnalytics } from '@/lib/analytics';

// Analytics wrapper for demo interactions
export function useDemoAnalytics() {
  const { trackCommentRewrite, trackFeatureClick, trackButtonClick } = useAnalytics();

  const trackCommentGenerated = (feature: string, source: string = 'demo') => {
    trackCommentRewrite(feature, source);
  };

  const trackDemoFeatureUsed = (feature: string, location: string = 'demo_section') => {
    trackFeatureClick(feature, location);
  };

  const trackDemoButtonClick = (buttonText: string, location: string = 'demo_section') => {
    trackButtonClick(buttonText, location);
  };

  return {
    trackCommentGenerated,
    trackDemoFeatureUsed,
    trackDemoButtonClick,
  };
}

// Example usage in demo components:
/*
const { trackCommentGenerated, trackDemoFeatureUsed } = useDemoAnalytics();

// Track when AI generates a comment
const handleGenerateComment = () => {
  trackCommentGenerated('parent_communication', 'homepage_demo');
  // ... rest of generation logic
};

// Track feature interactions
const handleToneChange = (tone: string) => {
  trackDemoFeatureUsed(`tone_${tone}`, 'demo_section');
  // ... rest of tone change logic
};
*/