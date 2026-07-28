# Security Audit Report — CASTLEROCK Frontend

**Date:** 2026-07-28
**Auditor:** Automated Security Review (Read-Only)
**Scope:** Vue 3 frontend at `/home/andres/vsCodeProjects/Castlerock/castlerock_front`
**Methodology:** Static code analysis of all `.vue`, `.ts`, `.js`, `.html`, and config files.

---

## 1. Executive Summary

The CASTLEROCK frontend is a Vue 3 + Vuetify SPA handling student/center management with Stripe payments and NEAR wallet integration. The audit identified **2 Critical**, **4 High**, **5 Medium**, and **2 Low** severity findings. The most urgent issues are: (a) **six unsanitized `v-html` bindings** rendering API data without any XSS sanitization, (b) **all environment variables** (not just `VITE_*`) are exposed in the client bundle via the Vite `define` config, and (c) JWT tokens stored in `localStorage` with no HttpOnly cookie fallback. Production `console.log` statements leak payment method IDs, user context, and Stripe card events. No Content-Security-Policy is configured. On the positive side, no `eval()`, `postMessage`, `iframe`, or `target="_blank"` issues were found, source maps are disabled in production, and no `.env` files are committed to the repository.

---

## 2. Findings Table

| ID | Severity | Title | File:Line |
|----|----------|-------|-----------|
| F-01 | **Critical** | Unsanitized `v-html` rendering of API data (XSS) | `src/views/students.vue:40`, `src/views/new-enrollments.vue:40,44`, `src/views/inactive-students.vue:40`, `src/views/teachers.vue:27`, `src/views/withdrawal-dates.vue:40` |
| F-02 | **Critical** | All environment variables exposed to client bundle | `vite.config.ts:33` |
| F-03 | **High** | JWT access token stored in `localStorage` (XSS-stealable) | `src/views/login.vue:151–157`, `src/plugins/axios.ts:38`, `src/router/router.ts:286` |
| F-04 | **High** | Hardcoded encryption secret in shipped bundle | `src/plugins/vueSecureStorage.ts:7` |
| F-05 | **High** | Production `console.log` leaks payment/PII data | `src/views/register.vue:438–522`, `src/views/payment-renewal.vue:488,846`, `src/components/StripePaymentForm.vue:33–97` |
| F-06 | **High** | No Content-Security-Policy (CSP) configured | `index.html`, `nginx.conf` |
| F-07 | **Medium** | Client-side only authorization — role from `localStorage` | `src/router/router.ts:286–320`, `src/components/drawer.vue:62–64`, `src/components/navbar.vue:186–188` |
| F-08 | **Medium** | External CDN stylesheet without Subresource Integrity (SRI) | `index.html:6` |
| F-09 | **Medium** | NEAR wallet private keys in `BrowserLocalStorageKeyStore` | `src/services/nearConfig.ts:17,25` |
| F-10 | **Medium** | Error response details leaked via `console.error` | 43 locations across 25 files (see §3.10) |
| F-11 | **Medium** | PII/subscription data persisted in `localStorage` | `src/views/login.vue:151–158`, `src/views/payment-renewal.vue:387–404` |
| F-12 | **Low** | Logout does not invalidate server-side token/session | `src/components/drawer.vue:71–81` |
| F-13 | **Low** | Inconsistent `localStorage` cleanup across code paths | `src/router/router.ts:304–306` (only 3 of 11+ keys cleared) |

---

## 3. Detailed Findings

### F-01 — Unsanitized `v-html` Rendering of API Data (XSS) — **Critical**

**Description:** Six `v-html` directives render `item.classes` (and `item.nextClasses` in new-enrollments) directly from API responses. The data originates from `student.classes.map(c => c.name).join('<br>')` (see `src/views/students.vue:198`). No HTML sanitization library (DOMPurify, sanitize-html) is imported anywhere in the project. If an attacker compromises the backend or a class name contains HTML/JavaScript, stored XSS is executed in every user's browser viewing these tables.

**Evidence:**
```html
<!-- src/views/students.vue:40 -->
<div class="center" v-html="item.classes"></div>

<!-- src/views/new-enrollments.vue:40,44 -->
<div class="center" v-html="item.classes"></div>
<div class="center" v-html="item.nextClasses"></div>

<!-- src/views/students.vue:198 — data construction -->
classes: Array.isArray(student.classes)
  ? student.classes.map(c => c.name).join('<br>')
  : '',
```

