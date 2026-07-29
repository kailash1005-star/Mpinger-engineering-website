/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development";

/**
 * Security headers. The site loads no third-party scripts, fonts, frames or
 * XHR endpoints, so the CSP can be genuinely strict rather than permissive.
 *
 * 'unsafe-inline' on script-src is required because Next.js inlines its
 * hydration bootstrap; a nonce-based policy needs middleware and per-request
 * rendering, which would cost this fully-static site its CDN caching.
 *
 * The dev server needs three relaxations, without which the browser shows a
 * blank page while curl still reports 200 (curl does not enforce CSP):
 *   - 'unsafe-eval', because React Refresh and webpack HMR compile via eval()
 *   - ws: in connect-src, for the hot-reload socket
 *   - no upgrade-insecure-requests, which would rewrite http://localhost to
 *     https:// where nothing is listening
 * None of these ever reach production.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self' blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Clickjacking protection for browsers predating frame-ancestors
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // HSTS is production-only on purpose. Sent from localhost it pins the
  // browser to HTTPS for *all* of localhost for two years, breaking every
  // other local project until the pin is cleared by hand in
  // chrome://net-internals/#hsts.
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
];

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
