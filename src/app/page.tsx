type Stat = {
  value: string;
  label: string;
  accent?: boolean;
};

type MiniCard = {
  icon: string;
  title: string;
  body: string;
};

type OperatorRow = {
  operator: string;
  activity: string;
  locations: string;
  city: string;
  featured?: boolean;
  total?: boolean;
};

type CountryCard = {
  flag: string;
  name: string;
  note: string;
};

type ImpactCard = {
  label: string;
  value: string;
};

type PlanStep = {
  key: string;
  title: string;
  body: string;
};

type TaxCard = {
  title: string;
  value: string;
  note: string;
};

const stats: Stat[] = [
  { value: "119+", label: "Locatii active" },
  { value: "~29", label: "Locatii propuse (-76%)", accent: true },
  { value: "~1.750", label: "Angajati afectati (direct + indirect)" },
  { value: "1.000.000 EUR", label: "Garantie per operator", accent: true },
];

const situationCards: MiniCard[] = [
  {
    icon: "🏢",
    title: "119+ Locatii active",
    body: "53 sali de slots, 43 agentii de pariuri sportive, 20+ agentii loto si 1 singur club de poker.",
  },
  {
    icon: "🏭",
    title: "15+ Operatori",
    body: "ELMAT, Superbet, Revital, Admiral, Las Vegas Games, Casa Pariurilor, Stanleybet si altii.",
  },
  {
    icon: "👥",
    title: "1.300 Angajati",
    body: "~1.000 directi si ~300 indirecti sustinuti de aceasta industrie la nivel local.",
  },
  {
    icon: "💰",
    title: "280M+ lei",
    body: "Cifra de afaceri estimata in judetul Cluj, cu impact direct in economie si pe piata imobiliara.",
  },
];

const operators: OperatorRow[] = [
  {
    operator: "Superbet",
    activity: "Pariuri sportive + Slots",
    locations: "25",
    city: "Bucuresti",
  },
  {
    operator: "ELMAT SA / Seven Club + Red Sevens",
    activity: "Slots (aparate)",
    locations: "13",
    city: "Cluj-Napoca",
  },
  {
    operator: "Revital SRL / Infinity Games",
    activity: "Slots (aparate)",
    locations: "12",
    city: "Cluj-Napoca",
  },
  {
    operator: "Casa Pariurilor (Hattrick Bet SRL)",
    activity: "Pariuri sportive",
    locations: "10",
    city: "Bucuresti",
  },
  {
    operator: "Stanleybet",
    activity: "Pariuri sportive",
    locations: "8",
    city: "Bucuresti",
  },
  {
    operator: "Las Vegas Games / DMS Bet Live",
    activity: "Slots + Combined",
    locations: "8",
    city: "Bucuresti",
  },
  {
    operator: "Admiral / Novomatic",
    activity: "Slots",
    locations: "7",
    city: "Otopeni, Ilfov",
  },
  {
    operator: "MaxBet",
    activity: "Slots + Pariuri",
    locations: "4",
    city: "Bucuresti",
  },
  {
    operator: "Dariosergio / House of Games",
    activity: "Slots",
    locations: "3",
    city: "Cluj-Napoca",
  },
  {
    operator: "Monaco Club (Goldprest Impex)",
    activity: "Slots",
    locations: "3",
    city: "Cluj-Napoca",
  },
  {
    operator: "Bellagio",
    activity: "Slots",
    locations: "2",
    city: "Cluj-Napoca",
  },
  {
    operator: "Red Star",
    activity: "Slots",
    locations: "2",
    city: "—",
  },
  {
    operator: "Metropolis (Iulius Mall)",
    activity: "Slots + Ruleta",
    locations: "1",
    city: "—",
  },
  {
    operator: "Loteria Romana",
    activity: "Loto",
    locations: "20+",
    city: "Bucuresti",
  },
  {
    operator: "Poker World SRL (Players Poker Club)",
    activity: "Poker (taxa intrare 30 lei/pers.)",
    locations: "1",
    city: "Cluj-Napoca",
    featured: true,
  },
  {
    operator: "TOTAL LOCATII ACTIVE",
    activity: "",
    locations: "119+",
    city: "din care 1 poker (0.85%)",
    total: true,
  },
];