**Impact:** An attacker who can inject `<img src=x onerror=alert(document.cookie)>` into a class/campus name via the backend (or a compromised admin account) achieves stored XSS against ALL users viewing student rosters, enrollment lists, inactive student tables, teacher lists, and withdrawal date tables. The attacker can steal JWT tokens from `localStorage`, impersonate users, exfiltrate student PII, and initiate fraudulent Stripe transactions.

**Likelihood:** Medium-High. Requires backend data compromise, but the blast radius is every authenticated user viewing any data table. No CSP mitigates the impact.

**Recommended Fix:**
```html
<!-- Replace v-html with text interpolation -->
<div class="center">{{ item.classes }}</div>
```
Or, if HTML rendering is truly needed:
```typescript
// Install: npm install dompurify
import DOMPurify from 'dompurify';

// In data mapping:
classes: DOMPurify.sanitize(
  Array.isArray(student.classes)
    ? student.classes.map(c => c.name).join('<br>')
    : ''
),
```

**References:** CWE-79, OWASP A03:2021 – Injection

---

### F-02 — All Environment Variables Exposed to Client Bundle — **Critical**

**Description:** `vite.config.ts:33` uses `'process.env': env` where `env` is the result of `loadEnv(mode, process.cwd())` (line 8). Vite's `loadEnv` loads ALL variables from `.env` files regardless of prefix. The comment on line 33 says "Expose all VITE_* environment variables to client" but the code actually exposes EVERY environment variable, including `VITE_FIREBASE_API_KEY`, `VITE_STRIPE_PUBLISHABLE_KEY`, and potentially `DATABASE_URL`, `JWT_SECRET`, or any other secrets if present in `.env` files. Additionally, `firebase.ts:8–13` accesses these via `process.env.VITE_*` rather than the Vite-recommended `import.meta.env.VITE_*`.

**Evidence:**
```typescript
// vite.config.ts:7-8, 31-34
const env = loadEnv(mode, process.cwd())  // loads ALL vars, not just VITE_*
// ...
define: {
  global: 'window',
  // Expose all VITE_* environment variables to client
  'process.env': env   // <-- actually exposes ALL env vars
},
```

**Impact:** Any secret placed in `.env` files (even without `VITE_` prefix) is bundled into the production JavaScript and visible to anyone who inspects the shipped code. Firebase API keys, Stripe publishable keys, and NEAR network config are already exposed (as expected for frontend keys), but any backend secret accidentally present would be leaked.

**Likelihood:** High for secrets exposure if `.env` contains non-public variables. The current codebase has no `.env` committed to the repo, but the build configuration is a ticking time bomb.

**Recommended Fix:**
```typescript
// vite.config.ts
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')  // Filter to VITE_ only
  // Or better, don't pass process.env at all — use import.meta.env directly
  return {
    // ...
    define: {
      global: 'window',
      // Remove: 'process.env': env
    },
  }
})
```
Also update `firebase.ts` and `nearConfig.ts` to use `import.meta.env.VITE_*` instead of `process.env.VITE_*`.

**References:** CWE-526, OWASP A05:2021 – Security Misconfiguration

---

### F-03 — JWT Access Token Stored in `localStorage` — **High**

**Description:** The JWT access token (`accessToken`) is stored in `localStorage` upon login (`src/views/login.vue:152`) and read by the Axios interceptor (`src/plugins/axios.ts:38`) and router guard (`src/router/router.ts:286`). `localStorage` is accessible to any JavaScript running on the same origin, making the token trivially stealable by any XSS vulnerability (including F-01 above).

**Evidence:**
```typescript
// src/views/login.vue:151-157
localStorage.setItem('idUser', response.data.result.id);
localStorage.setItem('accessToken', response.data.result.accessToken);
localStorage.setItem('userRole', response.data.result.role);
localStorage.setItem('userImage', response.data.result.image)
localStorage.setItem('statusSuscription', response.data.result.subscription.status)

// src/plugins/axios.ts:38
const token = localStorage.getItem('accessToken');
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}
```

**Impact:** Combined with F-01 (XSS via `v-html`), an attacker can steal the JWT with a single line of JavaScript, gaining full API access as the victim. The token has no additional binding (e.g., no fingerprint, no IP check visible client-side).

