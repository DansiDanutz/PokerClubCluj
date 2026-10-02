/*
 * Cronologia evenimentelor Players Poker Club.
 *
 * Sursa unica pentru pagina /video. Ca sa adaugi un eveniment nou, copiaza un
 * obiect din lista de mai jos si completeaza campurile. Videoul se pune in
 * folderul /public (ex: public/nume-video.mp4) si se refera prin `video.src`
 * cu cale absoluta ("/nume-video.mp4"). Ordinea afisata este de la cel mai
 * recent la cel mai vechi (dupa `date`), deci nu conteaza ordinea din lista.
 */

export type PlayersEvent = {
  /** Identificator scurt, unic, folosit ca ancora (#id). */
  id: string;
  /** Data in format ISO (YYYY-MM-DD) — folosita doar pentru sortare. */
  date: string;
  /** Data afisata utilizatorului, in limba romana. */
  dateLabel: string;
  /** Eticheta de categorie (ex: "Promo", "Turneu", "Comunitate"). */
  category: string;
  /** Titlul evenimentului. */
  title: string;
  /** Descriere scurta (1-3 fraze). */
  description: string;
  /** Videoul asociat, daca exista. */
  video?: {
    src: string;
    /** Imagine poster optionala (cale in /public). */
    poster?: string;
  };
  /** Marcheaza evenimentul ca fiind evidentiat (badge). */
  featured?: boolean;
};

export const PLAYERS_EVENTS: PlayersEvent[] = [
  {
    id: "promo-sah-2026-09",
    date: "2026-09-28",
    dateLabel: "28 septembrie 2026",
    category: "Promo",
    title: "Pokerul, ca șahul — sport al minții",
    description:
      "Primul clip promoțional Players: pokerul și șahul, două jocuri de strategie, disciplină și răbdare. Un mesaj clar pentru comunitate — pokerul nu e păcănele, este un sport al minții.",
    video: { src: "/players-sah-promo.mp4" },
    featured: true,
  },
];
