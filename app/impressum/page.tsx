import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { COMPANY } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum und Anbieterkennzeichnung der mpinger GmbH gemäß § 5 DDG.",
  alternates: { canonical: "/impressum" },
  // Statutory pages carry no marketing value in search results
  robots: { index: false, follow: true },
};

export default function Impressum() {
  return (
    <LegalPage
      title="Impressum"
      subtitle="Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz) — Legal notice under German law."
      updated="Juli 2026"
    >
      <section>
        <h2>Anbieter / Provider</h2>
        <p>
          <strong>{COMPANY.legalName}</strong>
          <br />
          {COMPANY.address.street}
          <br />
          {COMPANY.address.postalCode} {COMPANY.address.city}
          <br />
          Deutschland
        </p>
      </section>

      <section>
        <h2>Vertreten durch / Represented by</h2>
        <p>Geschäftsführer: {COMPANY.managingDirector}</p>
      </section>

      <section>
        <h2>Kontakt / Contact</h2>
        <p>
          Telefon:{" "}
          <a href={`tel:${COMPANY.phoneDE.replace(/[^+\d]/g, "")}`}>
            {COMPANY.phoneDE}
          </a>
          <br />
          E-Mail: <a href={`mailto:${COMPANY.emailDE}`}>{COMPANY.emailDE}</a>
        </p>
      </section>

      <section>
        <h2>Umsatzsteuer-Identifikationsnummer / VAT ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
          <br />
          <strong>{COMPANY.vatId}</strong>
        </p>
      </section>

      <section>
        <h2>Registereintrag / Commercial register</h2>
        <p>
          Registergericht: {COMPANY.registerCourt}
          <br />
          Registernummer: {COMPANY.registerNumber}
        </p>
      </section>

      <section>
        <h2>Streitschlichtung / Dispute resolution</h2>
        <p>
          Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen. Unser Angebot
          richtet sich ausschließlich an Unternehmer im Sinne des § 14 BGB.
        </p>
        <p>
          We are neither willing nor obliged to participate in dispute
          resolution proceedings before a consumer arbitration board. Our offering
          is directed exclusively at business customers.
        </p>
      </section>

      <section>
        <h2>Haftung für Inhalte / Liability for content</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte
          auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
          §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet,
          übermittelte oder gespeicherte fremde Informationen zu überwachen oder
          nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
          hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
          Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
          von entsprechenden Rechtsverletzungen werden wir diese Inhalte
          umgehend entfernen.
        </p>
      </section>

      <section>
        <h2>Haftung für Links / Liability for links</h2>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
          Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir
          derartige Links umgehend entfernen.
        </p>
      </section>

      <section>
        <h2>Urheberrecht / Copyright</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers.
        </p>
      </section>
    </LegalPage>
  );
}
