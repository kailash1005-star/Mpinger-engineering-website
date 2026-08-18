"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/**
 * Locale switcher for the four supported languages.
 *
 * Lives in the locale layout rather than in SiteHeader, because the statutory
 * pages (Impressum, Datenschutz) deliberately render without the header — a
 * switcher inside it would vanish on exactly the pages a regulator reads.
 *
 * `usePathname` here is next-intl's, not Next's: it returns the path *without*
 * the locale segment, so pairing it with `locale` on <Link> re-renders the same
 * page in the target language. The previous implementation hardcoded href="/",
 * which silently sent anyone switching language from a subpage back to the
 * homepage and lost their place.
 */
export default function LanguageSwitcher() {
  const pathname = usePathname();
  const active = useLocale();
  const t = useTranslations("a11y");

  return (
    <nav
      aria-label={t("switchLanguage")}
      // top-16 clears the fixed SiteHeader (~60px). At top-4 the pill sat on
      // top of the header's status text and mobile menu button.
      className="fixed right-4 top-16 z-50 flex items-center gap-2 rounded-md border border-slate-300 bg-white/90 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#0b4e86] shadow-lg backdrop-blur-md"
    >
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          hrefLang={locale}
          aria-current={locale === active ? "true" : undefined}
          className={
            locale === active
              ? "text-[#1d6fb5]"
              : "text-slate-500 transition-colors hover:text-[#1d6fb5]"
          }
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
