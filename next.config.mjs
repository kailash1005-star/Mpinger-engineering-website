/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const isDev = process.env.NODE_ENV === "development";

/**
 * Security headers. The site loads no third-party fonts or frames, and its
 * only cross-origin traffic is the contact form POST plus consented analytics,
 * so the CSP can stay close to strict rather than permissive.
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
// The contact form posts here via fetch(). It must be listed in connect-src or
// the browser blocks the request before it leaves the page — connect-src has no
// implicit allowance for "the endpoint this app obviously needs".
const FORM_ENDPOINT_ORIGIN = "https://api.web3forms.com";

// Microsoft Clarity spreads itself across three directives, and the snippet
// Microsoft hands out only reveals the first of them:
//   script-src — the snippet loads www.clarity.ms/tag/<id>, but that file is a
//     bootstrapper which then pulls the real library from scripts.clarity.ms.
//     Allowing only the host in the snippet loads half of Clarity and no more.
//   img-src    — c.clarity.ms/c.gif is a pixel beacon, not an XHR, so
//     connect-src does not cover it.
//   connect-src — regional collectors (u./c./e./…clarity.ms) receive the
//     payload. Hence the wildcard: the subdomain varies by version and region.
//
// c.bing.com is deliberately absent. Clarity attempts an advertising identity
// sync there (a c.gif carrying CtsSyncId/MUID), which is cross-site ad
// tracking rather than site analytics. We tell Clarity `ad_Storage: denied`
// and tell visitors the same in the Datenschutzerklärung, so the CSP enforces
// what we promised instead of relying on the vendor to honour it. Blocking it
// costs nothing measurable: session capture, heatmaps and events all run over
// clarity.ms. The trade is one console warning per page load, in exchange for
// the privacy claim being true. Add "https://c.bing.com" to both img-src and
// connect-src to allow it.
//
// These entries only make the requests *possible*; whether they happen at all
// is decided by the consent banner, which does not render the tag until the
// visitor opts in.
const CLARITY_SCRIPT_ORIGINS = "https://*.clarity.ms";
const CLARITY_IMG_ORIGINS = "https://*.clarity.ms";
const CLARITY_CONNECT_ORIGINS = "https://*.clarity.ms";

// Google Analytics 4. Like Clarity it touches three directives:
//   script-src  — gtag.js is served from googletagmanager.com.
//   connect-src — hits go to google-analytics.com, and GA4 routes EU traffic
//     through regional endpoints (region1.google-analytics.com and siblings),
//     which is why this needs the wildcard rather than the bare host.
//   img-src     — GA still falls back to a pixel when sendBeacon/fetch is
//     unavailable, so a strict img-src otherwise drops those hits silently.
//
// google.com / google.<tld> are deliberately absent: those are the ad
// remarketing and conversion-linker destinations. We send ad_storage,
// ad_user_data and ad_personalization as denied, and the CSP enforces that
// rather than trusting the tag to respect it.
const GA_SCRIPT_ORIGINS = "https://www.googletagmanager.com";
const GA_IMG_ORIGINS = "https://*.google-analytics.com https://www.googletagmanager.com";
const GA_CONNECT_ORIGINS = "https://*.google-analytics.com https://www.googletagmanager.com";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${CLARITY_SCRIPT_ORIGINS} ${GA_SCRIPT_ORIGINS}${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${CLARITY_IMG_ORIGINS} ${GA_IMG_ORIGINS}`,
  "media-src 'self' blob:",
  "font-src 'self'",
  `connect-src 'self' ${FORM_ENDPOINT_ORIGIN} ${CLARITY_CONNECT_ORIGINS} ${GA_CONNECT_ORIGINS}${isDev ? " ws: wss:" : ""}`,
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

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
