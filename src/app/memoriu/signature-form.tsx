"use client";

import { useEffect, useState } from "react";

type RecentSigner = { name: string; city: string; date: string };
type Stats = { count: number; recent: RecentSigner[] };

export default function SignatureForm() {
  const [stats, setStats] = useState<Stats>({ count: 0, recent: [] });
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
      .then((s: Stats) => setStats({ count: s.count ?? 0, recent: s.recent ?? [] }))
      .catch(() => undefined);

  useEffect(() => {
    loadStats();
  }, []);

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
          <div className="sig-success__title">Multumim pentru sustinere!</div>
          <p>
            Semnatura dumneavoastra a fost inregistrata si va insoti memoriul
            depus la Primaria Cluj-Napoca.
          </p>
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
          <textarea
            maxLength={500}
            rows={2}
            placeholder="Mesaj pentru Consiliul Local (optional)"
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
            nu este folosit in alte scopuri.
          </p>
        </form>
      )}

      {stats.recent.length > 0 && (
        <div className="sig-recent">
          <div className="sig-recent__title">Au semnat recent</div>
          <div className="sig-recent__list">
            {stats.recent.map((s, i) => (
              <span key={i} className="sig-chip">
                <span className="sig-chip__icon">✍</span>
                {s.name}
                {s.city ? <span className="sig-chip__city"> · {s.city}</span> : null}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
