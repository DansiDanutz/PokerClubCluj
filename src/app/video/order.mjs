/*
 * Ordonarea cronologiei Players: cel mai recent eveniment primul.
 *
 * Logica pura, fara dependente de framework, ca sa poata fi testata direct
 * (vezi tests/video-timeline.test.mjs). Sorteaza dupa campul `date` (ISO
 * YYYY-MM-DD) descrescator, fara sa mute lista originala.
 */
export function sortEventsByDateDesc(events) {
  return [...events].sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}
