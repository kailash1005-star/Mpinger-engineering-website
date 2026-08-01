import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, ORGANIZATION_JSON_LD, WEBSITE_JSON_LD } from "@/lib/seo";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Self-hosted at build time — no third-party request, no render-blocking
// stylesheet, and `display: swap` keeps text visible while they load.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const TITLE = "Mpinger Engineering — Precision CNC Manufacturing";
const DESCRIPTION =
  "ISO 9001:2015 certified manufacturer of high-precision 5-axis CNC-milled and turned components. German coordination from Hannover, precision manufacturing in Coimbatore.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Mpinger Engineering",
  },
  description: DESCRIPTION,
  applicationName: "Mpinger Engineering",
  authors: [{ name: "Mpinger Engineering" }],
  generator: "Next.js",
  keywords: [
    "CNC machining",
    "5-axis milling",
    "precision engineering",
    "aerospace components",
    "turned components",
    "ISO 9001:2015",
    "contract manufacturing",
    "Coimbatore CNC",
    "German engineering India",
    "impeller hub machining",
    "turbocharger housing",
    "CMM inspection",
  ],
  category: "Manufacturing",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Mpinger Engineering",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: "/posters/hero.webp",
        width: 1280,
        height: 720,
        alt: "Mpinger Engineering — 5-axis CNC precision manufacturing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/posters/hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Icons are intentionally not declared here. Next derives them from
  // app/favicon.ico, app/icon.png and app/apple-icon.png, and an explicit
  // `icons` entry would override that convention and drop the PNG variants.
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  // Pinch-zoom must stay available — capping it fails WCAG 1.4.4
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured data — lets Google render an entity panel for the
            company rather than a plain blue link. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSON_LD),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(WEBSITE_JSON_LD),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
