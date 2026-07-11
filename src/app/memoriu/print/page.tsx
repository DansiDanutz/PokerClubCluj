import MemoriuDocument from "../document";
import MemoriuSummary from "../summary";
import "../memoriu.css";

export const metadata = {
  title: "Memoriu (versiune tipar) — Poker Cluj",
  robots: { index: false },
};

export default function MemoriuPrintPage() {
  return (
    <div className="memoriu-print">
      <MemoriuSummary />
      <MemoriuDocument />
    </div>
  );
}
