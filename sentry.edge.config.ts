import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Performance Monitoring - lighter for edge
  tracesSampleRate: 0.05,

  // Environment setup
  environment: process.env.NODE_ENV,

  // Edge-specific configuration
  beforeSend(event, hint) {
    // Minimal processing for edge runtime
    if (event.request?.url) {
      event.request.url = event.request.url.replace(/email=([^&]+)/g, 'email=***');
    }

    return event;
  },

  // Custom tags for edge context
  initialScope: {
    tags: {
      component: "edge",
      app: "zaza-promptly",
      runtime: "edge"
    },
  },
});