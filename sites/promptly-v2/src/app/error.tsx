'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Only capture to Sentry if DSN is configured
    if (process.env.SENTRY_DSN) {
      try {
        Sentry.captureException(error);
      } catch {
        // Silently fail if Sentry is not available
      }
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
          <p className="text-gray-600">
            We apologize for the inconvenience. An unexpected error has occurred.
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Try again
          </button>
          
          <a
            href="/"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Go home
          </a>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Technical details (development only)
            </summary>
            <pre className="mt-2 text-xs text-red-600 bg-red-50 p-3 rounded border overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
