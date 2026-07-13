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

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  const deleteRow = async (id: string, name: string) => {
    if (!confirm(`Ștergi semnătura „${name}"? Acțiunea nu poate fi anulată.`))
      return;
    setDeletingId(id);
    try {
      const res = await fetch("/api/petition/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, id }),
      });
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

      <div className="admin-count">{filtered.length} rezultate afișate</div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Nume</th>
              <th>Email</th>
              <th>Oraș</th>
              <th>IP</th>
              <th>Dispozitiv / browser</th>
              <th>Mesaj</th>
              <th>♥</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const repeat = r.ip ? (ipCounts.get(r.ip) ?? 0) : 0;
              return (
                <tr key={r.id} className={repeat > 1 ? "admin-row--repeat" : ""}>
                  <td className="admin-nowrap">
                    {new Date(r.created_at).toLocaleString("ro-RO")}
                  </td>
                  <td className="admin-strong">{r.full_name}</td>
                  <td>{r.email}</td>
                  <td>{r.city ?? "—"}</td>
                  <td className="admin-mono">
                    {r.ip ?? "—"}
                    {repeat > 1 && <span className="admin-flag">×{repeat}</span>}
                  </td>
                  <td className="admin-ua" title={r.user_agent ?? ""}>
                    {r.user_agent ?? "—"}
                    {r.lang ? <div className="admin-lang">{r.lang}</div> : null}
                  </td>
                  <td className="admin-comment">{r.comment ?? "—"}</td>
                  <td className="admin-likes">{r.likes > 0 ? `♥ ${r.likes}` : "—"}</td>
                  <td>
                    <button
                      type="button"
                      className="admin-del"
                      onClick={() => deleteRow(r.id, r.full_name)}
                      disabled={deletingId === r.id}
                      title="Șterge semnătura"
                    >
                      {deletingId === r.id ? "..." : "🗑 Șterge"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="admin-note">
        Rândurile roșii vin de la un IP care apare de mai multe ori — util pentru
        a depista aceeași persoană care semnează repetat cu nume diferite.
        Ștergerea unei semnături o elimină definitiv, inclusiv de pe pagina
        publică. Aceste date sunt private.
      </p>
    </main>
  );
}
