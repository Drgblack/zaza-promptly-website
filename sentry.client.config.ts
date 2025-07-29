import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Session Replay - only in production
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Environment setup
  environment: process.env.NODE_ENV,

  // Enhanced configuration for educational app
  beforeSend(event, hint) {
    // Filter out noise and PII
    if (event.exception) {
      const error = hint.originalException;
      
      // Don't send network errors or CORS issues
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return null;
      }
    }

    // Sanitize sensitive data from URLs and messages
    if (event.request?.url) {
      event.request.url = event.request.url.replace(/email=([^&]+)/g, 'email=***');
    }

    if (event.message) {
      event.message = event.message.replace(/email:\s*([^\s,]+)/gi, 'email: ***');
    }

    return event;
  },

  // Custom tags for educational context
  initialScope: {
    tags: {
      component: "client",
      app: "zaza-promptly",
      userType: "teacher"
    },
  },
});