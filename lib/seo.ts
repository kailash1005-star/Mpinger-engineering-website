/**
 * Canonical site identity + structured data.
 *
 * Kept in one module so the sitemap, robots rules, metadata and JSON-LD can
 * never disagree about the site's own URL — a mismatch there is the usual cause
 * of duplicate-content and canonical warnings in Search Console.
 *
 * Set NEXT_PUBLIC_SITE_URL in the host's environment at deploy time. The
 * fallback is the production domain, so a missing variable degrades to correct
 * output rather than to "localhost" leaking into published tags.
 *
 * The www host is deliberate: the apex 301-redirects to www, so www is where
 * pages are actually served. Naming the apex here pointed every canonical,
 * og:url and sitemap entry at a redirect instead of at the final URL, which is
 * the one thing a canonical exists to state.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mpinger-engineering.com"
).replace(/\/$/, "");

/**
 * Statutory company identity, as supplied by the client for
 * mpinger Engineering GmbH. Single source for the legal pages and JSON-LD.
 *
 * NOTE — the register entry is the one the client supplied (Amtsgericht
 * Hannover, HRB226035). If the company re-registers at the court for Feucht
 * (Amtsgericht Nürnberg), that court issues a new HRB number; update both
 * fields together, never the court alone.
 */
export const COMPANY = {
  legalName: "mpinger Engineering GmbH",
  tradingName: "Mpinger Engineering",
  managingDirector: "Ramkumar Palanisamy, Sudha Ramkumar",
  vatId: "DE363167199",
  registerCourt: "Amtsgericht Hannover",
  registerNumber: "HRB226035",
  address: {
    street: "Industriestraße 85B",
    postalCode: "90537",
    city: "Feucht",
    country: "DE",
  },
  phoneDE: "+49 9128 4009947",
  emailDE: "info@mpinger-engineering.com",
  phoneIN: "+91 755 001 5799",
  emailIN: "sales@mpinger-engineering.com",
  linkedIn: "https://www.linkedin.com/company/mpinger/",
} as const;

const GERMANY = {
  "@type": "Place",
  name: "mpinger Engineering GmbH — Headquarters",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Industriestraße 85B",
    addressLocality: "Feucht",
    postalCode: "90537",
    addressCountry: "DE",
  },
  telephone: "+49 9128 4009947",
};

const INDIA = {
  "@type": "Place",
  name: "Mpinger Engineering — Manufacturing Plant",
  address: {
    "@type": "PostalAddress",
    streetAddress: "SF. No. 89, Chinnavedampatti",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    postalCode: "641049",
    addressCountry: "IN",
  },
  telephone: "+91 755 001 5799",
};

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Mpinger Engineering",
  legalName: "mpinger Engineering GmbH",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/posters/hero.webp`,
  description:
    "ISO 9001:2015 certified manufacturer of high-precision 5-axis CNC-milled and turned components, with German coordination and Indian manufacturing strength.",
  address: [GERMANY.address, INDIA.address],
  location: [GERMANY, INDIA],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "info@mpinger-engineering.com",
      telephone: "+49 9128 4009947",
      areaServed: "EU",
      availableLanguage: ["en", "de"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "sales@mpinger-engineering.com",
      telephone: "+91 755 001 5799",
      areaServed: "IN",
      availableLanguage: ["en", "ta"],
    },
  ],
  taxID: "33AANCM8803H1ZB",
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "ISO 9001:2015",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "AS9100",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "EN 15085-2 Classification Level CL2",
    },
  ],
  knowsAbout: [
    "5-axis CNC milling",
    "CNC turning and mill-turn machining",
    "Aerospace component manufacturing",
    "Coordinate-measuring machine inspection",
    "Precision contract manufacturing",
  ],
};

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Mpinger Engineering",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
};

/** On-page anchors — surfaced to Google as sitelink candidates. */
export const SITE_SECTIONS = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "parts", label: "Parts" },
  { id: "machines", label: "Machines" },
  { id: "quality", label: "Quality" },
  { id: "global", label: "Global" },
  { id: "contact", label: "Contact" },
];
