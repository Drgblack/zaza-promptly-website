export function capture(err: unknown, ctx?: Record<string, unknown>) {
  try { 
    const S = require('@sentry/nextjs'); 
    S.captureException(err, { extra: ctx }); 
  } catch {
    // Silently fail if Sentry is not available
  }
}

export function setContext(key: string, val: unknown) {
  try { 
    const S = require('@sentry/nextjs'); 
    S.setContext(key, val); 
  } catch {
    // Silently fail if Sentry is not available
  }
}