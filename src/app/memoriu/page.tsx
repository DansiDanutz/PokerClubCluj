import MemoriuDocument from "./document";
import MemoriuSummary, { MemoriuShield } from "./summary";
import SignatureForm from "./signature-form";
import "./memoriu.css";

const PAGE_URL = "https://poker-club-cluj.vercel.app/memoriu";

export const metadata = {
  title: "Memoriu — Exceptarea cluburilor de poker | Consultare publică Cluj-Napoca",
  description:
    "Memoriu depus in consultarea publica (1-15 iulie 2026) privind proiectul de interzicere a jocurilor de noroc in Cluj-Napoca: jocurile intre participanti (loto si cluburile de poker) trebuie tratate distinct de sloturi si cazinouri. Semneaza si tu.",
  openGraph: {
    title: "Semnează memoriul: pokerul nu e păcănele",
    description:
      "Consultare publică Cluj-Napoca, 1-15 iulie 2026. Jocurile dintre participanti (loto si cluburile de poker) trebuie tratate distinct de sloturi si cazinouri. Semneaza memoriul catre Consiliul Local.",
    url: PAGE_URL,
    type: "website",
    locale: "ro_RO",
  },
};

export default function MemoriuPage() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <div className="container topbar__inner">
          <a href="/" className="brand">
            <span className="brand__mark">♠</span>
            <span>Poker Cluj</span>
          </a>
          <nav className="topnav" aria-label="Navigare memoriu">
            <a href="/">← Înapoi la propunere</a>
            <a
              href="/memoriu-poker-cluj-iulie-2026.pdf"
              className="topnav-highlight"
            >
              Descarcă PDF
            </a>
          </nav>
        </div>
      </header>

      <div className="memoriu-wrap">
        <div className="memoriu-deadline">
          <div className="memoriu-deadline__label">
            Termen limită: 15 iulie 2026
          </div>
          <p>
            Consultarea publică asupra proiectului de interzicere a jocurilor de
            noroc în Cluj-Napoca este deschisă doar până pe 15 iulie. Semnează
            mai jos pentru ca vocea ta să fie anexată memoriului.
          </p>
        </div>

        <div className="memoriu-panel memoriu-dark" style={{ marginBottom: "36px" }}>
          <MemoriuSummary />
          <MemoriuShield />
        </div>

        <div id="semneaza" className="memoriu-sign">
          <SignatureForm />
        </div>

        <div className="memoriu-panel memoriu-dark">
          <MemoriuDocument />
        </div>

        <div className="memoriu-cta">
          <a href="#semneaza" className="button button--primary">
            Semnează memoriul
          </a>
          <div className="memoriu-share">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(PAGE_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              📢 Distribuie pe Facebook
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                "Semnează memoriul pentru Player's Poker Club Cluj: " + PAGE_URL
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Trimite pe WhatsApp
            </a>
            <a
              href="https://www.facebook.com/PlayersPokerCluj/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ♠ Pagina clubului
            </a>
          </div>
          <p>
            Memoriul va fi depus oficial la Primăria Municipiului Cluj-Napoca
            împreună cu lista semnatarilor.
          </p>
        </div>
      </div>
    </main>
  );
}
