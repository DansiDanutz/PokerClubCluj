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
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/petition/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
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

  // Numara cate semnaturi vin de la fiecare IP, ca sa evidentiem abuzatorii.
  const ipCounts = useMemo(() => {
    const m = new Map<string, number>();
    (rows ?? []).forEach((r) => {
      if (r.ip) m.set(r.ip, (m.get(r.ip) ?? 0) + 1);
    });
    return m;
  }, [rows]);

  const filtered = useMemo(() => {
    if (!rows) return [];
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.full_name, r.email, r.ip, r.city, r.comment]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q))
    );
  }, [rows, query]);

  if (!rows) {
    return (
      <main className="admin-shell">
        <form className="admin-login" onSubmit={login}>
          <h1>Panou semnături — acces privat</h1>
          <input
            type="password"
            placeholder="Parolă administrator"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-input"
            autoFocus
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
      <div className="admin-head">
        <h1>
          Semnături — {rows.length}{" "}
          <span className="admin-sub">
            ({ipCounts.size} IP-uri unice)
          </span>
        </h1>
        <input
          type="text"
          placeholder="Caută nume, email, IP, oraș, mesaj..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="admin-input admin-search"
        />
      </div>

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
              <th>Public</th>
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
                  <td>{r.full_name}</td>
                  <td>{r.email}</td>
                  <td>{r.city ?? "—"}</td>
                  <td className="admin-mono">
                    {r.ip ?? "—"}
                    {repeat > 1 && (
                      <span className="admin-flag">×{repeat}</span>
                    )}
                  </td>
                  <td className="admin-ua" title={r.user_agent ?? ""}>
                    {r.user_agent ?? "—"}
                    {r.lang ? (
                      <div className="admin-lang">{r.lang}</div>
                    ) : null}
                  </td>
                  <td className="admin-comment">{r.comment ?? "—"}</td>
                  <td>{r.comment_approved ? "✅" : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="admin-note">
        Rândurile evidențiate provin de la un IP care apare de mai multe ori —
        util pentru a depista aceeași persoană care semnează repetat cu nume sau
        emailuri diferite. Aceste date sunt private și nu apar pe pagina
        publică.
      </p>
    </main>
  );
}
