import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** Served at /robots.txt. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Build output and Next internals carry no indexable content
        disallow: ["/_next/static/chunks/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
