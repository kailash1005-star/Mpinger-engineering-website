import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Served at /sitemap.xml. This is a single-page site, so the sitemap carries
 * the one canonical URL — anchor fragments are deliberately excluded, since
 * Google treats them as the same document and listing them adds noise.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Statutory pages: listed so crawlers can reach them, but low priority —
    // they carry no search value and are noindex'd at the page level.
    {
      url: `${SITE_URL}/impressum`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.1,
    },
    {
      url: `${SITE_URL}/datenschutz`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];
}