**Likelihood:** Medium. Requires an XSS vector to exploit, but F-01 provides that vector.

**Recommended Fix:** Use HttpOnly, Secure, SameSite=Strict cookies for the JWT. The backend must set the cookie on login and the frontend should rely on the cookie being sent automatically. As a defense-in-depth measure, consider token fingerprinting or short-lived access tokens with silent refresh.

**References:** CWE-922, OWASP A04:2021 – Insecure Design

---

### F-04 — Hardcoded Encryption Secret in Shipped Bundle — **High**

**Description:** `src/plugins/vueSecureStorage.ts:7` contains the literal string `'your-secret-key'` as the encryption secret for `vue3-storage-secure`. This value is a placeholder and is compiled into the production JavaScript bundle. Anyone who inspects the bundled source can decrypt any "securely" stored data.

**Evidence:**
```typescript
// src/plugins/vueSecureStorage.ts:6-8
app.use(VueSecureStorage, {
  storage: 'local',
  secret: 'your-secret-key', // Replace with your secret key
});
```

**Impact:** The `vue3-storage-secure` plugin provides no real security. Any data encrypted with this key is trivially decryptable. This creates a false sense of security.

**Likelihood:** Certain — the key is shipped in the bundle and visible to anyone.

**Recommended Fix:** Remove `vue3-storage-secure` if it provides no real protection. If client-side encryption is needed, derive the key from a user-provided password/PIN at runtime, or move sensitive data handling entirely to the server side. Never hardcode secrets.

**References:** CWE-798, CWE-547

---

### F-05 — Production `console.log` Leaks Payment and PII Data — **High**

**Description:** Extensive `console.log` and `console.error` statements throughout the codebase log sensitive data including: Stripe payment method IDs, card change events, user context with subscription status and billing cycle, full API error responses, processed student data, and Stripe initialization state. These will appear in production browser consoles.

**Evidence:**
```typescript
// src/views/register.vue:522
console.log('Payment method created:', paymentMethod.id);

// src/views/payment-renewal.vue:846-852
console.log('User context:', {
  billingCycle: planBillingCycle.value,
  planId: planId.value,
  status: statusSubscription.value,
  isTrial: isTrialUser.value,
  isActive: isSubscriptionActive.value
});

// src/components/StripePaymentForm.vue:89
console.log('Card change event in child:', event);

// src/views/edit-teacher.vue:272
console.error("Error details:", error.response?.data);
```

**Impact:** Payment method IDs could be used in Stripe API calls if combined with a compromised secret key. User subscription data leaks business logic. Error response data may expose API internals, database errors, or stack traces.

**Likelihood:** Certain — all logs are unconditional (no environment-based gating).

**Recommended Fix:** Wrap all logs in a conditional or use a logging utility:
```typescript
// Create src/utils/logger.ts
const isDev = import.meta.env.DEV;
export const logger = {
  log: (...args: any[]) => { if (isDev) console.log(...args); },
  error: (...args: any[]) => { if (isDev) console.error(...args); },
};
```
Replace all `console.log`/`console.error` calls with `logger.log`/`logger.error`. Never log payment method IDs, tokens, or full API responses even in development.

**References:** CWE-532, OWASP A09:2021 – Security Logging and Monitoring Failures

---

### F-06 — No Content-Security-Policy (CSP) Configured — **High**

**Description:** Neither `index.html` (both root and `public/index.html`) nor `nginx.conf` include a `Content-Security-Policy` header or `<meta>` tag. This means there is no restriction on script sources, inline scripts, or eval. Any XSS vulnerability (such as F-01) has unrestricted execution capability.

**Evidence:**
```html
<!-- index.html:1-9 — no CSP meta tag -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" href="/favicon.ico" />
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css" rel="stylesheet">
  ...
</head>
```
```
# nginx.conf — no CSP header
server {
  listen 80;
  ...
}
```

**Impact:** Without CSP, F-01 becomes trivially exploitable with no browser-level mitigation. Data exfiltration, session hijacking, and credential theft are unconstrained.

**Likelihood:** Certain — CSP is absent. Exploitability depends on presence of XSS vectors (F-01 provides one).

**Recommended Fix:** Add CSP headers in nginx:
```nginx
# nginx.conf
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data: https:; connect-src 'self' https://*.stripe.com https://*.near.org; frame-src 'self' https://*.stripe.com; font-src 'self' https://cdn.jsdelivr.net;" always;
```
Also add SRI hashes to the CDN link (see F-08).

