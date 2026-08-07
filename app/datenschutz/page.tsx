import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { COMPANY } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung der mpinger GmbH gemäß Art. 13 DSGVO.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: true },
};

/**
 * This policy describes what THIS site actually does, which is deliberately
 * little: no cookies are set and no analytics run. The contact form sends
 * submitted enquiry data to Web3Forms for email delivery.
 */
export default function Datenschutz() {
  return (
    <LegalPage
      title="Datenschutz"
      subtitle="Datenschutzerklärung gemäß Art. 13 DSGVO — Privacy notice under the GDPR."
      updated="Juli 2026"
    >
      <section>
        <h2>1. Verantwortlicher / Data controller</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          <br />
          <strong>{COMPANY.legalName}</strong>
          <br />
          {COMPANY.address.street}
          <br />
          {COMPANY.address.postalCode} {COMPANY.address.city}, Deutschland
          <br />
          Vertreten durch: {COMPANY.managingDirector}
          <br />
          E-Mail: <a href={`mailto:${COMPANY.emailDE}`}>{COMPANY.emailDE}</a>
          <br />
          Telefon:{" "}
          <a href={`tel:${COMPANY.phoneDE.replace(/[^+\d]/g, "")}`}>
            {COMPANY.phoneDE}
          </a>
        </p>
      </section>

      <section>
        <h2>2. Server-Logfiles / Server log files</h2>
        <p>
          Beim Aufruf dieser Website werden durch den Hosting-Provider
          automatisch Informationen in sogenannten Server-Logfiles gespeichert,
          die Ihr Browser übermittelt. Dies sind:
        </p>
        <ul>
          <li>IP-Adresse des zugreifenden Geräts</li>
          <li>Datum und Uhrzeit der Anfrage</li>
          <li>Name und URL der abgerufenen Datei</li>
          <li>Übertragene Datenmenge und Meldung über den Abrufstatus</li>
          <li>Referrer-URL, Browsertyp und Betriebssystem</li>
        </ul>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes
          Interesse liegt in der technisch fehlerfreien Bereitstellung und der
          Sicherheit unserer Website. Diese Daten werden nicht mit anderen
          Datenquellen zusammengeführt und nach spätestens 30 Tagen gelöscht.
        </p>
      </section>

      <section>
        <h2>3. Cookies und Tracking / Cookies and tracking</h2>
        <p>
          <strong>
            Diese Website setzt keine Cookies und verwendet keine Analyse-,
            Tracking- oder Werbe-Technologien.
          </strong>{" "}
          Es findet keine Profilbildung und keine automatisierte
          Entscheidungsfindung statt. Ein Cookie-Consent-Banner ist daher nicht
          erforderlich.
        </p>
        <p>
          This website sets no cookies and uses no analytics, tracking or
          advertising technologies. No profiling or automated decision-making
          takes place.
        </p>
      </section>

      <section>
        <h2>4. Externe Dienste und Schriftarten / Third-party services</h2>
        <p>
           Sämtliche Inhalte dieser Website — einschließlich Schriftarten, Bilder
           und Videos — werden ausschließlich von unserem eigenen Server
           ausgeliefert. Es werden keine Inhalte von Drittanbietern (etwa Google
           Fonts, CDNs, eingebettete Karten oder Videoplattformen) nachgeladen.
           Eine Ausnahme ist die Übermittlung des Kontaktformulars an Web3Forms,
           sobald Sie eine Anfrage absenden.
        </p>
      </section>

      <section>
        <h2>5. Kontaktaufnahme / Contacting us</h2>
        <p>
           Über das Kontaktformular können Sie uns Zeichnungen, Spezifikationen
           und sonstige Projektdaten senden. Die Angaben werden zur Bearbeitung
           Ihrer Anfrage und für den Fall von Anschlussfragen verarbeitet und
           über Web3Forms an uns übermittelt.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei
          vertragsbezogenen Anfragen, ansonsten Art. 6 Abs. 1 lit. f DSGVO.
        </p>
        <p>
           Web3Forms verarbeitet die Übermittlung als technischer Dienstleister.
           Der Dienst speichert Formulareinsendungen nach eigenen Angaben auf
           dem kostenlosen Tarif für bis zu 30 Tage. Die Löschung bei uns erfolgt,
           sobald Ihre Anfrage abschließend bearbeitet ist und keine gesetzlichen
           Aufbewahrungspflichten (insbesondere handels- und steuerrechtliche
           Fristen von 6 bis 10 Jahren) entgegenstehen.
        </p>
      </section>

      <section>
        <h2>6. Ihre Rechte / Your rights</h2>
        <p>Sie haben jederzeit das Recht auf:</p>
        <ul>
          <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        </ul>
        <p>
          Zur Ausübung dieser Rechte genügt eine formlose Nachricht an{" "}
          <a href={`mailto:${COMPANY.emailDE}`}>{COMPANY.emailDE}</a>.
        </p>
      </section>

      <section>
        <h2>7. Beschwerderecht / Right to complain</h2>
        <p>
          Ihnen steht ein Beschwerderecht bei der zuständigen
          Datenschutz-Aufsichtsbehörde zu. Zuständig ist die
          Landesbeauftragte für den Datenschutz Niedersachsen, Prinzenstraße 5,
          30159 Hannover.
        </p>
      </section>

      <section>
        <h2>8. SSL-/TLS-Verschlüsselung / Encryption</h2>
        <p>
          Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw.
          TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
          daran, dass die Adresszeile des Browsers von „http://“ auf „https://“
          wechselt.
        </p>
      </section>
    </LegalPage>
  );
}
