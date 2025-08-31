import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.SENTRY_ENV || process.env.NEXT_PUBLIC_ENV || 'development',
    tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE || 0),
    replaysSessionSampleRate: Number(process.env.SENTRY_REPLAYS_SESSION_SAMPLE_RATE || 0),
    replaysOnErrorSampleRate: Number(process.env.SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE || 0),
    beforeSend(event) {
      // Filter out common noise
      if (event.exception) {
        const error = event.exception.values?.[0];
        if (
          error?.type === 'ChunkLoadError' ||
          error?.type === 'TypeError' && error?.value?.includes('NetworkError') ||
          error?.value?.includes('Failed to fetch')
        ) {
          return null; // Don't send network-related errors
        }
      }
      return event;
    },
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
        maskAllInputs: true,
      }),
      Sentry.feedbackIntegration({
        colorScheme: 'light',
      }),
    ],
    // Set context tags
    initialScope: {
      tags: {
        component: 'client',
      },
    },
  });
}