**References:** CWE-693, OWASP A05:2021 – Security Misconfiguration

---

### F-07 — Client-Side Only Authorization — **Medium**

**Description:** Route guards (`src/router/router.ts:286–320`) and UI visibility controls (`src/components/drawer.vue:62–64`, `src/components/navbar.vue:186–188`) derive the user's role from `localStorage.getItem('userRole')`. A user can open DevTools, change the value to `'ADMIN'`, refresh the page, and the frontend will render all admin-only routes and UI elements. While the backend should enforce actual authorization, the frontend-only checks give a false sense of security and expose administrative UI structure.

**Evidence:**
```typescript
// src/router/router.ts:286-287
const token = localStorage.getItem('accessToken')
const userRole = localStorage.getItem('userRole')

// src/components/drawer.vue:62-64
const isAdmin = localStorage.getItem('userRole') === 'ADMIN';
const isTeacher = localStorage.getItem('userRole') === 'TEACHER';
const isOwner = localStorage.getItem('userRole') === 'OWNER';
```

**Impact:** An attacker who obtains a valid token for a low-privilege role can modify `localStorage` to explore admin-only UI, discover API endpoints, and potentially find backend authorization gaps. It also leaks the existence of admin functionality.

**Likelihood:** Medium. Requires a valid token first, but after that, role escalation in the UI is trivial.

**Recommended Fix:** Decode the role from the JWT payload (already available at `src/router/router.ts:302`) rather than trusting `localStorage`. The router guard already decodes the JWT for expiry — extend it to extract the role:
```typescript
// In router guard:
const payload = JSON.parse(atob(token.split('.')[1]));
const userRole = payload.role; // from JWT, not localStorage
```
This prevents `localStorage` tampering from bypassing client-side checks. However, the backend MUST remain the authoritative enforcer.

**References:** CWE-863, OWASP A01:2021 – Broken Access Control

---

### F-08 — External CDN Without Subresource Integrity (SRI) — **Medium**

**Description:** `index.html:6` loads the Material Design Icons stylesheet from `cdn.jsdelivr.net` without an `integrity` attribute. If the CDN is compromised or the file is modified, malicious CSS could be injected (e.g., CSS keylogging, content exfiltration via `background-url`).

**Evidence:**
```html
<!-- index.html:6 -->
<link href="https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css" rel="stylesheet">
```

**Impact:** Supply-chain compromise of jsDelivr or the mdi package could inject malicious CSS. CSS-based attacks can exfiltrate input values (e.g., passwords, credit card numbers) via attribute selectors and background-image URLs.

**Likelihood:** Low, but the fix is trivial and defense-in-depth.

**Recommended Fix:** Add SRI hash:
```html
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css"
      rel="stylesheet"
      integrity="sha384-..." 
      crossorigin="anonymous">
```
Or bundle the icon font locally as a dependency.

**References:** CWE-829, OWASP A06:2021 – Vulnerable and Outdated Components

---

### F-09 — NEAR Wallet Private Keys in Browser Local Storage — **Medium**

**Description:** `src/services/nearConfig.ts:17,25` configures NEAR wallet with `keyStores.BrowserLocalStorageKeyStore()`. This means NEAR blockchain private keys are persisted in `localStorage`, making them stealable via any XSS vulnerability.

**Evidence:**
```typescript
// src/services/nearConfig.ts:17
testnet: {
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  // ...
},
mainnet: {
  // ...
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
},
```

**Impact:** Combined with F-01 (XSS), an attacker can steal NEAR private keys and drain user wallets. Even without XSS, physical access or malware could extract keys.

**Likelihood:** Medium (depends on XSS presence; F-01 provides a vector). This is a known trade-off in dApp design but should be documented as a risk.

**Recommended Fix:** This is the standard NEAR wallet pattern. Consider implementing a session-based key approach or educating users about the risk. At minimum, ensure CSP is in place and XSS vectors are eliminated.

**References:** CWE-922, OWASP A04:2021 – Insecure Design

---

### F-10 — Error Response Details Leaked via `console.error` — **Medium**

**Description:** 43 `console.error` statements across 25 files log full API error response objects, including `error.response?.data`. This may expose server-side error details, stack traces, database errors, or internal API structure to the browser console.