const contributionCards: MiniCard[] = [
  {
    icon: "1",
    title: "Angajati",
    body: "~1.300 persoane active in agentii, sali si activitati operationale conexe.",
  },
  {
    icon: "2",
    title: "Impact judetean",
    body: "280M+ lei cifra de afaceri estimata anual in judetul Cluj.",
  },
  {
    icon: "3",
    title: "Control local",
    body: "Activitatea poate fi mutata din strada in spatii controlate si greu accesibile minorilor.",
  },
];

const countries: CountryCard[] = [
  {
    flag: "🇬🇧",
    name: "Marea Britanie",
    note: "Slots si pariuri restrictionate, in timp ce pokerul live a ramas reglementat distinct.",
  },
  {
    flag: "🇫🇷",
    name: "Franta",
    note: "Aparate interzise in orase, dar cluburile de poker au ramas legale in conditii clare.",
  },
  {
    flag: "🇩🇪",
    name: "Germania",
    note: "Restrictii dure pentru aparate in localitati, cu poker live permis in format controlat.",
  },
  {
    flag: "🇪🇸",
    name: "Spania",
    note: "Gambling mai strict in zona stradala, pokerul pastrat ca activitate separata.",
  },
];

const impactCards: ImpactCard[] = [
  { value: "~1.750", label: "Locuri de munca pierdute" },
  { value: "~5.425", label: "Persoane afectate" },
  { value: "~2.450", label: "Copii afectati" },
  { value: "119+", label: "Spatii comerciale goale" },
];

const planSteps: PlanStep[] = [
  {
    key: "A",
    title: "Reducere masiva de locatii",
    body: "119 locatii pot fi reduse la aproximativ 29, cu reguli unitare pentru toti operatorii si fara expunere vizuala stradala.",
  },
  {
    key: "B",
    title: "Relocare in spatii controlate",
    body: "Mall, hotel sau spatiu comercial interior, nu la parter, nu vizibil de pe strada si nu in proximitatea scolilor.",
  },
  {
    key: "C",
    title: "Protectie absoluta a minorilor",
    body: "Garantie de 1.000.000 EUR per operator. Acces minor inseamna pierderea garantiei si revocarea licentei.",
  },
  {
    key: "D",
    title: "Taxa locala noua",
    body: "Bugetul local obtine o sursa noua de venit din taxarea operatorilor, nu din fonduri generale sau redistribuiri politice.",
  },
  {
    key: "E",
    title: "Tranzitie profesionala, nu soc",
    body: "Relocarea se face treptat pe 12 luni astfel incat angajatii sa fie transferati, nu eliminati peste noapte.",
  },
];

const taxCards: TaxCard[] = [
  {
    title: "Poker (600 mp/loc.)",
    value: "100 lei/mp",
    note: "sau taxa fixa 6.000 EUR/an",
  },
  {
    title: "Slots (100 mp/loc.)",
    value: "500 lei/mp",
    note: "sau taxa fixa 6.000 EUR/an",
  },
  {
    title: "Loto / Pariuri (50 mp/loc.)",
    value: "1.000 lei/mp",
    note: "sau taxa fixa 6.000 EUR/an",
  },
];

const resultCards: ImpactCard[] = [
  { value: "~29", label: "Locatii dupa filtrare" },
  { value: "~500", label: "Locuri de munca pastrate" },
  { value: "1.4M+ lei", label: "Venit nou anual" },
  { value: "1.000.000 EUR", label: "Garantie pentru minori" },
];

