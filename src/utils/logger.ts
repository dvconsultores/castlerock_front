/**
 * Security-aware logger — gates all output behind DEV mode.
 * In production, all console output is silenced.
 * A future production error reporter can be plugged in here.
 */
const isDev = import.meta.env.DEV;

export const logger = {
  debug: (...args: unknown[]) => {
    if (isDev) console.log(...args);
  },
  warn: (...args: unknown[]) => {
    if (isDev) console.warn(...args);
  },
  /**
   * Log an error. In production this is a no-op.
   * Connect a remote error reporter (Sentry, etc.) here if needed.
   * NEVER pass Stripe objects, tokens, or raw API responses.
   */
  error: (msg: string, _err?: unknown) => {
    if (isDev) {
      console.error(msg, _err);
    }
    // TODO: production error reporter integration point
  },
};
