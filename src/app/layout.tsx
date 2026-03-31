import "./globals.css";

export const metadata = {
  title: "Propunere pentru Consiliul Local Cluj-Napoca",
  description:
    "Plan de reglementare echilibrată a activităților de jocuri de noroc în Cluj-Napoca. Players Poker Club.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ro"
      className="geist_a71539c9-module__T19VSG__variable geist_mono_8d43a2aa-module__8Li5zG__variable h-full antialiased dark"
    >
      <body className="min-h-full flex flex-col bg-[#0a0f1a] text-zinc-300">
        {children}
      </body>
    </html>
  );
}