**Evidence:**
```typescript
// src/views/home.vue:305
console.error('Failed to load user data:', error.response?.data || error.message);

// src/views/edit-teacher.vue:272
console.error("Error details:", error.response?.data); // Para debug

// src/views/payment-renewal.vue:546
console.error('Error canceling subscription:', error);
```

**Impact:** Information disclosure — error messages may reveal API paths, validation rules, database schema hints, or server framework details useful for further attacks.

**Likelihood:** Medium. All errors are unconditional (no environment gating).

**Recommended Fix:** Apply the same logging utility described in F-05. In production, log only generic error messages. Never log `error.response?.data` directly.

**References:** CWE-209, OWASP A09:2021

---

### F-11 — PII/Subscription Data Persisted in `localStorage` — **Medium**

**Description:** Beyond the JWT token, 11+ additional keys are stored in `localStorage` on login: `idUser`, `userRole`, `userImage`, `statusSuscription`, `campusId`, `billingCycle`, `planId`, `campusIdForAdmin`, and various schedule selection state (`idCenter`, `centerName`, `idClass`, `className`, etc.). This data persists indefinitely until explicitly cleared.

**Evidence:**
```typescript
// src/views/login.vue:151-158
localStorage.setItem('idUser', response.data.result.id);
localStorage.setItem('accessToken', response.data.result.accessToken);
localStorage.setItem('userRole', response.data.result.role);
localStorage.setItem('userImage', response.data.result.image)
localStorage.setItem('statusSuscription', response.data.result.subscription.status)
localStorage.setItem('campusId', response.data.result.campus.id)
localStorage.setItem('billingCycle', response.data.result.subscription?.plan?.billingCycle)
localStorage.setItem('planId', response.data.result.subscription?.plan?.id)
```

**Impact:** Any XSS vulnerability exposes the user's identity, role, subscription status, billing cycle, and campus affiliation. This data can be used for targeted phishing or sold.

**Likelihood:** Medium (depends on XSS presence).

**Recommended Fix:** Minimize `localStorage` usage to only the essential session token. Fetch user profile data from the API on mount and store it in Vue reactive state (memory only). This reduces the attack surface.

**References:** CWE-922

---

### F-12 — Logout Does Not Invalidate Server-Side Token — **Low**

**Description:** The logout function in `src/components/drawer.vue:71–81` only removes items from `localStorage` and redirects to `/`. No API call is made to invalidate the JWT on the server. The token remains valid until it expires.

**Evidence:**
```typescript
// src/components/drawer.vue:71-81
const logOut = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('idUser');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userImage');
  localStorage.removeItem('statusSuscription');
  localStorage.removeItem('campusId');
  localStorage.removeItem('billingCycle');
  localStorage.removeItem('planId');
  localStorage.removeItem('campusIdForAdmin');
  window.location.href = '/';
};
```

**Impact:** If the token is stolen before logout, the attacker retains access until token expiry regardless of the user logging out.

**Likelihood:** Low. Requires token theft before logout.

**Recommended Fix:** Call a `/auth/logout` endpoint to blacklist the token server-side:
```typescript
const logOut = async () => {
  try {
    await axiosInstance.post('/auth/logout');
  } finally {
    localStorage.clear(); // Clear all keys at once
    window.location.href = '/';
  }
};
```

**References:** CWE-613, OWASP A04:2021

---

### F-13 — Inconsistent `localStorage` Cleanup Across Code Paths — **Low**

**Description:** The router guard on token expiry (`src/router/router.ts:304–306`) only removes 3 keys (`accessToken`, `userRole`, `statusSuscription`), while the full logout function removes 9+ keys. This means expired-token redirects leave stale data (e.g., `campusId`, `billingCycle`, `planId`) in `localStorage` that could confuse the next login session.

**Evidence:**
```typescript
// src/router/router.ts:304-306 — only 3 keys cleared
localStorage.removeItem('accessToken')
localStorage.removeItem('userRole')
localStorage.removeItem('statusSuscription')
```

**Impact:** Stale data could cause the next user (on a shared device) to see previous user's campus or subscription state briefly. Low impact but indicates inconsistent state management.

**Likelihood:** Low.

**Recommended Fix:** Use `localStorage.clear()` or a centralized `clearAuthState()` utility function called from all logout/expiry paths.

**References:** CWE-459

---

## 4. Passed Checks

