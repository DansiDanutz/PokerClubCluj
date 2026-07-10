import MemoriuDocument from "./document";
import SignatureForm from "./signature-form";
import "./memoriu.css";

export const metadata = {
  title: "Memoriu — Exceptarea cluburilor de poker | Consultare publică Cluj-Napoca",
  description:
    "Memoriu depus in consultarea publica (1-15 iulie 2026) privind proiectul de interzicere a jocurilor de noroc in Cluj-Napoca: jocurile intre participanti (loto si cluburile de poker) trebuie tratate distinct de sloturi si cazinouri. Semneaza si tu.",
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
          <p>
            Memoriul va fi depus oficial la Primăria Municipiului Cluj-Napoca
            împreună cu lista semnatarilor.
          </p>
        </div>
      </div>
    </main>
  );
}
