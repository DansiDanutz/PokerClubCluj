"use client";

import { useMemo, useState } from "react";
import "./admin.css";

type Row = {
  id: string;
  full_name: string;
  email: string;
  city: string | null;
  comment: string | null;
  created_at: string;
  ip: string | null;
  user_agent: string | null;
  lang: string | null;
  comment_approved: boolean;
  likes: number;
};

type Filter = "all" | "messages" | "repeats";

// Rezuma user-agent-ul intr-o eticheta scurta (OS + browser).
function shortDevice(ua: string | null): { icon: string; text: string } {
  if (!ua) return { icon: "❔", text: "necunoscut" };
  const isFB = /FBAN|FBAV|FB_IAB|FB4A/.test(ua);
  const isIG = /Instagram/.test(ua);
  let os = "";
  if (/Windows/.test(ua)) os = "Windows";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone/.test(ua)) os = "iPhone";
  else if (/iPad/.test(ua)) os = "iPad";
  else if (/Mac OS X|Macintosh/.test(ua)) os = "Mac";
  else if (/Linux/.test(ua)) os = "Linux";
  else os = "Alt";
  let br = "";
  if (isIG) br = "Instagram";
  else if (isFB) br = "Facebook";
  else if (/Edg\//.test(ua)) br = "Edge";
  else if (/OPR\/|Opera/.test(ua)) br = "Opera";
  else if (/CriOS|Chrome\//.test(ua)) br = "Chrome";
  else if (/Firefox/.test(ua)) br = "Firefox";
  else if (/Safari/.test(ua)) br = "Safari";
  const mobile = /Android|iPhone|iPad|Mobile/.test(ua);
  return {
    icon: mobile ? "📱" : "💻",
    text: [os, br].filter(Boolean).join(" · "),
  };
}

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) =>
    setOpenRows((o) => ({ ...o, [id]: !o[id] }));

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/petition/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Eroare.");
        return;
      }
      setRows(data.rows ?? []);
    } catch {
      setError("Eroare de retea.");
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/petition/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) setRows(data.rows ?? []);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setRows(null);
    setPassword("");
    setQuery("");
    setFilter("all");
  };

  const exportCsv = () => {
    const cols = ["Nr.", "Nume", "Email", "Localitate", "Data", "Mesaj", "Like-uri"];
    const esc = (v: string | number | null) =>
      `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [cols.map(esc).join(",")];
    filtered.forEach((r, i) => {
      lines.push(
        [
          i + 1,
          r.full_name,
          r.email,
          r.city ?? "",
          new Date(r.created_at).toLocaleString("ro-RO"),
          r.comment ?? "",
          r.likes ?? 0,
        ]
          .map(esc)
          .join(",")
      );
    });
    // BOM ca Excel sa afiseze corect diacriticele.
    const blob = new Blob(["﻿" + lines.join("\r\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const d = new Date();
    const stamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    a.href = url;
    a.download = `semnaturi-poker-cluj-${stamp}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sessionExpired = () => {
    alert("Sesiune expirată — te rog autentifică-te din nou.");
    logout();
  };

  const toggleVisible = async (id: string, makeVisible: boolean) => {
    try {
      const res = await fetch("/api/petition/admin/hide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, id, visible: makeVisible }),
      });
      if (res.status === 401) return sessionExpired();
      if (!res.ok) {
        alert("Operațiunea a eșuat.");
        return;
      }
      setRows((prev) =>
        prev
          ? prev.map((r) =>
              r.id === id ? { ...r, comment_approved: makeVisible } : r
            )
          : prev
      );
    } catch {
      alert("Eroare de rețea.");
    }
  };

  const deleteRow = async (id: string, name: string) => {
    if (
      !confirm(
        `Ștergi semnătura „${name}"? Se elimină definitiv și IP-ul se blochează.`
      )
    )
      return;
    setDeletingId(id);
    try {
      const res = await fetch("/api/petition/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, id }),
      });
      if (res.status === 401) return sessionExpired();
      if (!res.ok) {
        alert("Ștergerea a eșuat.");
        return;
      }
      setRows((prev) => (prev ? prev.filter((r) => r.id !== id) : prev));
    } catch {
      alert("Eroare de rețea.");
    } finally {
      setDeletingId(null);
    }
  };

  // Numara cate semnaturi vin de la fiecare IP, ca sa evidentiem abuzatorii.
  const ipCounts = useMemo(() => {
    const m = new Map<string, number>();
    (rows ?? []).forEach((r) => {
      if (r.ip) m.set(r.ip, (m.get(r.ip) ?? 0) + 1);
    });
    return m;
  }, [rows]);

  const withMessage = useMemo(
    () => (rows ?? []).filter((r) => r.comment && r.comment.trim()).length,
    [rows]
  );
  const totalLikes = useMemo(
    () => (rows ?? []).reduce((s, r) => s + (r.likes ?? 0), 0),
    [rows]
  );

  const filtered = useMemo(() => {
    if (!rows) return [];
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter === "messages" && !(r.comment && r.comment.trim())) return false;
      if (filter === "repeats" && !(r.ip && (ipCounts.get(r.ip) ?? 0) > 1))
        return false;
      if (!q) return true;
      return [r.full_name, r.email, r.ip, r.city, r.comment]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    });
  }, [rows, query, filter, ipCounts]);

  if (!rows) {
    return (
      <main className="admin-shell">
        <form className="admin-login" onSubmit={login}>
          <div className="admin-login__brand">
            <span className="admin-login__spade">♠</span> Poker Cluj
          </div>
          <h1>Panou semnături — acces privat</h1>
          <input
            type="email"
            placeholder="Email administrator"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="admin-input"
            autoComplete="username"
            autoFocus
          />
          <input
            type="password"
            placeholder="Parolă administrator"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-input"
            autoComplete="current-password"
          />
          {error && <div className="admin-error">{error}</div>}
          <button type="submit" className="admin-btn" disabled={loading}>
            {loading ? "Se verifică..." : "Intră"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-shell admin-shell--wide">
      <div className="admin-topbar">
        <div className="admin-brand">
          <span className="admin-login__spade">♠</span> Panou semnături
        </div>
        <div className="admin-topbar__actions">
          <button className="admin-export" onClick={exportCsv}>
            ⬇ Export CSV
          </button>
          <button className="admin-ghost" onClick={refresh} disabled={loading}>
            {loading ? "..." : "↻ Reîncarcă"}
          </button>
          <button className="admin-ghost" onClick={logout}>
            Ieși
          </button>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat__v">{rows.length}</div>
          <div className="admin-stat__k">Semnături</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__v">{withMessage}</div>
          <div className="admin-stat__k">Cu mesaj</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__v">{ipCounts.size}</div>
          <div className="admin-stat__k">IP-uri unice</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__v">{totalLikes}</div>
          <div className="admin-stat__k">Like-uri</div>
        </div>
      </div>

      <div className="admin-controls">
        <input
          type="text"
          placeholder="Caută nume, email, IP, oraș, mesaj..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="admin-input admin-search"
        />
        <div className="admin-filters">
          {(
            [
              ["all", "Toate"],
              ["messages", "Doar cu mesaj"],
              ["repeats", "IP repetat"],
            ] as [Filter, string][]
          ).map(([k, label]) => (
            <button
              key={k}
              className={`admin-chip${filter === k ? " admin-chip--on" : ""}`}
              onClick={() => setFilter(k)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-controls admin-controls--sub">
        <div className="admin-count">{filtered.length} rezultate afișate</div>
        <div className="admin-filters">
          <button
            className="admin-chip"
            onClick={() =>
              setOpenRows(
                Object.fromEntries(filtered.map((r) => [r.id, true]))
              )
            }
          >
            ▾ Extinde tot
          </button>
          <button className="admin-chip" onClick={() => setOpenRows({})}>
            ▸ Restrânge tot
          </button>
        </div>
      </div>

      <div className="admin-list">
        {filtered.map((r) => {
          const repeat = r.ip ? (ipCounts.get(r.ip) ?? 0) : 0;
          const open = !!openRows[r.id];
          const dev = shortDevice(r.user_agent);
          const msg = r.comment?.trim() ?? "";
          return (
            <div
              key={r.id}
              className={`admin-card${repeat > 1 ? " admin-card--repeat" : ""}`}
            >
              <button
                type="button"
                className="admin-card__head"
                onClick={() => toggleRow(r.id)}
                aria-expanded={open}
              >
                <span className="admin-card__caret">{open ? "▾" : "▸"}</span>
                <span className="admin-card__name">{r.full_name}</span>
                <span className="admin-card__email">{r.email}</span>
                <span className="admin-card__dev">
                  {dev.icon} {dev.text}
                </span>
                {r.likes > 0 && (
                  <span className="admin-card__likes">♥ {r.likes}</span>
                )}
                {msg && (
                  <span className="admin-card__hasmsg">
                    {r.comment_approved ? "💬" : "🙈"}
                  </span>
                )}
                {repeat > 1 && (
                  <span className="admin-flag">IP ×{repeat}</span>
                )}
                <span className="admin-card__date">
                  {new Date(r.created_at).toLocaleString("ro-RO", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </button>

              {msg && !open && (
                <div className="admin-card__preview">
                  „{msg.length > 120 ? msg.slice(0, 120) + "…" : msg}"
                </div>
              )}

              {open && (
                <div className="admin-card__detail">
                  {msg && (
                    <div className="admin-field admin-field--msg">
                      <div className="admin-field__k">Mesaj</div>
                      <div className="admin-field__v">„{msg}"</div>
                    </div>
                  )}
                  <div className="admin-detail-grid">
                    <div className="admin-field">
                      <div className="admin-field__k">Oraș</div>
                      <div className="admin-field__v">{r.city ?? "—"}</div>
                    </div>
                    <div className="admin-field">
                      <div className="admin-field__k">Data completă</div>
                      <div className="admin-field__v">
                        {new Date(r.created_at).toLocaleString("ro-RO")}
                      </div>
                    </div>
                    <div className="admin-field">
                      <div className="admin-field__k">IP</div>
                      <div className="admin-field__v admin-mono">
                        {r.ip ?? "—"}
                        {repeat > 1 && (
                          <span className="admin-flag">×{repeat}</span>
                        )}
                      </div>
                    </div>
                    <div className="admin-field">
                      <div className="admin-field__k">Limbă</div>
                      <div className="admin-field__v admin-mono">
                        {r.lang ?? "—"}
                      </div>
                    </div>
                    <div className="admin-field admin-field--wide">
                      <div className="admin-field__k">Browser complet</div>
                      <div className="admin-field__v admin-ua-full">
                        {r.user_agent ?? "—"}
                      </div>
                    </div>
                  </div>
                  <div className="admin-actions">
                    {msg && (
                      <button
                        type="button"
                        className="admin-hide"
                        onClick={() =>
                          toggleVisible(r.id, !r.comment_approved)
                        }
                      >
                        {r.comment_approved
                          ? "🙈 Ascunde mesajul"
                          : "👁 Arată mesajul"}
                      </button>
                    )}
                    <button
                      type="button"
                      className="admin-del"
                      onClick={() => deleteRow(r.id, r.full_name)}
                      disabled={deletingId === r.id}
                    >
                      {deletingId === r.id ? "..." : "🗑 Șterge + blochează"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="admin-note">
        Apasă pe un rând ca să vezi detaliile. <b>🙈 Ascunde mesajul</b> îl
        scoate de pe pagina publică fără să anunțe pe nimeni (semnătura rămâne).
        <b> 🗑 Șterge + blochează</b> elimină semnătura definitiv și blochează
        IP-ul — orice postare viitoare de pe acel IP va fi ascunsă automat, în
        tăcere. Rândurile roșii = IP care apare de mai multe ori. Datele sunt
        private.
      </p>
    </main>
  );
}
