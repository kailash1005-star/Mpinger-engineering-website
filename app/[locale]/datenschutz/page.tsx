import type { Metadata } from "next";
import ConsentSettingsButton from "@/components/ConsentSettingsButton";
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
 * This policy describes what THIS site actually does. Two things leave the
 * visitor's browser: the contact form goes to Web3Forms for email delivery,
 * and — only after an explicit opt-in — Microsoft Clarity and Google Analytics
 * receive usage analytics.
 *
 * Keep this file in step with the code. If components/CookieConsent.tsx,
 * lib/clarity.ts or lib/gtag.ts changes what is collected, section 3 below
 * stops being true, and an inaccurate Datenschutzerklärung is itself the
 * finding.
 */
export default function Datenschutz() {
  return (
    <LegalPage
      title="Datenschutz"
      subtitle="Datenschutzerklärung gemäß Art. 13 DSGVO — Privacy notice under the GDPR."
      updated="August 2026"
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
        <h2>3. Webanalyse / Analytics</h2>
        <p>
          <strong>
            Ohne Ihre ausdrückliche Einwilligung setzt diese Website keine
            Cookies zu Analysezwecken und überträgt keine Nutzungsdaten an
            Dritte.
          </strong>{" "}
          Beim ersten Besuch werden Sie über ein Banner gefragt. Erst wenn Sie
          dort zustimmen, werden Microsoft Clarity und Google Analytics geladen.
          Lehnen Sie ab oder treffen Sie keine Auswahl, unterbleibt jede
          Analyse; die Website ist uneingeschränkt nutzbar. Beide Dienste werden
          gemeinsam über dieselbe Einwilligung gesteuert.
        </p>

        <h3 className="mt-6">3.1 Microsoft Clarity</h3>
        <p>
          Microsoft Clarity ist ein Webanalysedienst der Microsoft Ireland
          Operations Limited, One Microsoft Place, South County Business Park,
          Leopardstown, Dublin 18, Irland. Mit Ihrer Einwilligung erfasst
          Clarity, wie diese Website genutzt wird — insbesondere Seitenaufrufe,
          Klick- und Scrollverhalten, Mausbewegungen, Bildschirmgröße,
          Browser- und Gerätetyp, ungefährer Standort auf Basis der IP-Adresse
          sowie eine pseudonymisierte Aufzeichnung des Sitzungsverlaufs
          (Session Replay). Daraus werden Heatmaps und aggregierte Auswertungen
          erstellt.
        </p>
        <p>
          <strong>Eingaben in das Kontaktformular</strong> — Name, E-Mail-Adresse,
          Firma und Ihre Projektbeschreibung — werden bereits im Browser
          maskiert und sind in den Aufzeichnungen nicht lesbar. Erfasst wird
          lediglich, <em>dass</em> eine Anfrage abgesendet wurde und welche
          Projektart ausgewählt war.
        </p>
        <p>
          Zu diesem Zweck werden Cookies auf Ihrem Endgerät gespeichert und
          ausgelesen, unter anderem <code>_clck</code> und <code>_clsk</code>.
          Werbebezogene Speicherung ist deaktiviert: Wir übermitteln an Clarity
          ausdrücklich <code>ad_Storage: denied</code>, sodass keine Daten für
          Werbezwecke verarbeitet werden. Es findet keine Profilbildung zu
          Werbezwecken und keine automatisierte Entscheidungsfindung statt.
        </p>
        <h3 className="mt-6">3.2 Google Analytics 4</h3>
        <p>
          Google Analytics 4 ist ein Webanalysedienst der Google Ireland
          Limited, Gordon House, Barrow Street, Dublin 4, Irland. Mit Ihrer
          Einwilligung erfasst Google Analytics unter anderem aufgerufene
          Seiten, Verweildauer, Herkunft des Zugriffs (Referrer), Browser- und
          Gerätetyp sowie einen groben, aus der IP-Adresse abgeleiteten
          Standort. Die IP-Adresse wird von Google Analytics 4 grundsätzlich
          gekürzt und nicht dauerhaft gespeichert. Zusätzlich melden wir das
          Ereignis <code>generate_lead</code>, wenn eine Anfrage über das
          Kontaktformular abgesendet wurde — übermittelt wird dabei
          ausschließlich die gewählte Projektart, keine Ihrer Eingaben.
        </p>
        <p>
          Dabei werden Cookies gesetzt, insbesondere <code>_ga</code> und{" "}
          <code>_ga_&lt;ID&gt;</code>. Wir betreiben Google Analytics im
          Consent Mode und übermitteln dauerhaft{" "}
          <code>ad_storage: denied</code>, <code>ad_user_data: denied</code> und{" "}
          <code>ad_personalization: denied</code>. Es findet daher keine
          Verarbeitung zu Werbezwecken, keine Verknüpfung mit Google Ads und
          keine geräteübergreifende Profilbildung statt. Google Signals ist
          nicht aktiviert.
        </p>

        <h3 className="mt-6">3.3 Gemeinsame Regelungen / Common provisions</h3>
        <p>
          <strong>Rechtsgrundlage</strong> für das Speichern und Auslesen von
          Informationen auf Ihrem Endgerät ist § 25 Abs. 1 TDDDG, für die
          anschließende Verarbeitung Art. 6 Abs. 1 lit. a DSGVO — jeweils Ihre
          Einwilligung.
        </p>
        <p>
          <strong>Drittlandübermittlung:</strong> Eine Übermittlung an die
          Microsoft Corporation in die USA kann nicht ausgeschlossen werden.
          Microsoft ist unter dem EU-US Data Privacy Framework zertifiziert; für
          die Verarbeitung gelten ergänzend die Standardvertragsklauseln der
          EU-Kommission. Entsprechendes gilt für Google: Vertragspartner ist die
          Google Ireland Limited, eine Übermittlung an die Google LLC in die USA
          ist jedoch nicht ausgeschlossen. Auch Google ist unter dem EU-US Data
          Privacy Framework zertifiziert.
        </p>
        <p>
          <strong>Widerruf:</strong> Sie können Ihre Einwilligung jederzeit mit
          Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der bis zum
          Widerruf erfolgten Verarbeitung bleibt unberührt.
        </p>
        <ConsentSettingsButton />
        <p>
          Ihre Entscheidung wird ausschließlich lokal in Ihrem Browser
          (localStorage) gespeichert, damit wir Sie nicht bei jedem Seitenaufruf
          erneut fragen müssen. Bei einem Widerruf löschen wir die von den
          Diensten gesetzten Cookies unmittelbar aus Ihrem Browser. Weitere
          Informationen finden Sie in der{" "}
          <a
            href="https://privacy.microsoft.com/de-de/privacystatement"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzerklärung von Microsoft
          </a>{" "}
          sowie in der{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzerklärung von Google
          </a>
          .
        </p>
        <p>
          This website loads Microsoft Clarity and Google Analytics only after
          you opt in via the consent banner. Clarity records pseudonymised
          session replays and heatmaps; contact-form inputs are masked in the
          browser and never reach Microsoft. Advertising storage is explicitly
          denied for both services. You can withdraw your consent at any time
          using the button above, which also deletes the cookies they set.
        </p>
      </section>

      <section>
        <h2>4. Externe Dienste und Schriftarten / Third-party services</h2>
        <p>
           Sämtliche Inhalte dieser Website — einschließlich Schriftarten, Bilder
           und Videos — werden ausschließlich von unserem eigenen Server
           ausgeliefert. Es werden keine Inhalte von Drittanbietern (etwa Google
           Fonts, CDNs, eingebettete Karten oder Videoplattformen) nachgeladen.
           Verbindungen zu Dritten entstehen nur in zwei Fällen: bei der
           Übermittlung des Kontaktformulars an Web3Forms, sobald Sie eine
           Anfrage absenden, und beim Laden von Microsoft Clarity sowie Google
           Analytics, sofern Sie zuvor eingewilligt haben (siehe Ziffer 3).
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
