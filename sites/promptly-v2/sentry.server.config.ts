import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.SENTRY_ENV || process.env.NEXT_PUBLIC_ENV || 'development',
    tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE || 0),
    beforeSend(event) {
      // Filter out common noise
      if (event.exception) {
        const error = event.exception.values?.[0];
        if (error?.type === 'ChunkLoadError') {
          return null; // Don't send chunk load errors
        }
      }
      return event;
    },
    integrations: [
      // Add Node.js specific integrations
      Sentry.httpIntegration(),
    ],
    // Set context tags
    initialScope: {
      tags: {
        component: 'server',
      },
    },
  });
}