| Check | Result | Details |
|-------|--------|---------|
| `eval()` / `new Function()` usage | ✅ **PASS** | No instances found in any `.vue`, `.ts`, or `.js` file |
| `postMessage` handlers | ✅ **PASS** | No `postMessage` or `addEventListener('message')` found |
| `target="_blank"` without `rel="noopener noreferrer"` | ✅ **PASS** | No `target="_blank"` attributes found |
| `<iframe>` usage | ✅ **PASS** | No iframes found in source |
| Dynamic `:is` component with user data | ✅ **PASS** | No dynamic component directives found |
| `http://` endpoints (mixed content) | ✅ **PASS** | No `http://` URLs found — all API calls use relative paths |
| Production source maps | ✅ **PASS** | `vite.config.ts:47` sets `sourcemap: false` |
| `.env` files committed to repo | ✅ **PASS** | No `.env` files found in repository |
| Password sent in URL/query string | ✅ **PASS** | Passwords sent only in POST body |
| Debug flags in production config | ✅ **PASS** | No debug flags found in Vite config |
| Prototype pollution via deep merge | ✅ **PASS** | No deep merge or `JSON.parse` of untrusted data (only JWT parsing in router guard) |
| File upload type/size validation | ⚠️ **UNVERIFIED** | Image upload fields exist (`fileInputStudent`, `fileInputMother`, `fileInputFather`) but validation logic was not fully traced; needs manual check |
| `vue3-storage-secure` encryption | ⚠️ **N/A — Rendered Ineffective** | See F-04 |
| Firebase auth rules | ⚠️ **UNVERIFIED** | Firebase config loaded but actual Firestore security rules must be checked server-side |

---

## 5. Prioritized Remediation Plan

Ordered by risk-to-effort ratio (highest impact, lowest effort first):

| Priority | Finding | Effort | Rationale |
|----------|---------|--------|-----------|
| **1** | **F-01** — Replace `v-html` with text interpolation or add DOMPurify | 🟢 Low | 6-line change across 5 files; eliminates the primary XSS vector |
| **2** | **F-05** — Gate all `console.log`/`console.error` behind dev-mode check | 🟢 Low | Add a logger utility and find-replace; prevents data leaks |
| **3** | **F-02** — Fix Vite `define` to filter only `VITE_*` env vars | 🟢 Low | 1-line change in `vite.config.ts`; prevents secret leakage |
| **4** | **F-06** — Add CSP header in nginx config | 🟢 Low | ~10 lines in `nginx.conf`; defense-in-depth against XSS |
| **5** | **F-04** — Remove or fix hardcoded encryption secret | 🟢 Low | Remove `vue3-storage-secure` or use env-based secret |
| **6** | **F-08** — Add SRI to CDN stylesheet link | 🟢 Low | Add `integrity` attribute to one `<link>` tag |
| **7** | **F-07** — Extract role from JWT payload instead of `localStorage` | 🟡 Medium | Modify router guard and drawer/navbar; breaks localStorage tampering |
| **8** | **F-10** — Sanitize error logging | 🟡 Medium | Touch 25 files; use centralized error handler |
| **9** | **F-03** — Move JWT to HttpOnly cookies | 🔴 High | Requires backend changes; highest security gain but coordinated effort |
| **10** | **F-11** — Minimize localStorage data | 🟡 Medium | Refactor to fetch profile data from API; reduces blast radius |
| **11** | **F-12** — Add server-side token invalidation on logout | 🟡 Medium | Requires backend endpoint; improves session security |
| **12** | **F-13** — Centralize localStorage cleanup | 🟢 Low | Create utility function; prevents stale data bugs |
| **13** | **F-09** — Document NEAR key storage risk | 🟢 Low | Add comment in code; no code change needed |

---

## 6. Dependency Notes

- **`dotenv`** (v16.4.5) — Listed as a runtime dependency; should be dev-only or removed since Vite handles env vars natively.
- **`firebase`** (v10.13.2) — Current as of audit date; no known critical CVEs.
- **`vue3-storage-secure`** (v0.1.1) — Niche package; 0 known CVEs but see F-04. Consider removing.
- **`@types/web3`** — Listed in devDependencies but no web3 usage detected; may be leftover.
- No abandoned, typosquat, or suspicious packages identified.
- **UNVERIFIED** — Full `yarn.lock` audit not performed (lockfile not read). Recommend running `yarn audit` for known vulnerability scanning.

---

*End of Report*
