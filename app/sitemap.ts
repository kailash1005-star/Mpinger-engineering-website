import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Served at /sitemap.xml. This is a single-page site, so the sitemap carries
 * the one canonical URL — anchor fragments are deliberately excluded, since
 * Google treats them as the same document and listing them adds noise.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
