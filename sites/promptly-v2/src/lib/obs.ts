export function capture(err: unknown, ctx?: Record<string, unknown>) {
  try { 
    // Dynamic import to avoid build-time dependency
    const S = eval('require')('@sentry/nextjs'); 
    S.captureException(err, { extra: ctx }); 
  } catch {
    // Silently fail if Sentry is not available
  }
}

export function setContext(key: string, val: unknown) {
  try { 
    // Dynamic import to avoid build-time dependency
    const S = eval('require')('@sentry/nextjs'); 
    S.setContext(key, val); 
  } catch {
    // Silently fail if Sentry is not available
  }
}