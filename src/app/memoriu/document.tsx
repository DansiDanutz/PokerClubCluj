/* Textul integral al memoriului — sursa unica pentru pagina web si versiunea PDF. */

export const MEMORIU_DATE = "10 iulie 2026";

export default function MemoriuDocument() {
  return (
    <article className="memoriu-doc">
      <header className="doc-header">
        <div className="doc-kicker">Consultare publică — Legea nr. 52/2003</div>
        <h1>
          MEMORIU
          <br />
          privind exceptarea jocurilor desfășurate exclusiv între participanți
          (cluburile de poker) de la interdicția propusă
        </h1>
        <p className="doc-subject">
          Referitor la: Proiectul de hotărâre privind interzicerea desfășurării
          activității de jocuri de noroc în locații fizice pe raza Municipiului
          Cluj-Napoca (Referat de aprobare nr. 637619/1/01.07.2026; Raport de
          specialitate nr. 637670/452/01.07.2026), aflat în consultare publică în
          perioada 1–15 iulie 2026
        </p>
      </header>

      <p>
        <strong>Către:</strong> Primăria Municipiului Cluj-Napoca — în atenția
        Domnului Primar și a Consiliului Local al Municipiului Cluj-Napoca
      </p>
      <p>
        <strong>Depus de:</strong> Player&apos;s Poker Club
        Cluj-Napoca, Str. Louis Pasteur nr. 75, Cluj-Napoca (tel. +40 758 889
        666, playerspoker.ro), prin Dan Semenescu și Toma Alin, împreună cu
        susținătorii semnatari (lista de semnături este anexată prezentului
        memoriu și poate fi consultată la adresa
        poker-club-cluj.vercel.app/memoriu)
      </p>
      <p>
        <strong>Data:</strong> {MEMORIU_DATE}
      </p>

      <h2>I. Obiectul memoriului</h2>
      <p>
        În temeiul art. 7 din Legea nr. 52/2003 privind transparența decizională
        în administrația publică, formulăm prezentul punct de vedere și solicităm
        respectuos <strong>amendarea art. 1 din proiectul de hotărâre</strong>,
        în sensul extinderii excepției de la interdicție — prevăzută în prezent
        exclusiv pentru jocurile loto — la{" "}
        <strong>
          toate jocurile de noroc care se desfășoară exclusiv între participanți
        </strong>
        , respectiv și la jocurile de noroc caracteristice cluburilor de poker,
        astfel cum sunt definite la art. 10 alin. (1) lit. d) din OUG nr.
        77/2009.
      </p>
      <blockquote>
        Text propus pentru art. 1: „Se aprobă interzicerea desfășurării
        activității de jocuri de noroc în locații fizice pe raza Municipiului
        Cluj-Napoca, cu excepția jocurilor loto reglementate prin art. 18 alin.
        (1) din Ordonanța de Urgență a Guvernului nr. 77/2009{" "}
        <strong>
          și a jocurilor de noroc caracteristice cluburilor de poker, definite la
          art. 10 alin. (1) lit. d) din aceeași ordonanță — jocuri de cărți care
          se desfășoară exclusiv între participanți, în săli specializate, în
          care organizatorul nu participă la joc
        </strong>
        , cu modificările și completările ulterioare."
      </blockquote>
      <p>
        În subsidiar, solicităm organizarea unei <strong>dezbateri publice</strong>{" "}
        asupra proiectului, în condițiile art. 7 alin. (9) din Legea nr. 52/2003,
        precum și invitarea reprezentanților clubului la ședința comisiei de
        specialitate, pentru a prezenta datele din prezentul memoriu.
      </p>

      <h2>II. Precizare prealabilă: susținem obiectivul proiectului</h2>
      <p>
        Subliniem de la început: <strong>nu solicităm respingerea proiectului</strong>.
        Împărtășim în întregime preocuparea inițiatorilor față de efectele sociale
        ale aparatelor de tip slot-machine, ale pariurilor și ale jocurilor de
        cazinou — jocuri construite în jurul unui avantaj matematic al casei,
        amplasate agresiv la stradă, cu acces facil și risc dovedit de adicție.
        Considerăm însă că proiectul, în forma actuală, tratează identic două
        realități pe care chiar legea-cadru le distinge: jocurile{" "}
        <em>împotriva organizatorului</em> și jocurile{" "}
        <em>între participanți</em>. Prezentul memoriu privește exclusiv această
        distincție.
      </p>

      <h2>III. Distincția juridică: jocuri împotriva casei vs. jocuri între participanți</h2>
      <p>
        OUG nr. 77/2009 privind organizarea și exploatarea jocurilor de noroc —
        actul normativ pe care proiectul de hotărâre însuși se întemeiază —
        clasifică la art. 10 alin. (1) jocurile de noroc în categorii distincte,
        cu regimuri juridice distincte. Pentru cluburile de poker, legea prevede:
      </p>
      <blockquote>
        „Jocuri de noroc caracteristice cluburilor de poker — joc tradițional —
        sunt jocuri de noroc cu cărți de joc, denumite «poker», care se
        desfășoară <strong>exclusiv între participanți</strong> în săli (locații)
        specializate." — art. 10 alin. (1) <strong>lit. d)</strong> din OUG nr.
        77/2009
      </blockquote>
      <p>
        Normele metodologice de aplicare a legii întăresc expres același
        criteriu:
      </p>
      <blockquote>
        „Jocurile de noroc <strong>se organizează direct între participanți</strong>,
        organizatorul având obligația de a asigura respectarea regulamentelor de
        joc astfel cum au fost aprobate de Comitetul de supraveghere din cadrul
        ONJN." — art. 56 din HG nr. 111/2016
      </blockquote>
      <p>
        Iar sub aspect economic, legea definește venitul organizatorului de
        astfel de jocuri ca fiind <strong>comisionul reținut de la participanți</strong>{" "}
        — nu pierderile acestora: „venitul din jocurile de noroc al unui operator
        licențiat îl reprezintă încasările obținute (comisioanele reținute de la
        participanții la joc)" (art. 1^1 alin. (2) din OUG nr. 77/2009).
      </p>
      <p>Această arhitectură legală consacră trei diferențe structurale:</p>
      <ol>
        <li>
          <strong>Organizatorul nu este adversarul jucătorului.</strong> În
          cluburile de poker, organizatorul percepe o taxă de participare
          (comision), fără a fi parte la joc. Prin contrast, la jocurile de tip
          slot-machine legea însăși definește câștigul ca „nelimitat și depinde
          de hazard", iar la videoloterie „dexteritatea sau abilitatea
          jucătorului neavând nicio influență/relevanță în obținerea câștigului"
          (art. 10 alin. (1) lit. e)) — jucătorul joacă împotriva mijlocului de
          joc al operatorului, iar modelul de afaceri este pierderea clientului.
        </li>
        <li>
          <strong>Banii circulă între participanți</strong>, ca la jocurile loto
          (unde fondul de câștiguri se constituie din participări) — nu de la
          client către operator.
        </li>
        <li>
          <strong>Jocul este social și lent</strong>: o masă de poker live
          înseamnă aproximativ 25–30 de mâini pe oră, față de mai multe sute de
          rotiri pe oră la un aparat slot — exact caracteristicile de design
          (viteză, joc solitar, continuitate) pe care literatura de specialitate
          le identifică drept motoare ale adicției la aparate.
        </li>
      </ol>
      <h3>Excepția din proiect protejează un operator, nu un criteriu</h3>
      <p>
        Reținem că art. 18 alin. (1) din OUG nr. 77/2009 — temeiul excepției din
        art. 1 al proiectului — nu definește o categorie de jocuri „mai puțin
        nocive": el încredințează Companiei Naționale „Loteria Română" S.A.,
        în calitate de unic organizator, jocurile loto și pariurile mutuale.
        Excepția, așa cum este redactată, protejează așadar un{" "}
        <strong>operator</strong> (monopolul de stat), nu un criteriu obiectiv de
        risc. Dacă însă rațiunea de fond a excepției este natura jocului — fond
        de câștiguri constituit între participanți, organizator neinteresat de
        pierderea individuală a jucătorului — atunci același criteriu impune
        includerea jocurilor caracteristice cluburilor de poker, singura altă
        categorie pe care legea o definește prin sintagma „exclusiv între
        participanți".
      </p>
      <p>
        A excepta jocurile loto și a interzice simultan singurul club de poker
        din municipiu înseamnă a trata diferit situații juridic similare, ceea ce
        ridică probleme serioase de <strong>egalitate de tratament</strong> (art.
        16 din Constituție; art. 7 din OUG nr. 57/2019 privind Codul
        administrativ — dreptul beneficiarilor „de a fi tratați în mod egal,
        într-o manieră nediscriminatorie"), de <strong>legalitate</strong> (art.
        6 Cod administrativ) și de <strong>proporționalitate</strong> (art. 9 Cod
        administrativ: măsurile administrației trebuie să fie „echilibrate din
        punctul de vedere al efectelor asupra persoanelor" și adoptate „numai în
        urma evaluării... riscurilor și a impactului soluțiilor propuse"), în
        raport cu scopul declarat al proiectului: combaterea adicției generate de
        aparate. Sunt incidente, de asemenea, garanțiile libertății economice
        (art. 45 și art. 135 din Constituție).
      </p>

      <h2>IV. Proporționalitate: 1 club din 119+ locații</h2>
      <p>
        În Cluj-Napoca funcționează un singur club de poker — sub 1% din cele
        peste 119 locații de jocuri de noroc active (53 săli de sloturi, 43
        agenții de pariuri, 20+ agenții loto). Clubul funcționează într-o sală
        specializată de aproximativ 600 m², fără aparate slot-machine, fără
        vitrină stradală de tip „păcănele", cu acces controlat și verificarea
        vârstei la intrare. Interdicția totală ar produce, în cazul său, un
        sacrificiu maxim (închiderea definitivă a unei activități licențiate
        ONJN) pentru un câștig minim în raport cu obiectivul hotărârii — care
        vizează, potrivit referatului de aprobare, fenomenul adicției generate de
        aparatele și agențiile omniprezente la stradă.
      </p>

      <h2>V. Dovezile științifice: riscul de adicție diferă radical pe tip de joc</h2>
      <ul>
        <li>
          <strong>Comisia de Productivitate a Guvernului Australiei</strong>{" "}
          (raportul național „Gambling", 2010) — cel mai citat studiu de politici
          publice din domeniu — a constatat că aparatele electronice de joc (EGM
          / slot-machine) sunt forma de joc cea mai puternic asociată cu
          dependența: circa 75–80% dintre persoanele aflate în consiliere pentru
          dependență indică aparatele drept problema principală, iar aproximativ
          40% din încasările aparatelor provin de la jucători cu probleme.
        </li>
        <li>
          <strong>Comisia pentru Jocuri de Noroc din Marea Britanie</strong>{" "}
          (statistici oficiale PGSI, 2024) a constatat că jocurile de tip
          slot/fruit machine și jocurile de cazinou prezintă un risc de joc
          problematic de câteva ori peste medie, în timp ce loteriile se situează
          la sau sub medie — confirmând că riscul se concentrează în anumite
          tipuri de joc, nu în „jocurile de noroc" ca întreg.
        </li>
        <li>
          <strong>Caracterul de abilitate al pokerului</strong> este documentat
          academic și judiciar: studiul economiștilor Steven Levitt și Thomas
          Miles (Universitatea din Chicago / NBER, 2011) a demonstrat statistic,
          pe datele World Series of Poker, un avantaj sistematic al jucătorilor
          pricepuți; Curtea Federală de Finanțe a Germaniei (Bundesfinanzhof,
          2015 și 2023) impozitează câștigurile jucătorilor profesioniști ca
          venit comercial tocmai pentru că rezultatul depinde preponderent de
          abilitate; iar în SUA, un judecător federal a reținut, după audierea
          experților, că pokerul este preponderent joc de abilitate (constatare
          rămasă necontrazisă în fond la apel, care a vizat alte temeiuri).
        </li>
        <li>
          <strong>Pokerul este recunoscut ca sport al minții</strong>:
          în noiembrie 2024, International Mind Sports Association — organizația
          care reunește șahul, bridge-ul și go-ul — a primit World Poker
          Federation ca membru afiliat.
        </li>
      </ul>

      <h2>VI. Practica europeană: soluția propusă este deja implementată, prin lege</h2>
      <p>
        Distincția pe care o solicităm nu este o inovație locală — este{" "}
        <strong>norma legislativă în vigoare</strong> în mai multe state
        europene, cu acte normative identificabile:
      </p>
      <table>
        <thead>
          <tr>
            <th>Jurisdicție</th>
            <th>Actul normativ</th>
            <th>Ce prevede</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Cehia</strong> — modelul cel mai apropiat de situația
              Clujului
            </td>
            <td>
              Legea nr. 186/2016 privind jocurile de noroc, § 12 alin. (1)
              coroborat cu § 3 alin. (2), § 42 și § 57
            </td>
            <td>
              Municipalitatea poate, prin regulament local, să interzică{" "}
              <strong>separat, pe fiecare tip de joc</strong>: „jocul tehnic"
              (aparatele slot, § 42) poate fi interzis integral, în timp ce
              „jocul viu" (§ 57 — jocuri la masă „între jucători", inclusiv
              jocurile de cărți și turneele de poker) rămâne permis. Exact
              arhitectura pe care o propunem pentru Cluj-Napoca.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Paris, Franța</strong>
            </td>
            <td>
              Legea nr. 2017-257 (art. 34) și Decretul nr. 2017-913 (art. 14);
              prelungire prin Legea finanțelor 2025 (nr. 2025-127, art. 102);
              permanentizare prin Legea finanțelor 2026 (nr. 2026-103), validată
              de Consiliul Constituțional francez (decizia nr. 2026-901 DC)
            </td>
            <td>
              În capitala Franței cazinourile sunt interzise istoric, dar statul
              a licențiat „clubs de jeux" în care lista exhaustivă a jocurilor
              permise include pokerul în mai multe variante —{" "}
              <strong>aparatele slot lipsesc din listă</strong> (rămân
              interzise). Regimul, testat din 2018, a fost făcut permanent în
              februarie 2026.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Marea Britanie</strong>
            </td>
            <td>
              SI 2018/1402 — Gaming Machine (Miscellaneous Amendments and
              Revocation) Regulations 2018; Gambling Act 2005, secț. 269–280
            </td>
            <td>
              Guvernul a redus miza maximă la terminalele FOBT de la 100 £ la 2
              £ (în vigoare de la 1 aprilie 2019) — măsură care a vizat{" "}
              <strong>exclusiv aparatele de categoria B2</strong>. Pokerul,
              calificat de lege drept „equal chance gaming" (joc cu șanse egale,
              fără avantajul casei), rămâne permis în cazinouri, cluburi și chiar
              puburi, cu plafoane.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Viena, Austria</strong>
            </td>
            <td>
              Novela la Wiener Veranstaltungsgesetz, LGBl. Nr. 43/2014 (în
              vigoare de la 1.01.2015); confirmată de Curtea Constituțională a
              Austriei (VfGH, G 205/2014 ș.a., 12.03.2015)
            </td>
            <td>
              Capitala Austriei a interzis integral aparatele slot din afara
              cazinourilor („kleines Glücksspiel") — aproximativ 2.500 de
              aparate stradale eliminate — în timp ce jocurile de masă din
              locațiile licențiate au continuat.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Germania</strong>
            </td>
            <td>
              Tratatul interlandic privind jocurile de noroc (GlüStV 2021), §
              25; confirmat de Curtea Federală Administrativă (BVerwG,
              8 B 28.23, 17.11.2023)
            </td>
            <td>
              Sălile de aparate (Spielhallen) sunt supuse unor restricții severe
              dedicate (distanțe minime, interdicția grupării), care{" "}
              <strong>nu se aplică</strong> pokerului live, oferit legal ca joc
              de masă în cazinourile licențiate ale landurilor.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        De altfel, chiar autoritatea română de reglementare tratează categoria
        distinct: ONJN publică o listă separată de „Operatori licențiați —
        cluburi de poker" în registrul public al organizatorilor de jocuri de
        noroc. Modelul european dominant nu este „totul sau nimic", ci{" "}
        <strong>reglementarea țintită pe tipul de joc care produce răul</strong>
        . Municipiul Cluj-Napoca nu ar improviza — ar aplica un standard deja
        implementat și validat de instanțe constituționale în Franța și Austria.
      </p>

      <h2>VII. Precedentul românesc: hotărârile locale diferențiază deja pe tip de joc</h2>
      <p>
        Competența consiliului local de a decide asupra jocurilor de noroc este
        instituită prin art. 18^1 din OUG nr. 77/2009 (introdus prin art. III
        pct. 6 din OUG nr. 7/2026, publicată în M. Of. nr. 146/25.02.2026):
      </p>
      <blockquote>
        „(1) Consiliul local decide, prin hotărâre, dacă pe teritoriul unității
        administrativ-teritoriale pe care o reprezintă se pot sau nu desfășura
        activități de jocuri de noroc. [...] (3) [...] Autorizația de
        funcționare [...] se acordă sau se respinge prin hotărâre a consiliului
        local, <strong>pe baza criteriilor stabilite prin regulament propriu</strong>,
        cu respectarea priorităților de dezvoltare locală, a normelor de
        protecție a ordinii și a sănătății și siguranței publice. (4)
        Autoritatea administrației publice locale stabilește, prin hotărâre a
        consiliului local: a) <strong>zonele</strong> în care activitățile de
        jocuri de noroc pot fi desfășurate; b) cuantumul <strong>taxei locale</strong>{" "}
        [...] calculată în funcție de suprafața [...] spațiului în care se
        desfășoară activitatea." — art. 18^1 din OUG nr. 77/2009
      </blockquote>
      <p>
        Legea acordă deci consiliului local o competență de{" "}
        <strong>reglementare pe criterii proprii</strong> — nu o alegere binară
        „totul sau nimic": chiar proiectul supus consultării operează o excepție
        (jocurile loto), iar regimul tranzitoriu este cel din art. XXXIX din OUG
        nr. 7/2026.
      </p>
      <p>
        În același sens, primele municipii care au adoptat interdicții după
        intrarea în vigoare a OUG nr. 7/2026 au operat deja distincții pe tipuri
        de jocuri:{" "}
        <strong>Slatina</strong> (HCL din 13 martie 2026) a interzis jocurile de
        noroc și pariurile „cu excepția jocurilor tip loto organizate de Loteria
        Română"; <strong>Iași</strong> a exceptat agențiile Loteriei Române, cu
        precizarea suplimentară „fără aparate slot-machine" în interiorul
        acestora. Așadar, diferențierea pe tipul de joc în cuprinsul unei
        hotărâri de consiliu local este deja practicată — inclusiv în chiar
        proiectul supus consultării, care exceptează jocurile loto. Extinderea
        excepției la a doua categorie de jocuri între participanți este o
        chestiune de coerență a aceluiași criteriu, nu o derogare nouă.
      </p>

      <h2>VIII. Contextul civic: cetățenii vizează „păcănelele", nu mesele de joc dintre oameni</h2>
      <p>
        Înțelegem și respectăm mobilizarea civică ce a precedat proiectul —
        inclusiv petiția cu peste 14.000 de semnături pentru eliminarea
        „păcănelelor" din Cluj-Napoca. Subliniem însă că obiectul acelei
        revendicări îl reprezintă aparatele slot-machine și agențiile
        omniprezente la stradă. Player&apos;s Poker Club nu deține niciun aparat
        slot-machine, nu are vitrină stradală de tip „păcănele", funcționează
        într-o sală specializată cu acces controlat și verificarea actului de
        identitate la intrare. A răspunde unei petiții împotriva aparatelor prin
        închiderea singurei săli de joc între participanți din oraș nu rezolvă
        problema semnalată de cetățeni — dar produce toate pagubele colaterale
        descrise mai jos.
      </p>
      <h2>IX. Ce pierde Cluj-Napoca prin închiderea clubului</h2>
      <ul>
        <li>
          <strong>Locuri de muncă directe</strong> și activitate economică
          conexă (HoReCa, turism), într-o locație unică în Transilvania —
          clubul este listat în bazele de date internaționale ale circuitului de
          poker live (The Hendon Mob, PokerAtlas) și organizează turnee zilnic;
        </li>
        <li>
          <strong>Turism de eveniment</strong>: turneele de poker live atrag
          vizitatori din întreaga Europă — European Poker Tour Barcelona 2025 a
          reunit peste 2.000 de participanți din 88 de țări, iar King's Resort
          (Rozvadov, Cehia — un sat de 800 de locuitori) a devenit, potrivit
          datelor din industrie, o destinație cu sute de mii de vizitatori anual
          exclusiv datorită pokerului live. Cluj-Napoca, oraș care găzduiește
          UNTOLD și Sports Festival, are profilul ideal pentru acest tip de
          turism urban;
        </li>
        <li>
          <strong>Controlul</strong>: cererea pentru poker nu dispare prin
          interdicție — migrează către jocuri private neautorizate, fără
          verificarea vârstei, fără plafoane și fără fiscalizare, sau către
          mediul online, unde expunerea este continuă;
        </li>
        <li>
          <strong>Venituri fiscale</strong> locale și naționale plătite de un
          operator licențiat ONJN, cu garanțiile financiare aferente.
        </li>
      </ul>

      <h2>X. Solicitări</h2>
      <ol>
        <li>
          <strong>Amendarea art. 1</strong> din proiectul de hotărâre în sensul
          arătat la pct. I — exceptarea jocurilor desfășurate exclusiv între
          participanți (jocurile loto și jocurile caracteristice cluburilor de
          poker);
        </li>
        <li>
          <strong>Organizarea unei dezbateri publice</strong> asupra proiectului,
          conform art. 7 alin. (9) din Legea nr. 52/2003;
        </li>
        <li>
          <strong>Invitarea reprezentanților clubului</strong> la lucrările
          comisiei de specialitate, pentru prezentarea datelor și a studiilor
          citate;
        </li>
        <li>
          În subsidiar, dacă excepția nu este acceptată:{" "}
          <strong>reglementarea diferențiată</strong> a cluburilor de poker
          (restricții de amplasament, interzicerea vizibilității stradale,
          program, taxă locală dedicată), în locul interdicției totale.
        </li>
      </ol>

      <h2>XI. Surse și referințe</h2>
      <ol className="doc-sources">
        <li>
          OUG nr. 77/2009 privind organizarea și exploatarea jocurilor de noroc,
          art. 1^1 alin. (2), art. 10 alin. (1) lit. a)–e), art. 18 alin. (1),
          art. 18^1 — legislatie.just.ro
        </li>
        <li>
          HG nr. 111/2016 pentru aprobarea Normelor metodologice de punere în
          aplicare a OUG nr. 77/2009, art. 56, art. 59
        </li>
        <li>
          OUG nr. 7/2026 (M. Of. nr. 146/25.02.2026), art. III pct. 6 și art.
          XXXIX; OUG nr. 57/2019 privind Codul administrativ, art. 6, 7 și 9
        </li>
        <li>
          Proiect de hotărâre privind interzicerea desfășurării activității de
          jocuri de noroc în locații fizice pe raza Municipiului Cluj-Napoca,
          Referat de aprobare nr. 637619/1/01.07.2026 — primariaclujnapoca.ro
        </li>
        <li>
          Productivity Commission (Australia), „Gambling — Inquiry Report No.
          50", 2010 — pc.gov.au
        </li>
        <li>
          UK Gambling Commission, „Exploring the relationship between gambling
          activities and Problem Gambling Severity Index scores", Gambling Survey
          for Great Britain, 2024 — gamblingcommission.gov.uk
        </li>
        <li>
          S. Levitt, T. Miles, „The Role of Skill Versus Luck in Poker: Evidence
          from the World Series of Poker", NBER Working Paper 17023 (2011);
          Journal of Sports Economics (2014)
        </li>
        <li>
          Bundesfinanzhof (Germania), decizia X R 43/12 din 16.09.2015 și decizia
          X R 8/21 din 22.02.2023 — bundesfinanzhof.de
        </li>
        <li>
          United States v. DiCristina, 886 F. Supp. 2d 164 (E.D.N.Y. 2012);
          rev'd, 726 F.3d 92 (2d Cir. 2013)
        </li>
        <li>
          International Mind Sports Association, „World Poker Federation becomes
          the ninth affiliate member", 16.11.2024 — imsa.sport
        </li>
        <li>
          Franța: Loi n° 2017-257 (art. 34), Décret n° 2017-913 (art. 14), Loi
          n° 2025-127 (art. 102), Loi n° 2026-103 și decizia Conseil
          constitutionnel n° 2026-901 DC — legifrance.gouv.fr,
          conseil-constitutionnel.fr
        </li>
        <li>
          Marea Britanie: The Gaming Machine (Miscellaneous Amendments and
          Revocation) Regulations 2018 (SI 2018/1402); Gambling Act 2005, secț.
          269–280 — legislation.gov.uk
        </li>
        <li>
          Cehia: Zákon č. 186/2016 Sb., o hazardních hrách, § 3, § 12, § 42, §
          57 — zakonyprolidi.cz
        </li>
        <li>
          Austria: Wiener Veranstaltungsgesetz, novela LGBl. Nr. 43/2014; VfGH
          12.03.2015, G 205/2014 — ris.bka.gv.at, vfgh.gv.at
        </li>
        <li>
          Germania: Glücksspielstaatsvertrag 2021, § 20 și § 25; BVerwG
          17.11.2023, 8 B 28.23
        </li>
        <li>
          ONJN — Lista organizatorilor licențiați, categoria „cluburi de poker"
          — onjn.gov.ro
        </li>
        <li>
          HCL Slatina din 13.03.2026 (digi24.ro); HCL Iași 2026 (ziare.com)
        </li>
      </ol>

      <h2>Anexa 1 — Textul comparat al amendamentului propus (art. 1)</h2>
      <table>
        <thead>
          <tr>
            <th>Forma din proiect</th>
            <th>Forma propusă</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              „Se aprobă interzicerea desfășurării activității de jocuri de
              noroc în locații fizice pe raza Municipiului Cluj-Napoca,{" "}
              <em>
                cu excepția jocurilor loto reglementate prin art. 18 alin. (1)
                din Ordonanța de Urgență a Guvernului nr. 77/2009
              </em>{" "}
              privind organizarea și exploatarea jocurilor de noroc, cu
              modificările și completările ulterioare."
            </td>
            <td>
              „Se aprobă interzicerea desfășurării activității de jocuri de
              noroc în locații fizice pe raza Municipiului Cluj-Napoca,{" "}
              <em>
                cu excepția jocurilor care se desfășoară exclusiv între
                participanți, respectiv a jocurilor loto reglementate prin art.
                18 alin. (1) și a jocurilor de noroc caracteristice cluburilor
                de poker prevăzute la art. 10 alin. (1) lit. d) din Ordonanța de
                Urgență a Guvernului nr. 77/2009
              </em>{" "}
              privind organizarea și exploatarea jocurilor de noroc, cu
              modificările și completările ulterioare."
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Anexa 2 — Fișă comparativă pe tipuri de joc (criterii obiective)</h2>
      <table>
        <thead>
          <tr>
            <th>Criteriu</th>
            <th>Club de poker</th>
            <th>Slot-machine</th>
            <th>Cazinou</th>
            <th>Pariuri</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Definiția legală</strong> (art. 10 alin. (1) OUG 77/2009)
            </td>
            <td>
              lit. d) — „exclusiv între participanți, în săli specializate"
            </td>
            <td>
              lit. e) — „câștigul este nelimitat și depinde de hazard"
            </td>
            <td>lit. c) — mijloace specifice de joc ale organizatorului</td>
            <td>lit. b) — cotă fixă stabilită de organizator</td>
          </tr>
          <tr>
            <td>
              <strong>Adversarul jucătorului</strong>
            </td>
            <td>Ceilalți participanți</td>
            <td>Aparatul operatorului</td>
            <td>Casa (organizatorul)</td>
            <td>Casa (organizatorul)</td>
          </tr>
          <tr>
            <td>
              <strong>Venitul operatorului</strong>
            </td>
            <td>
              Comision / taxă de participare (art. 1^1 alin. (2) OUG 77/2009)
            </td>
            <td>Pierderile jucătorilor</td>
            <td>Pierderile jucătorilor</td>
            <td>Pierderile jucătorilor</td>
          </tr>
          <tr>
            <td>
              <strong>Rolul abilității</strong>
            </td>
            <td>
              Determinant pe termen lung (Levitt &amp; Miles 2011; BFH 2015,
              2023)
            </td>
            <td>„nicio influență/relevanță" (legea, lit. e))</td>
            <td>Marginal (avantaj matematic al casei)</td>
            <td>Limitat (cote stabilite de casă)</td>
          </tr>
          <tr>
            <td>
              <strong>Ritmul jocului</strong>
            </td>
            <td>~25–30 mâini/oră, joc social la masă</td>
            <td>Sute de rotiri/oră, joc solitar continuu</td>
            <td>Rapid, continuu</td>
            <td>Pe eveniment</td>
          </tr>
          <tr>
            <td>
              <strong>Riscul documentat de adicție</strong>
            </td>
            <td>
              Fără concentrare comparabilă de cazuri în literatura de
              specialitate
            </td>
            <td>
              Cel mai ridicat — 75–80% din cazurile aflate în consiliere
              (Productivity Commission 2010)
            </td>
            <td>De câteva ori peste medie (UKGC 2024)</td>
            <td>Peste medie (UKGC 2024)</td>
          </tr>
          <tr>
            <td>
              <strong>Expunere stradală în Cluj-Napoca</strong>
            </td>
            <td>0 vitrine — 1 sală specializată, acces controlat</td>
            <td>53 de săli, majoritatea la stradă</td>
            <td>Săli comerciale vizibile</td>
            <td>43 de agenții la stradă</td>
          </tr>
        </tbody>
      </table>

      <div className="doc-signatures">
        <div>
          <div className="sig-name">Dan Semenescu</div>
          <div className="sig-role">Players Poker Club Cluj-Napoca</div>
        </div>
        <div>
          <div className="sig-name">Toma Alin</div>
          <div className="sig-role">Players Poker Club Cluj-Napoca</div>
        </div>
      </div>
      <p style={{ marginTop: "2rem", fontSize: "0.8rem" }}>
        <em>
          Anexă: lista susținătorilor care au semnat prezentul memoriu (nume și
          adrese de email colectate cu acord explicit prin pagina
          poker-club-cluj.vercel.app/memoriu).
        </em>
      </p>
    </article>
  );
}
