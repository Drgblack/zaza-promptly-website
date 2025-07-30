'use client';

import { useAnalytics } from '@/hooks/useAnalytics';
import { Button } from '@/components/ui/button';

// Test component to verify Plausible analytics integration
// Only use for development testing - remove from production

export function AnalyticsTest() {
  const { 
    trackButtonClick, 
    trackEmailSubmit, 
    trackUpgradeClick, 
    trackCommentRewrite,
    shouldTrack 
  } = useAnalytics();

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 border rounded-lg shadow-lg z-50">
      <h3 className="text-sm font-bold mb-2">Analytics Test</h3>
      <p className="text-xs text-gray-600 mb-2">
        Tracking: {shouldTrack ? 'Enabled' : 'Disabled'}
      </p>
      <div className="space-y-2">
        <Button 
          size="sm" 
          onClick={() => trackButtonClick('Test Button', 'dev-panel')}
        >
          Test Button Click
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => trackEmailSubmit('dev-panel', 'test')}
        >
          Test Email Submit
        </Button>
        <Button 
          size="sm" 
          variant="secondary"
          onClick={() => trackUpgradeClick('premium', 'dev-panel')}
        >
          Test Upgrade Click
        </Button>
        <Button 
          size="sm" 
          variant="destructive"
          onClick={() => trackCommentRewrite()}
        >
          Test Comment Rewrite
        </Button>
      </div>
    </div>
  );
}