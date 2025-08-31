import * as Sentry from '@sentry/nextjs';
import React from 'react';

/**
 * Utility functions for Sentry error reporting and monitoring
 */

export function captureError(error: Error, context?: Record<string, unknown>) {
  return Sentry.captureException(error, {
    extra: context,
  });
}

export function captureMessage(message: string, level: 'error' | 'warning' | 'info' = 'info', context?: Record<string, unknown>) {
  return Sentry.captureMessage(message, {
    level,
    extra: context,
  });
}

export function setUser(user: { id: string; email?: string; username?: string }) {
  Sentry.setUser(user);
}

export function setTag(key: string, value: string) {
  Sentry.setTag(key, value);
}

export function setContext(key: string, context: Record<string, unknown>) {
  Sentry.setContext(key, context);
}

/**
 * Wrapper for API routes to automatically capture errors
 */
export function withSentryAPI<T extends unknown[], R>(
  handler: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    try {
      return await handler(...args);
    } catch (error) {
      captureError(error as Error);
      throw error;
    }
  };
}

/**
 * Higher-order component to wrap components with error boundary
 */
export function withSentry<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>
) {
  return function WrappedComponent(props: P) {
    return React.createElement(
      Sentry.ErrorBoundary,
      { 
        fallback: fallback ? ({ error, resetError }: { error: unknown; componentStack: string; eventId: string; resetError(): void }) => 
          React.createElement(fallback, { error: error as Error, retry: resetError }) : undefined 
      },
      React.createElement(Component, props)
    );
  };
}