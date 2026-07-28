/**
 * Centralised auth/session state cleanup.
 * Call this from every logout, token-expiry, and 401 path.
 *
 * IMPORTANT: This only clears client-side state.
 * The server-side session/token is managed by the backend.
 */

const AUTH_KEYS = [
  'accessToken',
  'idUser',
  'userRole',
  'userImage',
  'statusSuscription',
  'campusId',
  'campusIdForAdmin',
  'billingCycle',
  'planId',
  // Schedule selection state (stale across sessions)
  'idCenter',
  'centerName',
  'idClass',
  'className',
  'idYear',
  'yearName',
  'idMonth',
  'monthName',
] as const;

export function clearAuthState(): void {
  AUTH_KEYS.forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // localStorage may throw in some browser modes (e.g. private browsing)
    }
  });
}
