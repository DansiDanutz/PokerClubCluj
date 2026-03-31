import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Propunere pentru Consiliul Local Cluj-Napoca",
  description:
    "Versiune rafinata a paginii Poker Cluj, optimizata pentru mobil, tableta si desktop.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
