import type { MetadataRoute } from "next";

/**
 * Served at /manifest.webmanifest. Gives the site a proper identity when a
 * visitor adds it to a phone home screen, and satisfies the PWA-basics checks
 * in Lighthouse without turning the site into an installable app.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mpinger Engineering — Precision CNC Manufacturing",
    short_name: "Mpinger",
    description:
      "ISO 9001:2015 certified manufacturer of high-precision 5-axis CNC-milled and turned components.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    // Square marks, not the wide wordmark — a 264x95 logo is letterboxed into
    // an unreadable sliver on a home screen.
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
