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

/**
 * Decode the role claim from the stored JWT access token.
 *
 * Client-side only. This gates UI rendering, NOT access.
 * Authorization is enforced by the backend on every request.
 *
 * @returns The role string (e.g. 'ADMIN', 'TEACHER', 'OWNER') or null if the
 *          token is missing, malformed, expired, or has no role claim.
 */
export function getSessionRole(): string | null {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    // JWT format: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Base64url-decode the payload (JWT uses base64url, not standard base64)
    let payload = parts[1];
    payload = payload.replace(/-/g, '+').replace(/_/g, '/');
    // Pad to a multiple of 4
    while (payload.length % 4 !== 0) {
      payload += '=';
    }

    const decoded = JSON.parse(atob(payload));

    // Check expiry
    if (decoded.exp && Date.now() / 1000 > decoded.exp) {
      clearAuthState();
      return null;
    }

    return decoded.role || null;
  } catch {
    // Token is malformed — treat as unauthenticated
    clearAuthState();
    return null;
  }
}
