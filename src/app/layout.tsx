import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://poker-club-cluj.vercel.app"),
  title: "Propunere pentru Consiliul Local Cluj-Napoca",
  description:
    "Versiune rafinata a paginii Poker Cluj, optimizata pentru mobil, tableta si desktop.",
  openGraph: {
    title: "Propunere pentru Consiliul Local Cluj-Napoca",
    description:
      "Jocurile dintre participanti (loto si cluburile de poker) trebuie tratate distinct de sloturi si cazinouri.",
    url: "https://poker-club-cluj.vercel.app",
    siteName: "Player's Poker Club",
    type: "website",
    locale: "ro_RO",
    images: [
      {
        url: "/manifest-poster.jpg",
        width: 1920,
        height: 1080,
        alt: "Player's Poker Club — Pokerul nu e păcănele",
      },
      {
        url: "/logo-players-poker-club.jpg",
        width: 1600,
        height: 1600,
        alt: "Player's Poker Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Propunere pentru Consiliul Local Cluj-Napoca",
    description:
      "Jocurile dintre participanti (loto si cluburile de poker) trebuie tratate distinct de sloturi si cazinouri.",
    images: ["/manifest-poster.jpg"],
  },
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
