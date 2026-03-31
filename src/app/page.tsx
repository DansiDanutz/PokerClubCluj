"use client";

import { useState } from "react";

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
  modalBody?: string;
  compactModal?: boolean;
};

type ImpactCard = {
  label: string;
  value: string;
  featured?: boolean;
};

type PlanStep = {
  key: string;
  title: string;
  body: string;
};

type TaxCard = {
  title: string;
  value: string;
  subtitle?: string;
  note: string;
  featured?: boolean;
};

type PokerPoint = {
  title: string;
  body: string;
};

type TimelineEntry = {
  year: string;
  title: string;
  body: string;
  featured?: boolean;
};

type ComparisonPoint = {
  icon: string;
  text: string;
};

type StateTaxYear = {
  year: string;
  ron: string;
  eur: string;
  event: string;
};

type StateTaxBreakdown = {
  type: string;
  share: string;
  amount: string;
};

const stats: Stat[] = [
  { value: "119+", label: "Locatii active" },
  { value: "~29", label: "Locatii propuse (-76%)", accent: true },
  { value: "~1.750", label: "Angajati afectati (direct + indirect)" },
  { value: "1.000.000 EUR", label: "Garantie per operator", accent: true },
];

const legislativeTimeline: TimelineEntry[] = [
  {
    year: "2009",
    title: "OUG 77/2009",
    body: "Prima lege moderna a jocurilor de noroc.",
  },
  {
    year: "2013",
    title: "Infiintare ONJN",
    body: "Autoritate centrala pentru licentiere.",
  },
  {
    year: "2015",
    title: "Legea 124/2015",
    body: "Legalizarea jocurilor online, taxe GGR.",
  },
  {
    year: "2018",
    title: "OUG 114/2018",
    body: "Taxa suplimentara 2% din turnover.",
  },
  {
    year: "2022",
    title: "Legea 30/2022",
    body: "Impozit castiguri: 3% / 20% / 40% pe transe.",
  },
  {
    year: "2023",
    title: "OUG 82/2023",
    body: "Crestere taxe licenta +50M EUR.",
  },
  {
    year: "2024",
    title: "Garantie 1.000.000 EUR",
    body: "Obligatorie per operator.",
  },
  {
    year: "2025",
    title: "Legea 141/2025",
    body: "GGR online 21% -> 30%, taxa de viciu dublata.",
  },
  {
    year: "2026",
    title: "OUG 7/2026",
    body: "Consiliile locale primesc dreptul de a decide.",
    featured: true,
  },
];

