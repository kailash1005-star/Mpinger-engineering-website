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
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mpinger-engineering.com"
).replace(/\/$/, "");

/**
 * Statutory company identity, taken from the published Impressum at
 * mpinger.de/impressum. Single source for the legal pages and JSON-LD.
 *
 * NOTE — registerCourt / registerNumber are NOT on the current published
 * Impressum. § 5 Abs. 1 Nr. 4 DDG requires the register and registration
 * number for a GmbH, and a single missing field is enough to ground an
 * Abmahnung. The placeholders below must be filled from the HRB extract
 * before this site goes live.
 */
export const COMPANY = {
  legalName: "mpinger GmbH",
  tradingName: "Mpinger Engineering",
  managingDirector: "Ramkumar Palanisamy",
  vatId: "DE290407187",
  registerCourt: "Amtsgericht Hannover",
  registerNumber: "HRB — [TO BE CONFIRMED]",
  address: {
    street: "Gustav-Schenk-Weg 53",
    postalCode: "30455",
    city: "Hannover",
    country: "DE",
  },
  phoneDE: "+49 (0) 511 10554580",
  emailDE: "info@mpinger.de",
  phoneIN: "+91 755 001 5799",
  emailIN: "sales@mpinger-engineering.com",
  linkedIn: "https://www.linkedin.com/company/mpinger/",
} as const;

const GERMANY = {
  "@type": "Place",
  name: "mpinger GmbH — Headquarters",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gustav-Schenk-Weg 53",
    addressLocality: "Hannover",
    postalCode: "30455",
    addressCountry: "DE",
  },
  telephone: "+49 511 790 900 96",
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
  legalName: "mpinger GmbH",
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
      email: "info@mpinger.de",
      telephone: "+49 511 790 900 96",
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
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certification",
    name: "ISO 9001:2015",
  },
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
