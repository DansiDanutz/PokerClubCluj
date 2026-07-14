"use client";

import { useEffect, useState } from "react";

type RecentSigner = { name: string; city: string; date: string; comment?: string };
type Message = {
  id: string;
  name: string;
  city: string;
  date: string;
  comment: string;
  likes: number;
};
type Stats = { count: number; recent: RecentSigner[]; messages: Message[] };

const LIKED_KEY = "pokercluj_liked_ids";
const SIGNED_KEY = "pokercluj_signed";
const PAGE_URL = "https://poker-club-cluj.vercel.app/memoriu";
const FB_SHARE = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(PAGE_URL)}`;

export default function SignatureForm() {
  const [stats, setStats] = useState<Stats>({ count: 0, recent: [], messages: [] });
  const [showAllMessages, setShowAllMessages] = useState(false);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [hasSigned, setHasSigned] = useState(false);
  const [likeGate, setLikeGate] = useState(false);
  // Mesajele aprobate sunt vizibile implicit; aici retinem doar randurile restranse.
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});
  const [allCollapsed, setAllCollapsed] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<
    { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; message: string }
  >({ kind: "idle" });

  const loadStats = () =>
    fetch("/api/petition")
      .then((r) => r.json())
      .then((s: Stats) => {
        setStats({
          count: s.count ?? 0,
          recent: s.recent ?? [],
          messages: s.messages ?? [],
        });
        const base: Record<string, number> = {};
        (s.messages ?? []).forEach((m) => (base[m.id] = m.likes ?? 0));
        setLikes(base);
      })
      .catch(() => undefined);

  useEffect(() => {
    loadStats();
    try {
      const stored = JSON.parse(localStorage.getItem(LIKED_KEY) ?? "[]");
      if (Array.isArray(stored)) {
        setLiked(Object.fromEntries(stored.map((id: string) => [id, true])));
      }
    } catch {
      /* ignore */
    }
    if (localStorage.getItem(SIGNED_KEY) === "1") setHasSigned(true);
  }, []);

  const like = async (id: string) => {
    if (liked[id]) return;
    // Poti aprecia poveștile doar dupa ce ai semnat memoriul.
    if (!hasSigned) {
      setLikeGate(true);
      document.getElementById("semneaza")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setLiked((l) => ({ ...l, [id]: true }));
    setLikes((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    try {
      const stored = JSON.parse(localStorage.getItem(LIKED_KEY) ?? "[]");
      const next = Array.isArray(stored) ? [...new Set([...stored, id])] : [id];
      localStorage.setItem(LIKED_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    try {
      const res = await fetch("/api/petition/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok && typeof data.likes === "number") {
        setLikes((prev) => ({ ...prev, [id]: data.likes }));
      }
    } catch {
      /* keep optimistic value */
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/petition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, city, comment, website }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ kind: "error", message: data.error ?? "A aparut o eroare." });
        return;
      }
      setStatus({ kind: "done" });
      setHasSigned(true);
      setLikeGate(false);
      try {
        localStorage.setItem(SIGNED_KEY, "1");
      } catch {
        /* ignore */
      }
      setFullName("");
      setEmail("");
      setCity("");
      setComment("");
      loadStats();
    } catch {
      setStatus({ kind: "error", message: "A aparut o eroare de retea. Incercati din nou." });
    }
  };

  return (
    <div className="sig-card">
      <div className="sig-counter">
        <div className="sig-counter__value">
          {stats.count.toLocaleString("ro-RO")}
        </div>
        <div className="sig-counter__label">
          {stats.count === 1 ? "persoana a semnat" : "persoane au semnat"} acest
          memoriu
        </div>
      </div>

      {status.kind === "done" ? (
        <div className="sig-success">
          <div className="sig-success__title">Mulțumim pentru susținere! ♠</div>
          <p>
            Semnătura ta a fost înregistrată și va însoți memoriul depus la
            Primăria Cluj-Napoca. Acum poți aprecia poveștile celorlalți.
          </p>
          <p className="sig-success__share-hint">
            📣 Distribuie povestea ta pe Facebook și adună Like-uri — cele mai
            apreciate experiențe rămân în top, sub ochii Consiliului Local.
          </p>
          <a
            className="sig-share-btn"
            href={FB_SHARE}
            target="_blank"
            rel="noopener noreferrer"
          >
            📘 Distribuie pe Facebook
          </a>
        </div>
      ) : (
        <form onSubmit={submit} className="sig-form">
          <div className="sig-form__row">
            <input
              type="text"
              required
              minLength={3}
              maxLength={120}
              placeholder="Nume si prenume *"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="sig-input"
            />
            <input
              type="email"
              required
              maxLength={254}
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="sig-input"
            />
          </div>
          <input
            type="text"
            maxLength={80}
            placeholder="Localitate (optional)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="sig-input"
          />
          <div className="sig-prompt">
            <div className="sig-prompt__title">
              💬 Spune-ți povestea (optional, dar contează mult)
            </div>
            <div className="sig-prompt__hint">
              Câteva idei: cum te-a învățat pokerul să iei decizii sub presiune ·
              să-ți gestionezi banii și răbdarea · să citești oamenii · să pierzi
              elegant și să-ți păstrezi echilibrul. O experiență reală, în
              cuvintele tale.
            </div>
            <div className="sig-prompt__prize">
              ♥ Poveștile voastre sunt apreciate de comunitate. Cele mai
              apreciate (după numărul de Like-uri) rămân în top, ca membrii
              Consiliului Local să citească cele mai frumoase experiențe.
            </div>
          </div>
          <textarea
            maxLength={2000}
            rows={4}
            placeholder="Ex: Pokerul m-a învățat că..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="sig-input sig-input--area"
          />
          {/* Honeypot anti-spam: ascuns pentru utilizatorii reali */}
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="sig-honeypot"
            name="website"
          />
          {status.kind === "error" && (
            <div className="sig-error">{status.message}</div>
          )}
          <button
            type="submit"
            disabled={status.kind === "sending"}
            className="button button--primary sig-submit"
          >
            {status.kind === "sending" ? "Se trimite..." : "Semnez memoriul"}
          </button>
          <p className="sig-consent">
            Prin semnare va exprimati acordul ca numele si adresa de email sa
            fie incluse in lista de sustinatori anexata memoriului depus la
            Primaria Municipiului Cluj-Napoca. Emailul nu este afisat public si
            nu este folosit in alte scopuri. Mesajul pentru Consiliul Local
            (daca il completati) apare public pe aceasta pagina, alaturi de
            prenume si initiala numelui. Mesajele nepotrivite pot fi eliminate.
            Adresa IP este inregistrata exclusiv pentru prevenirea abuzurilor.
          </p>
        </form>
      )}

      {stats.messages.length > 0 && (
        <div className="sig-messages">
          <div className="sig-messages__title">
            Mesaje de la susținători ({stats.messages.length})
          </div>
          <div className="sig-messages__sub">
            {hasSigned
              ? "♥ Apreciază poveștile care îți plac."
              : "♥ Semnează memoriul ca să poți aprecia poveștile."}
          </div>
          {likeGate && !hasSigned && (
            <div className="sig-gate">
              Ca să apreciezi o poveste, semnează întâi memoriul (formularul de
              mai sus). Durează un minut.
            </div>
          )}
          <div className="sig-messages__list">
            {(showAllMessages ? stats.messages : stats.messages.slice(0, 6)).map(
              (m) => (
                <figure key={m.id} className="sig-msg">
                  <blockquote>„{m.comment}"</blockquote>
                  <figcaption>
                    <span className="sig-msg__who">
                      <span className="sig-msg__name">{m.name}</span>
                      {m.city ? (
                        <span className="sig-msg__city"> · {m.city}</span>
                      ) : null}
                    </span>
                    <button
                      type="button"
                      className={`sig-like${liked[m.id] ? " sig-like--on" : ""}`}
                      onClick={() => like(m.id)}
                      disabled={liked[m.id]}
                      aria-label="Apreciază acest mesaj"
                    >
                      <span className="sig-like__heart">
                        {liked[m.id] ? "♥" : "♡"}
                      </span>
                      <span className="sig-like__n">{likes[m.id] ?? 0}</span>
                    </button>
                  </figcaption>
                </figure>
              )
            )}
          </div>
          {stats.messages.length > 6 && (
            <button
              type="button"
              className="sig-messages__more"
              onClick={() => setShowAllMessages((v) => !v)}
            >
              {showAllMessages
                ? "Arată mai puține"
                : `Arată toate mesajele (${stats.messages.length})`}
            </button>
          )}
        </div>
      )}

      {stats.recent.length > 0 && (
        <div className="sig-recent">
          <div className="sig-recent__head">
            <div className="sig-recent__title">Au semnat recent</div>
            {stats.recent.some((s) => s.comment) && (
              <button
                type="button"
                className="sig-toggle-all"
                onClick={() => {
                  const next = !allCollapsed;
                  setAllCollapsed(next);
                  setCollapsed(
                    next
                      ? Object.fromEntries(stats.recent.map((_, i) => [i, true]))
                      : {}
                  );
                }}
              >
                {allCollapsed ? "▸ Arată mesajele" : "▾ Ascunde mesajele"}
              </button>
            )}
          </div>
          <div className="sig-recent__rows">
            {stats.recent.map((s, i) => {
              const hasComment = !!s.comment;
              // Vizibil implicit; se ascunde doar daca a fost restrans.
              const isOpen = hasComment && !collapsed[i];
              return (
                <div key={i} className="sig-row">
                  <button
                    type="button"
                    className="sig-row__head"
                    onClick={() =>
                      hasComment &&
                      setCollapsed((c) => ({ ...c, [i]: !c[i] }))
                    }
                    disabled={!hasComment}
                    aria-expanded={isOpen}
                  >
                    <span className="sig-chip__icon">✍</span>
                    <span className="sig-row__name">{s.name}</span>
                    {s.city ? (
                      <span className="sig-chip__city">· {s.city}</span>
                    ) : null}
                    <span className="sig-row__date">{s.date}</span>
                    {hasComment && (
                      <span className="sig-row__caret">
                        {isOpen ? "▾" : "▸"}
                      </span>
                    )}
                  </button>
                  {isOpen && (
                    <div className="sig-row__comment">„{s.comment}"</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
