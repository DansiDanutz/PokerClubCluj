import "./globals.css";

export const metadata = {
  title: "Propunere pentru Consiliul Local Cluj-Napoca",
  description:
    "Propunerea Players Poker Club pentru Consiliul Local Cluj-Napoca: reglementare diferentiata a jocurilor de noroc, cu tratament distinct pentru cluburile de poker fata de sloturi si pariuri.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
