/**
 * Cookie removal for consent withdrawal.
 *
 * Deleting a third-party analytics cookie is fiddlier than it looks. A cookie
 * is identified by name *plus* domain and path, and the delete only lands if
 * all three match what was written. Google Analytics writes `_ga` on the
 * registrable domain (".example.com") so it is shared across subdomains, while
 * Clarity writes on the exact host — so a single well-formed attempt cannot
 * clear both. We therefore expire each name against every plausible
 * domain/path pair. Overshooting is free; a missed cookie means an identifier
 * survives a withdrawal.
 */

/** ".example.com" from "www.example.com" — good enough for our own hosts. */
function candidateDomains(): (string | null)[] {
  const host = window.location.hostname;
  const domains: (string | null)[] = [null, host, `.${host}`];

  const parts = host.split(".");
  for (let i = 1; i < parts.length - 1; i += 1) {
    domains.push(`.${parts.slice(i).join(".")}`);
  }
  return domains;
}

export function deleteCookiesByPrefix(prefixes: string[]): void {
  if (typeof document === "undefined") return;

  const names = document.cookie
    .split(";")
    .map((entry) => entry.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name) && prefixes.some((p) => name.startsWith(p)));

  for (const name of names) {
    for (const domain of candidateDomains()) {
      const domainPart = domain ? `; domain=${domain}` : "";
      document.cookie = `${name}=; Max-Age=0; path=/${domainPart}`;
    }
  }
}
