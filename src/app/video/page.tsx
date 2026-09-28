import { PLAYERS_EVENTS, type PlayersEvent } from "./events";
import "./video.css";

const PAGE_URL = "https://poker-club-cluj.vercel.app/video";

export const metadata = {
  title: "Video & Evenimente — Players Poker Club Cluj-Napoca",
  description:
    "Cronologia video a Players Poker Club: promo-uri, turnee si momente din comunitatea de poker din Cluj-Napoca. Pokerul nu e pacanele — este un sport al mintii.",
  openGraph: {
    title: "Video & Evenimente — Players Poker Club",
    description:
      "Cronologia video a Players Poker Club din Cluj-Napoca: promo-uri, turnee si momente din comunitate.",
    url: PAGE_URL,
    siteName: "Player's Poker Club",
    type: "website",
    locale: "ro_RO",
    images: [
      {
        url: "/manifest-poster.jpg",
        width: 1920,
        height: 1080,
        alt: "Player's Poker Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Video & Evenimente — Players Poker Club",
    description:
      "Cronologia video a Players Poker Club din Cluj-Napoca: promo-uri, turnee si momente din comunitate.",
    images: ["/manifest-poster.jpg"],
  },
};

function sortedEvents(): PlayersEvent[] {
  return [...PLAYERS_EVENTS].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export default function VideoPage() {
  const events = sortedEvents();
  const withVideo = events.filter((e) => e.video).length;

  return (
    <main className="site-shell">
      <header className="topbar">
        <div className="container topbar__inner">
          <a href="/" className="brand">
            <span className="brand__mark">♠</span>
            <span>Poker Cluj</span>
          </a>
          <nav className="topnav" aria-label="Navigare video">
            <a href="/">← Înapoi la propunere</a>
            <a href="/memoriu">Memoriu</a>
          </nav>
        </div>
      </header>

      <section className="video-hero">
        <div className="container video-hero__inner">
          <span className="eyebrow">Players Poker Club • Cluj-Napoca</span>
          <h1>Video &amp; Evenimente</h1>
          <p className="video-hero__lead">
            Cronologia momentelor din club — promo-uri, turnee și acțiuni din
            comunitate. Fiecare eveniment cu videoul lui, în ordine, de la cel
            mai recent la primul.
          </p>
          <div className="video-hero__stats">
            <div className="video-stat">
              <strong>{events.length}</strong>
              <span>evenimente</span>
            </div>
            <div className="video-stat">
              <strong>{withVideo}</strong>
              <span>{withVideo === 1 ? "video" : "videoclipuri"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="video-section">
        <div className="container">
          {events.length === 0 ? (
            <p className="video-empty">În curând adăugăm primele evenimente.</p>
          ) : (
            <ol className="timeline" aria-label="Cronologie evenimente Players">
              {events.map((event) => (
                <li key={event.id} id={event.id} className="timeline__item">
                  <div className="timeline__marker" aria-hidden="true">
                    <span className="timeline__dot" />
                  </div>
                  <article className="timeline__card">
                    <div className="timeline__meta">
                      <time className="timeline__date" dateTime={event.date}>
                        {event.dateLabel}
                      </time>
                      <span className="timeline__chip">{event.category}</span>
                      {event.featured && (
                        <span className="timeline__chip timeline__chip--featured">
                          ★ Nou
                        </span>
                      )}
                    </div>
                    <h2 className="timeline__title">{event.title}</h2>
                    <p className="timeline__desc">{event.description}</p>
                    {event.video && (
                      <video
                        className="timeline__video"
                        controls
                        preload="metadata"
                        playsInline
                        poster={event.video.poster}
                      >
                        <source src={event.video.src} type="video/mp4" />
                        Browserul tău nu poate reda acest video.
                      </video>
                    )}
                  </article>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <footer className="video-foot">
        <div className="container">
          <p>
            Ai un eveniment sau un clip de adăugat în cronologie? Trimite-ne
            materialul și îl includem aici.
          </p>
          <div className="video-foot__links">
            <a href="/" className="button button--ghost">
              Pagina principală
            </a>
            <a href="/memoriu" className="button button--primary">
              Memoriul Players
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