function SectionIntro({
  badge,
  title,
  body,
}: {
  badge: string;
  title: string;
  body: string;
}) {
  return (
    <div className="section-intro reveal">
      <span className="eyebrow">{badge}</span>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <div className="container topbar__inner">
          <a href="#" className="brand">
            <span className="brand__mark">♠</span>
            <span>Poker Cluj</span>
          </a>
          <nav className="topnav" aria-label="Navigare principala">
            <a href="#situatia">Situatia</a>
            <a href="#contributie">Contributie</a>
            <a href="#diferenta">Poker vs. Slots</a>
            <a href="#scenariul-a">Scenariul A</a>
            <a href="#scenariul-b">Planul</a>
            <a href="#scrisoare">Scrisoare</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero__glow hero__glow--one" />
        <div className="hero__glow hero__glow--two" />
        <div className="container hero__content">
          <div className="hero__panel reveal">
            <span className="eyebrow">Propunere oficiala • Martie 2026</span>
            <div className="urgent-callout">
              <div className="urgent-callout__label">OUG 7/2026</div>
              <div className="urgent-callout__body">
                Consiliile locale primesc dreptul de a decide.
              </div>
            </div>
            <h1>Propunere pentru Consiliul Local Cluj-Napoca</h1>
            <p className="hero__lead">
              O forma mai profesionista de reglementare: mai putine locatii,
              eliminare din strada, protectie reala pentru minori si un cadru
              predictibil pentru oras.
            </p>
            <div className="hero__actions">
              <a href="#scenariul-b" className="button button--primary">
                Vedeti planul de compromis
              </a>
              <a href="#scenariul-a" className="button button--ghost">
                Costul inchiderii totale
              </a>
            </div>
          </div>

          <div className="hero__summary reveal reveal-delay-2">
            <div className="summary-card">
              <div className="summary-card__label">Pozitionare</div>
              <div className="summary-card__title">Cluj poate seta un model</div>
              <p>
                Nu o interdictie emotionala, ci o arhitectura locala mai
                inteligenta, mai stricta si mai usor de aparat public.
              </p>
            </div>
            <div className="summary-card">
              <div className="summary-card__label">Mesaj cheie</div>
              <div className="summary-card__title">
                Pokerul trebuie tratat separat
              </div>
              <p>
                Datele locale si precedentele europene arata clar ca pokerul nu
                este acelasi produs cu sloturile stradale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div className="container stats-grid">
          {stats.map((stat, index) => (
            <article
              key={stat.label}
              className={`stat-card reveal ${stat.accent ? "stat-card--accent" : ""}`}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="situatia" className="section">
        <div className="container">
          <SectionIntro
            badge="Date verificate • surse oficiale + Google Maps"
            title="Situatia actuala in Cluj-Napoca"
            body="Pagina este acum gandita pentru citire rapida pe mobil, tableta si desktop, cu aceleasi date-cheie puse mai clar in pagina."
          />

          <div className="feature-grid">
            {situationCards.map((card, index) => (
              <article
                key={card.title}
                className="feature-card reveal"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="feature-card__icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>

          <article className="table-card reveal reveal-delay-2">
            <div className="table-card__header">
              <div>
                <span className="section-kicker">Operatori principali</span>
                <h3>Distribuirea locatiilor active</h3>
              </div>
              <p>
                Verificare realizata pe operatori activi, cu accent pe prezenta
                locala reala in martie 2026.
              </p>
            </div>

            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Operator</th>
                    <th>Tip activitate</th>
                    <th>Locatii Cluj</th>
                    <th>Sediu</th>
                  </tr>
                </thead>
                <tbody>
                  {operators.map((row) => (
                    <tr
                      key={`${row.operator}-${row.locations}`}
                      className={
                        row.total
                          ? "data-table__row--total"
                          : row.featured
                            ? "data-table__row--featured"
                            : ""
                      }
                    >
                      <td>{row.operator}</td>
                      <td>{row.activity || "—"}</td>
                      <td>{row.locations}</td>
                      <td>{row.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="table-note">
              Doar operatori activi. Eliminati din analiza: BaumBet, Dream
              Betting, Win Boss si Black Star Slots.
            </p>
          </article>
        </div>
      </section>

      <section id="contributie" className="section section--tinted">
        <div className="container">
          <SectionIntro
            badge="Contributie fiscala si economica"
            title="Contributia reala la economia locala"
            body="Discutia devine mai credibila atunci cand cifrele sunt prezentate coerent: impact economic, locuri de munca si grad de control."
          />

          <div className="contribution-grid">
            {contributionCards.map((card, index) => (
              <article
                key={card.title}
                className="metric-card reveal"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="metric-card__index">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="diferenta" className="section">
        <div className="container">
          <SectionIntro
            badge="Precedent european"
            title="Pokerul nu este acelasi lucru cu sloturile"
            body="Comparatia internationala functioneaza mai bine cand fiecare exemplu este clar, scurt si usor de scanat pe orice ecran."
          />

          <div className="country-grid">
            {countries.map((country, index) => (
              <article
                key={country.name}
                className="country-card reveal"
                style={{ animationDelay: `${index * 85}ms` }}
              >
                <div className="country-card__flag">{country.flag}</div>
                <h3>{country.name}</h3>
                <p>{country.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="scenariul-a" className="section section--danger">
        <div className="container">
          <SectionIntro
            badge="Scenariul A"
            title="Costul inchiderii totale"
            body="Zona aceasta a fost restructurata vizual pentru a face impactul negativ imediat lizibil pe mobil si mai puternic pe desktop."
          />

          <div className="danger-layout">
            <article className="danger-panel reveal">
              <div className="danger-row">
                <span>Locuri de munca pierdute</span>
                <strong>~1.750</strong>
              </div>
              <div className="danger-row">
                <span>Persoane afectate</span>
                <strong>~5.425</strong>
              </div>
              <div className="danger-row">
                <span>Copii afectati</span>
                <strong>~2.450</strong>
              </div>
              <div className="danger-row">
                <span>Costuri sociale indirecte</span>
                <strong>5.850.000</strong>
              </div>
              <div className="danger-total">
                <span>Impact total negativ</span>
                <strong>~299.000.000</strong>
              </div>
            </article>

            <div className="impact-grid">
              {impactCards.map((item, index) => (
                <article
                  key={item.label}
                  className="impact-card reveal"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </div>

          <article className="risk-card reveal reveal-delay-2">
            <h3>Riscuri ascunse</h3>
            <ul>
              <li>Migrare in online sau in zona nereglementata.</li>
              <li>Precedent periculos pentru alti investitori locali.</li>
              <li>Pierderea controlului operational si fiscal.</li>
              <li>Efect de domino pe piata de spatii comerciale.</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="scenariul-b" className="section">
        <div className="container">
          <SectionIntro
            badge="Scenariul B"
            title="Planul de compromis"
            body="Am refacut aceasta sectiune intr-o structura mai clara: pasi, taxe, rezultate si un rezumat final care se citeste natural pe toate dispozitivele."
          />

          <div className="steps-grid">
            {planSteps.map((step, index) => (
              <article
                key={step.key}
                className="step-card reveal"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="step-card__key">{step.key}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>

          <article className="tax-panel reveal">
            <div className="tax-panel__intro">
              <span className="section-kicker">Taxa locala noua</span>
              <h3>Venit direct la bugetul local</h3>
              <p>
                Structura fiscala este prezentata acum ca sistem vizual, nu ca
                bloc de text greu de urmarit.
              </p>
            </div>

            <div className="tax-grid">
              {taxCards.map((card, index) => (
                <article
                  key={card.title}
                  className="tax-card reveal"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <h4>{card.title}</h4>
                  <strong>{card.value}</strong>
                  <span>{card.note}</span>
                </article>
              ))}
            </div>

            <div className="budget-callout">
              <strong>Venit nou estimat: ~174.000 EUR / an</strong>
              <p>
                Bani noi pentru bugetul local, cu utilizare clara pentru masuri
                de prevenire, control si combatere a adictiei.
              </p>
            </div>
          </article>

          <div className="result-grid">
            {resultCards.map((result, index) => (
              <article
                key={result.label}
                className="result-card reveal"
                style={{ animationDelay: `${index * 85}ms` }}
              >
                <strong>{result.value}</strong>
                <span>{result.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="scrisoare" className="section section--tinted">
        <div className="container">
          <SectionIntro
            badge="Mesaj final"
            title="Scrisoare deschisa catre Consiliul Local"
            body="Finalul este acum mai elegant, cu ritm mai bun de lectura si o inchidere mai ferma pentru intreaga argumentatie."
          />

          <article className="letter-card reveal">
            <p>
              Clujul poate deveni un model de reglementare locala: mai putine
              locatii, eliminate din strada, control mai dur, protectie reala
              pentru minori si venit nou pentru oras.
            </p>
            <p>
              O interzicere totala produce costuri economice si sociale
              imediate. Un compromis bine scris produce ordine, control si
              rezultate masurabile.
            </p>
            <p className="letter-card__accent">
              Aceasta este logica Planului B: reducere masiva, relocare
              controlata, taxare noua si protectie absoluta a minorilor.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