const pokerFocusPoints: PokerPoint[] = [
  {
    title: "Situatia specifica a cluburilor de poker",
    body:
      "Atragem atentia asupra unei omisiuni majore din proiectul de regulament: lipsa unei distinctii clare pentru cluburile de poker. In Municipiul Cluj functioneaza un singur club de poker, deschis de societatea noastra in anul 2020, fiind unul dintre cele doar 7 astfel de cluburi ramase la nivelul intregii tari.",
  },
  {
    title: "Incadrare legala distincta",
    body:
      "Pana in anul 2013, pokerul a functionat ca activitate sportiva, gazduind turnee regionale, nationale si internationale. Ulterior, a fost asimilat jocurilor de noroc prin OUG 77/2009. Totusi, art. 10 alin. 1 lit. d) din OUG 77/2009 defineste pokerul ca joc care se desfasoara **exclusiv intre participanti in sali specializate**.",
  },
  {
    title: "Model economic complet diferit",
    body:
      "In clubul de poker, **clientul nu joaca impotriva casei**. Jucatorii achita o taxa de intrare care merge integral la bugetul de stat, iar organizatorul percepe doar o taxa de participare la turneu, reprezentand intre 10% si 15% din fondul de premiere. Veniturile clubului sunt net inferioare altor activitati de profil, desi taxele nationale raman aceleasi.",
  },
  {
    title: "Suprafata mare, venituri mici",
    body:
      "Legislatia obliga clubul sa dispuna de o suprafata extinsa: 15 mese de joc, (aprox 600m2) receptie, inregistrare clienti, casierie si spatii pentru staff. [alert]Aplicarea unei taxe mai mari de 100 lei/mp/an pe o astfel de suprafata ar duce la inchiderea instantanee a locatiei.[/alert]",
  },
  {
    title: "Valoare reala pentru comunitate",
    body:
      "Pokerul dezvolta abilitati analitice si de management al riscului, fiind predat ca modul de autodezvoltare in numeroase licee si universitati din lume. La nivel local, clubul nostru a devenit partener pentru universitati, asociatii studentesti si mari angajatori din Cluj in organizarea de evenimente personalizate si activitati de team-building.",
  },
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

const stateTaxEvolution: StateTaxYear[] = [
  {
    year: "2020",
    ron: "~1.000.000.000",
    eur: "~200M EUR",
    event: "COVID - scadere activitate",
  },
  {
    year: "2021",
    ron: "~1.200.000.000",
    eur: "~240M EUR",
    event: "Revenire treptata",
  },
  {
    year: "2022",
    ron: "2.009.145.827",
    eur: "~406M EUR",
    event: "Taxe existente",
  },
  {
    year: "2023",
    ron: "4.088.659.709",
    eur: "~822M EUR",
    event: "OUG 82/2023 - taxe majorate semnificativ",
  },
  {
    year: "2024",
    ron: "4.295.792.270",
    eur: "~864M EUR",
    event: "Garantie 1.000.000 EUR obligatorie",
  },
  {
    year: "2025",
    ron: "~5.000.000.000",
    eur: "~1 mld EUR",
    event: "GGR online 30%, taxa viciu dublata",
  },
];

const stateTaxBreakdown: StateTaxBreakdown[] = [
  {
    type: "Taxe regularizare (21% GGR)",
    share: "33%",
    amount: "~1.089M lei",
  },
  {
    type: "Contributii sociale angajati",
    share: "30%",
    amount: "~990M lei",
  },
  {
    type: "Impozit premii jucatori",
    share: "21%",
    amount: "~693M lei",
  },
  {
    type: "Taxa de viciu (pacanele)",
    share: "5%",
    amount: "~165M lei",
  },
  {
    type: "Impozit pe profit",
    share: "4%",
    amount: "~132M lei",
  },
  {
    type: "Taxe licente si autorizare",
    share: "5%",
    amount: "~165M lei",
  },
  {
    type: "Taxa promovare + alte taxe",
    share: "2%",
    amount: "~66M lei",
  },
];

const countries: CountryCard[] = [
  {
    flag: "🇬🇧",
    name: "Marea Britanie",
    note: "Slots si pariuri restrictionate, in timp ce pokerul live a ramas reglementat distinct.",
    modalBody:
      'Pokerul este tratat diferit de sloturi in legislatia din Marea Britanie.\n\nIn reglementarea britanica, pokerul este incadrat ca joc de "equal chance", cu o componenta evidenta de skill, nu ca activitate pur aleatorie. Din acest motiv, regimul aplicat pokerului este mai permisiv decat cel impus sloturilor.\n\nSloturile sunt considerate produse cu risc mai ridicat si potential mai mare de afectare a jucatorilor, motiv pentru care sunt supuse unor restrictii mult mai agresive, in special in mediul online.\n\nAceasta distinctie arata clar ca, intr-un cadru legislativ matur, pokerul poate fi separat de sloturi si tratat ca activitate diferita, cu reguli si proportii fiscale adaptate modelului sau real de functionare.',
  },
  {
    flag: "🇫🇷",
    name: "Franta",
    note: "Aparate interzise in orase, dar cluburile de poker au ramas legale in conditii clare.",
    compactModal: true,
    modalBody:
      'Poker live - modelul unic al Parisului.\n\nParisul nu are cazinouri traditionale, acestea fiind interzise prin lege inca din 1919. In schimb, orasul opereaza prin "Clubs de Jeux", cluburi de gaming care ofera exclusiv poker si jocuri de carti. Ruleta si sloturile sunt interzise explicit in Paris.\n\nAcest model a functionat initial in regim experimental din 2017, inlocuind vechile "cercles de jeux", inchise anterior pe fondul problemelor legate de spalarea banilor.\n\nLa inceputul anului 2025, o criza politica generata de blocajul bugetar a dus la inchiderea temporara a tuturor celor 7 cluburi, afectand aproximativ 1.500 de locuri de munca si fortand anularea EPT Paris.\n\nIn noiembrie 2025, Senatul francez a votat un amendament pentru acordarea unui statut permanent acestor cluburi, masura aflata in asteptarea confirmarii finale din partea Adunarii Nationale.\n\nCluburile genereaza aproximativ 120 milioane EUR venituri brute anual, iar circa 50 milioane EUR se intorc la stat si la primaria Parisului.',
  },
  {
    flag: "🇩🇪",
    name: "Germania",
    note: "Restrictii dure pentru aparate in localitati, cu poker live permis in format controlat.",
    modalBody:
      "Poker live - monopol de stat.\n\nPokerul fizic este permis exclusiv in cazinourile de stat (Spielbanken). Organizarea de partide private cu bani reali este strict ilegala si poate duce la amenzi sau chiar la inchisoare, atat pentru organizatori, cat si pentru jucatori. In prezent exista aproximativ 32 de poker rooms active.\n\nSloturi - restrictii extreme.\n\nSloturile online din Germania sunt printre cele mai restrictive din Europa:\n\n1 EUR maxim per spin\n5 secunde obligatorii intre rotiri\nAutoplay interzis complet\nJackpot-uri interzise\nButon de \"panica\" obligatoriu, care blocheaza jucatorul pentru 24 de ore.",
  },
  {
    flag: "🇪🇸",
    name: "Spania",
    note: "Gambling mai strict in zona stradala, pokerul pastrat ca activitate separata.",
    modalBody:
      'Poker online - legal, cu lichiditate partajata.\n\nPokerul online este complet legal in Spania si este reglementat de DGOJ (Direccion General de Ordenacion del Juego). Operatorii au nevoie de licenta generala si de licenta singulara specifica pentru poker, iar operarea se face prin domeniu ".es".\n\nUnul dintre cele mai importante avantaje ale modelului spaniol este participarea la acordul european de lichiditate comuna alaturi de Franta si Portugalia. Astfel, jucatorii spanioli pot juca la aceleasi mese cu jucatorii francezi si portughezi, ceea ce sustine volume mai mari si o piata mai stabila.\n\nAplicarea legii este extrem de agresiva.\n\nDGOJ a aplicat amenzi de aproximativ 142 milioane EUR in 2024, inclusiv 75 milioane EUR pentru 14 operatori fara licenta. Sanctiunile pot ajunge pana la 50 milioane EUR pentru fiecare infractiune.',
  },
  {
    flag: "🇦🇹",
    name: "Austria",
    note: "Poker si casino online in regim inchis, cu monopol si control separat.",
    modalBody:
      "Poker si casino online - monopol.\n\nIn Austria, pokerul si casino gaming-ul functioneaza intr-un regim foarte inchis, dominat de monopolul de stat. Oferta transfrontaliera nu este tratata ca o piata libera, iar pokerul nu functioneaza intr-un cadru deschis de licentiere multipla.\n\nAsta inseamna ca statul separa foarte clar pokerul si casino-ul de alte produse si le mentine intr-un model strict controlat.\n\nPentru comparatia noastra, Austria arata ca pokerul poate fi tratat distinct, in mod explicit, fara a fi amestecat automat cu toate celelalte forme de gambling.",
  },
  {
    flag: "🇨🇿",
    name: "Cehia",
    note: "Poker live si online in piata reglementata, cu licentiere si control clar al operatorilor.",
    modalBody:
      "Poker live si online - piata reglementata.\n\nCehia opereaza sub un cadru legal clar pentru gambling, bazat pe Act No. 186/2016 on Gambling. Sistemul permite operatorilor licentiati sa functioneze legal, inclusiv in online, in baza unor conditii tehnice, fiscale si de conformare bine definite.\n\nModelul ceh este relevant pentru ca nu elimina pokerul din piata, ci il integreaza intr-un regim autorizat si controlat.\n\nEste un exemplu bun de abordare in care statul combate oferta ilegala prin licentiere, fiscalizare si supraveghere, nu prin disparitia completa a produsului.",
  },
  {
    flag: "🇸🇰",
    name: "Slovacia",
    note: "Poker permis in localitati in regim licentiat, sloturile NU decat in afara localitatilor inclusiv pentru operatori straini autorizati.",
    modalBody:
      "Poker online - permis in regim licentiat.\n\nIn Slovacia, inclusiv operatorii straini pot furniza legal online gambling daca sunt autorizati conform cadrului national. Administratia fiscala mentioneaza explicit pokerul intre jocurile ce pot fi oferite prin internet in regim legal.\n\nAsta confirma ca pokerul este tratat ca activitate reglementabila, nu ca produs care trebuie exclus complet din piata.\n\nPentru argumentatia noastra, Slovacia este relevanta deoarece arata cum pokerul poate exista legal intr-un model modern de licentiere, control si fiscalizare.",
  },
  {
    flag: "🇨🇾",
    name: "Cipru",
    note: "Online casino si poker interzise, cu presiune constanta din partea pietei ilegale.",
    modalBody:
      'Poker online - interzis, cu risc ridicat de piata neagra.\n\nIn Cipru, online casino este interzis, iar aceasta interdictie include si pokerul online. Sunt permise doar anumite produse de betting licentiat, nu si o piata legala deschisa pentru poker online.\n\nAutoritatea de reglementare avertizeaza constant publicul cu privire la operatori neautorizati, reclame ilegale si activitati care migreaza in afara cadrului licentiat.\n\nCipru este relevant pentru partea de risc: atunci cand nu exista cadru legal pentru poker sau casino online, cererea nu dispare, ci se muta spre oferta ilegala si mai greu de controlat.',
  },
];

const pokerDifferences = {
  poker: [
    { icon: "✅", text: "Joc de abilitate si strategie" },
    { icon: "✅", text: "Socializare activa, fata in fata" },
    { icon: "✅", text: "Risc scazut de dependenta" },
    { icon: "✅", text: "Gandire strategica, disciplina" },
    { icon: "✅", text: "Turnee caritabile, team building" },
    { icon: "✅", text: "Departe de ecrane" },
  ] satisfies ComparisonPoint[],
  slots: [
    { icon: "❌", text: "Joc exclusiv de noroc" },
    { icon: "❌", text: "Activitate solitara" },
    { icon: "❌", text: "Risc ridicat de dependenta" },
    { icon: "❌", text: "Niciun beneficiu educativ" },
    { icon: "❌", text: "Nu genereaza comunitate" },
    { icon: "❌", text: "Izoleaza jucatorul" },
  ] satisfies ComparisonPoint[],
};

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
    body: "Garantie de 1.000.000 EUR per operator. Acces minor inseamna pierderea garantiei si revocarea licentei, activata in 2025.",
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
    title: "Poker Club\n(600 mp/loc.) ( Taxa noua )",
    value: "100 lei/mp",
    subtitle: "Bugetul Local",
    note: "sau taxa fixa 6.000 EUR/an",
    featured: true,
  },
  {
    title: "Taxa de intrare ( taxa activa )",
    value: "30 lei / persoana",
    subtitle: "Bugetul de Stat",
    note: "",
  },
  {
    title: "Taxa autorizare : ( taxa activa )",
    value: "38.500 Euro /an",
    subtitle: "Bugetul local",
    note: "",
  },
  {
    title: "Taxa Licenta : ( taxa activa )",
    value: "35.000 Euro",
    subtitle: "Bugetul de Stat",
    note: "",
  },
];

const resultCards: ImpactCard[] = [
  { value: "~29", label: "Locatii dupa filtrare" },
  { value: "~500", label: "Locuri de munca pastrate" },
  { value: "1.4M+ lei", label: "Venit nou anual" },
  {
    value: "1.000.000 EUR ACTIVA din 2025",
    label: "Garantie pentru minori",
    featured: true,
  },
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

function renderInlineBold(text: string) {
  return text.split(/(\[alert\].*?\[\/alert\]|\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith("[alert]") && part.endsWith("[/alert]")) {
      return (
        <span key={`${part}-${index}`} className="inline-alert">
          {part.slice(7, -8)}
        </span>
      );
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

export default function HomePage() {
  const [openCountry, setOpenCountry] = useState<CountryCard | null>(null);

  return (
    <main className="site-shell">
      <header className="topbar">
        <div className="container topbar__inner">
          <a href="#" className="brand">
            <span className="brand__mark">♠</span>
            <span>Poker Cluj</span>
          </a>
          <nav className="topnav" aria-label="Navigare principala">
            <a href="#poker">Poker</a>
            <a href="#istoric">Istoric</a>
            <a href="#situatia">Situatia</a>
            <a href="#contributie">Contributie</a>
            <a href="#buget-stat">Buget stat</a>
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
              <a href="#istoric" className="button button--mini">
                Istoric Legislativ
              </a>
            </div>
            <h1>
              Propunere pentru
              <br />
              Consiliul Local
              <br />
              Cluj-Napoca
            </h1>
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
              <div className="summary-card__title">Clujul poate seta un model</div>
              <p>
                Nu o interdictie emotionala, ci o arhitectura locala mai
                inteligenta, mai stricta si mai usor de aparat public. Poker-ul
                trebuie sa ramana un loc de socializare intr-o atmosfera
                placuta, reglementata, monitorizata si distinsa clar fata de
                slot-uri. DOAR la poker se socializeaza, DOAR la poker se fac
                team-building-uri, DOAR la poker se fac actiuni caritabile,
                DOAR la poker inveti sa te comporti, sa vorbesti si sa
                intalnesti oameni pe care ii vezi doar la TV.
              </p>
            </div>
            <div className="summary-card">
              <div className="summary-card__label">Mesaj cheie</div>
              <div className="summary-card__title">
                Pokerul trebuie tratat separat
              </div>
              <p>
                Datele locale si precedentele europene arata clar ca pokerul nu
                este acelasi produs cu sloturile stradale, daca in alte orase
                mari ale Europei deciziile sunt luate, in Cluj trebuie doar
                copiate si aplicate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="poker" className="section section--tinted poker-focus">
        <div className="container">
          <SectionIntro
            badge="Pokerul in Cluj-Napoca"
            title="Situatia specifica a cluburilor de poker"
            body="Pokerul are un model legal, economic si operational diferit si trebuie tratat separat in regulamentul local."
          />

          <div className="poker-focus__layout">
            <article className="poker-prose-card reveal">
              {pokerFocusPoints.map((point, index) => (
                <section
                  key={point.title}
                  className="poker-prose-block"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <h3>{point.title}</h3>
                  <p>{renderInlineBold(point.body)}</p>
                </section>
              ))}
            </article>

            <aside className="poker-aside-card reveal reveal-delay-2">
              <span className="section-kicker">Propunere</span>
              <h3>Incadrare si taxare distincta</h3>
              <p>
                Solicitam tratarea distincta a cluburilor de poker in cadrul
                regulamentului, tinand cont de modelul specific: joc intre
                participanti, nu impotriva organizatorului, si de necesarul
                obligatoriu de spatiu extins.
              </p>
              <div className="poker-aside-card__rate">Max 100 lei/mp/an</div>
              <p>
                O astfel de taxa ar permite supravietuirea singurului club de
                poker din Cluj si ar mentine un sector legal, suprataxat si
                strict controlat.
              </p>
              <div className="poker-aside-card__note">
                Solicitam analiza acestor amendamente in logica unui parteneriat
                corect intre administratia locala si mediul de afaceri.
              </div>
            </aside>
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

      <section id="istoric" className="section history-section">
        <div className="container">
          <SectionIntro
            badge="Istoric"
            title="Contextul legislativ"
            body="La fiecare etapa, operatorii s-au conformat. Intre 40% si 50% din venituri ajung deja la stat."
          />

          <article className="history-callout reveal">
            <strong>La fiecare etapa, operatorii s-au conformat.</strong>
            <p>
              Fiscalitatea a crescut constant, obligatiile de conformare s-au
              extins, iar sectorul a continuat sa functioneze in legalitate,
              sub control si cu aport major la bugetul public.
            </p>
          </article>

          <div className="history-grid">
            {legislativeTimeline.map((entry, index) => (
              <article
                key={`${entry.year}-${entry.title}`}
                className={`history-card reveal ${entry.featured ? "history-card--featured" : ""}`}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="history-card__year">{entry.year}</div>
                <h3>{entry.title}</h3>
                <p>{entry.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="situatia" className="section">
        <div className="container">
          <SectionIntro
            badge="Date verificate • surse oficiale + Google Maps"
            title="Situatia actuala in Cluj-Napoca"
            body=""
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

      <section id="buget-stat" className="section">
        <div className="container">
          <SectionIntro
            badge="Bugetul de stat"
            title="Contributia industriei la bugetul de stat"
            body="Din fiecare leu cheltuit, aproximativ 30 de bani ajung direct la bugetul de stat. Mai jos este evolutia ultimilor 6 ani, pe baza rapoartelor ONJN si a estimarilor fiscale disponibile."
          />

          <article className="state-tax-callout reveal">
            <strong>Din fiecare leu cheltuit, 30 de bani ajung direct la bugetul de stat.</strong>
            <p>
              In ultimii 6 ani, fiscalitatea a crescut accelerat, iar
              contributia cumulata a industriei a ajuns la aproximativ 17.6
              miliarde RON, cu o rata de colectare estimata la 98-99%.
            </p>
          </article>

          <div className="state-tax-grid">
            {stateTaxEvolution.map((entry, index) => (
              <article
                key={entry.year}
                className="state-tax-card reveal"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="state-tax-card__year">{entry.year}</div>
                <strong>{entry.ron}</strong>
                <span>{entry.eur}</span>
              </article>
            ))}
          </div>

          <article className="table-card reveal">
            <div className="table-card__header">
              <div>
                <span className="section-kicker">Taxe ONJN incasate</span>
                <h3>Evolutia taxelor incasate la bugetul de stat</h3>
              </div>
            </div>

            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>An</th>
                    <th>Taxe ONJN (RON)</th>
                    <th>EUR</th>
                    <th>Eveniment fiscal</th>
                  </tr>
                </thead>
                <tbody>
                  {stateTaxEvolution.map((entry) => (
                    <tr key={`state-tax-${entry.year}`}>
                      <td>{entry.year}</td>
                      <td>{entry.ron}</td>
                      <td>{entry.eur}</td>
                      <td>{entry.event}</td>
                    </tr>
                  ))}
                  <tr className="data-table__row--total">
                    <td>TOTAL 6 ani</td>
                    <td>~17.6 mld RON</td>
                    <td>~3.5 mld EUR</td>
                    <td>Rata colectare: 98-99%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article className="table-card reveal reveal-delay-2">
            <div className="table-card__header">
              <div>
                <span className="section-kicker">Structura taxelor</span>
                <h3>Contributie anuala totala: ~3.300 milioane lei</h3>
              </div>
              <p>
                Defalcare orientativa a principalelor taxe directe si indirecte
                care ajung anual la bugetul de stat si in sistemele publice.
              </p>
            </div>

            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Tip taxa</th>
                    <th>%</th>
                    <th>Suma</th>
                  </tr>
                </thead>
                <tbody>
                  {stateTaxBreakdown.map((entry) => (
                    <tr key={entry.type}>
                      <td>{entry.type}</td>
                      <td>{entry.share}</td>
                      <td>{entry.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      </section>

      <section id="diferenta" className="section">
        <div className="container">
          <SectionIntro
            badge="Precedent european"
            title="Pokerul nu este acelasi lucru cu sloturile"
            body=""
          />

          <div className="difference-grid">
            <article className="difference-card difference-card--poker reveal">
              <span className="section-kicker">De ce pokerul este diferit</span>
              <h3>♠ Poker</h3>
              <ul className="difference-list">
                {pokerDifferences.poker.map((item) => (
                  <li key={item.text}>
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="difference-card difference-card--slots reveal reveal-delay-2">
              <span className="section-kicker">Contrast direct</span>
              <h3>🎰 Aparate electronice</h3>
              <ul className="difference-list">
                {pokerDifferences.slots.map((item) => (
                  <li key={item.text}>
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="country-grid">
            {countries.map((country, index) => (
              <article
                key={country.name}
                className="country-card reveal"
                style={{ animationDelay: `${index * 85}ms` }}
              >
                <div className="country-card__header">
                  <div className="country-card__flag">{country.flag}</div>
                  <h3>{country.name}</h3>
                </div>
                <p>{country.note}</p>
                {country.modalBody ? (
                  <button
                    type="button"
                    className="country-card__info"
                    onClick={() => setOpenCountry(country)}
                  >
                    Info
                  </button>
                ) : null}
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
            body=""
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
            body=""
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
            </div>

            <div className="tax-grid">
              {taxCards.map((card, index) => (
                <article
                  key={card.title}
                  className={`tax-card reveal ${card.featured ? "tax-card--featured" : ""}`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <h4>{card.title}</h4>
                  <strong>{card.value}</strong>
                  {card.subtitle ? <em>{card.subtitle}</em> : null}
                  {card.note ? <span>{card.note}</span> : null}
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
                className={`result-card reveal ${result.featured ? "result-card--featured" : ""}`}
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
            body=""
          />

          <div className="letter-frame reveal">
            <article className="letter-card">
              <header className="letter-head">
                <div className="letter-head__eyebrow">Document de pozitie</div>
                <h3>
                  Catre
                  <br />
                  Consiliul Local Cluj-Napoca
                </h3>
                <div className="letter-meta">
                  <span>Cluj-Napoca</span>
                  <span>Players Poker Club</span>
                  <span>Memoriu oficial</span>
                </div>
              </header>

              <div className="letter-body">
                <p className="letter-salutation">
                  Stimati membri ai Consiliului Local Cluj-Napoca,
                </p>
                <p>
                  Va adresam aceasta scrisoare cu respect si cu speranta ca veti
                  analiza cu atentie argumentele prezentate. Suntem operatori de
                  poker din Cluj-Napoca, contribuabili la bugetul local si
                  national, angajatori si membri ai comunitatii clujene.
                </p>
                <p>
                  De-a lungul anilor, ne-am conformat tuturor obligatiilor
                  legale. Am achitat taxele impuse de legislatia nationala, am
                  depus garantiile de 1.000.000 EUR, am mentinut locuri de munca
                  si am contribuit semnificativ la veniturile bugetare ale
                  statului.
                </p>
                <p>
                  Va solicitam sa faceti o distinctie clara intre poker si
                  celelalte forme de gambling. Pokerul are un model juridic,
                  economic si social diferit. Este o activitate bazata pe
                  abilitate, strategie, interactiune directa intre participanti
                  si functioneaza intr-un cadru controlat, reglementat si
                  monitorizat.
                </p>
                <p>
                  Va rugam, de asemenea, sa solicitati o analiza reala de impact
                  social si economic inainte de adoptarea unei decizii care ar
                  putea conduce la inchiderea unei activitati legale, strict
                  controlate si profund diferite de sloturile stradale.
                </p>
                <p className="letter-card__accent">
                  Nu solicitam privilegii. Solicitam doar o evaluare corecta,
                  bazata pe specificul real al activitatii noastre si pe
                  contributia pe care o aducem comunitatii si bugetului public.
                </p>
              </div>

              <footer className="letter-footer">
                <p>Cu respect,</p>
                <div className="letter-signatures">
                  <div className="letter-signature">
                    <strong>Dan Semenescu</strong>
                    <span>Players Poker Club Cluj-Napoca</span>
                  </div>
                  <div className="letter-signature">
                    <strong>Toma Alin</strong>
                    <span>Players Poker Club Cluj-Napoca</span>
                  </div>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </section>

      {openCountry ? (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setOpenCountry(null)}
        >
          <div
            className={`country-modal ${openCountry.compactModal ? "country-modal--compact" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="country-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="country-modal__close"
              aria-label="Inchide"
              onClick={() => setOpenCountry(null)}
            >
              ×
            </button>
            <div className="country-modal__flag">{openCountry.flag}</div>
            <h3 id="country-modal-title">{openCountry.name}</h3>
            <p>{openCountry.modalBody}</p>
          </div>
        </div>
      ) : null}
    </main>
  );
}
